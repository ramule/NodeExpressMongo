require('dotenv').config();
const express = require('express');
require('./db/conn');
const studentRouter = require('./routers/studentrouters');
const employeeRouter = require('./routers/employeerouter');
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(studentRouter);
app.use(employeeRouter);

app.listen(port, () => {
    console.log(`connection successful at ${port}`);
});