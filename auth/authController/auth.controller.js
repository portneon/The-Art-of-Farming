const prisma = require('../../src/db/mysqlCient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



async function register(req, res) {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name
            }
        });
        res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ message: 'Login successful', token, name: user.name, userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    register,
    login
};

