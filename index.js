require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const plantsRouter = require('./src/modules/plants/plants.router');
const authRouter = require('./src/modules/auth/auth.router');
const gardenRouter = require('./src/modules/garden/garden.router');
const dashboardRouter = require('./src/modules/garden/dashboard.router');
const chatRouter = require('./src/modules/chat/chat.router');
const uploadRouter = require('./src/modules/upload/upload.router');


app.get('/', (req, res) => {
    res.send('Welcome to The Art of Farming API');
});

app.use('/plants', plantsRouter);
app.use('/auth', authRouter);
app.use('/api/gardens', gardenRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/chat', chatRouter);
app.use('/api/upload', uploadRouter);   // POST /api/upload/image, DELETE /api/upload/image/:publicId


app.use('/garden', gardenRouter);
app.use('/dashboard', dashboardRouter);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});




