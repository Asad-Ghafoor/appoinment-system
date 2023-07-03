const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const mongoosePaginate = require('mongoose-paginate');


require('dotenv').config();
require('./conn/db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

// for save
app.use("/uploads", require('./routes/uploads'));
// for get
app.use('/uploads', express.static('uploads'));

app.use("/user", require('./routes/users'));
app.use("/appoinment", require('./routes/appoinments'));
app.use("/clinic", require('./routes/clinics'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening in  ${process.env.PORT}`)
})
