require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const mongo = new PrismaClient();

module.exports = mongo;
