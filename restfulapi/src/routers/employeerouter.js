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

module.exports = router;