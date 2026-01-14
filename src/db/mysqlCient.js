
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

// Ensure DATABASE_URL is available before initializing PrismaClient
const mysql = new PrismaClient();

module.exports = mysql;