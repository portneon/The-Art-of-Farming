
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

// Ensure DATABASE_URL is available before initializing PrismaClient
const prisma = new PrismaClient();

module.exports = prisma;
