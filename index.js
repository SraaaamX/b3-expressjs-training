require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users.route');

const app = express();
const port = 3000;

//Middleware
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

//Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((error) => {
        console.log(error);
    });


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});