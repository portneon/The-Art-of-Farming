const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
const authRouter = require('./auth/authRouter/auth.router');
const getPlants = require('./Dashboard/plants/plants.router');

app.use('/plants', getPlants);
app.use('/auth', authRouter);


app.get('/', (req, res) => {
    res.send('Welcome to The Art of Farming API');
});



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});