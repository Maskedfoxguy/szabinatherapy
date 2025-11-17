// Seed script: ensures there is at least one admin using credentials from the .env file.
require('dotenv').config();
const bcrypt = require('bcrypt');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');

async function seed() {
  await connectDB();
  const { ADMIN_SEED_EMAIL, ADMIN_SEED_PASSWORD, ADMIN_SEED_NAME } = process.env;
  if (!ADMIN_SEED_EMAIL || !ADMIN_SEED_PASSWORD) {
    throw new Error('Missing ADMIN_SEED_EMAIL or ADMIN_SEED_PASSWORD');
  }
  const existing = await Admin.findOne({ email: ADMIN_SEED_EMAIL.toLowerCase() });
  if (existing) {
    console.log('Admin already exists – skipping.');
    return process.exit(0);
  }
  const passwordHash = await bcrypt.hash(ADMIN_SEED_PASSWORD, 10);
  await Admin.create({ email: ADMIN_SEED_EMAIL.toLowerCase(), passwordHash, name: ADMIN_SEED_NAME });
  console.log('Admin seeded');
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
