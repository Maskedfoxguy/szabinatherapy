// Booking controller: processes new session requests and lets admins confirm them.
const Booking = require('../models/Booking');
const createAudit = require('../utils/createAudit');

async function hasConflict(start, end, excludeId) {
  if (!start || !end) {
    return false; // Skip conflict checks when we do not have a timeslot yet.
  }
  const query = {
    _id: { $ne: excludeId },
    status: 'confirmed',
    scheduledStart: { $lt: end },
    scheduledEnd: { $gt: start },
  };
  const conflict = await Booking.findOne(query);
  return Boolean(conflict);
}

exports.createBooking = async (req, res, next) => {
  try {
    const { clientName, clientEmail, service, notes } = req.body;
    if (!clientName || !clientEmail) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    const booking = await Booking.create({ clientName, clientEmail, service, notes });
    await createAudit({
      action: 'booking.create',
      actor: clientEmail,
      targetModel: 'Booking',
      targetId: booking._id,
    });
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

exports.listBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ requestedAt: -1 });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

exports.confirmBooking = async (req, res, next) => {
  try {
    const { scheduledStart, scheduledEnd } = req.body;
    if (!scheduledStart || !scheduledEnd) {
      return res.status(400).json({ message: 'Start and end times are required' });
    }
    const start = new Date(scheduledStart);
    const end = new Date(scheduledEnd);
    if (await hasConflict(start, end, req.params.id)) {
      return res.status(409).json({ message: 'Time slot conflicts with an existing booking' });
    }
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'confirmed', scheduledStart: start, scheduledEnd: end },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    await createAudit({
      action: 'booking.confirm',
      actor: req.user?.email || 'system',
      actorId: req.user?.id,
      targetModel: 'Booking',
      targetId: booking._id,
      metadata: { scheduledStart: start, scheduledEnd: end },
    });
    res.json(booking);
  } catch (error) {
    next(error);
  }
};
