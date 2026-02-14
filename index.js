const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
const getPlants = require('./Dashboard/plants/plants.router');
const authRouter = require('./auth/authRouter/auth.router');
const dashboardRouter = require('./Dashboard/users/routes/dashboard.routes');
const gardenRouter = require('./Dashboard/users/routes/garden.routes');

app.get('/', (req, res) => {
    res.send('Welcome to The Art of Farming API');
});

app.use('/plants', getPlants);
app.use('/auth', authRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/gardens', gardenRouter);


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});