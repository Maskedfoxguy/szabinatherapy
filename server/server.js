// API entry point: configures middleware, routes, and bootstraps the server.
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOrigins = (process.env.CORS_ORIGIN || '').split(',').map((origin) => origin.trim()).filter(Boolean);

app.use(helmet());
app.use(cors({ origin: corsOrigins.length ? corsOrigins : true, credentials: true }));
app.use(rateLimiter);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/public', require('./routes/public.routes'));
app.use('/api/bookings', require('./routes/booking.routes'));
app.use('/api/audit', require('./routes/audit.routes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`API ready on port ${PORT}`));
});
