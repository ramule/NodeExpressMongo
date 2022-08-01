const express = require("express");
const Employee = require("../models/employee");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register a new user in db

router.post("/employees/register", async(req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if(password === cpassword) {
            const registerEmployee = new Employee({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: password
            });

            const token = await registerEmployee.generateAuthToken();

            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 30000),
                httpOnly: true
            });
            console.log()
            const registered = await registerEmployee.save();
            res.status(201).send(registered);
            return;
        }
        else {
            res.send("password is not matching");
        }
    }
    catch(e) {
        res.status(400).send(e);
    }
});

// user login

router.post("/employees/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await Employee.findOne({email: email});

        const isMatch = await bcrypt.compare(password, userData.password);

        const token = await userData.generateAuthToken();

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true,
            // secure: true /* this will work in https */
        });

        if(isMatch) {
            res.status(200).send("Login successful...!")
        }
        else {
            res.send("Invalid credentials");
        }
    }
    catch(e) {
        res.status(400).send(e);
    }
});

router.get("/employees/secret", (req, res) => {
    console.log("your cookie is: ", req.cookies.jwt);
});

module.exports = router;
