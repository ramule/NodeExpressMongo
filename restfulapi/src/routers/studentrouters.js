const express = require("express");
const Student = require("../models/students");
const router = new express.Router();
const jwt = require("jsonwebtoken");

// create a new student using promise
// app.post("/students", (req, res) => {
//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//     });
// });

// create a new student using async await
router.post("/students/createStudent", async(req, res) => {
    try {
        const user = new Student(req.body);
        const result = await user.save();
        res.status(201).send(result);
    }
    catch(e) {
        res.status(400).send(e);
    }
});

// read data from db
router.get("/students/getStudents", async(req, res) => {
    try{
        const studentsData = await Student.find();
        res.send(studentsData);
    }catch(e) {
        res.status().send(e);
    }
});


// read data from db by id
router.get("/students/getStudentById/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        res.send(studentData);
    }catch(e) {
        res.status(404).send(e);
    }
});

// delete data from db by id
router.delete("/students/deleteStudent/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const deleteStud = await Student.findByIdAndDelete(_id);
        res.send(deleteStud);
    }catch(e) {
        res.status(500).send(e);
    }
});

// update data from db by id
router.patch("/students/updateStudent/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const updateStud = await Student.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(updateStud);
    }catch(e) {
        res.status(500).send(e);
    }
});

const createToken = async() => {
    const token = await jwt.sign({_id: "62bab3fd25ae9cabc642169a"}, process.env.SECRET_KEY, {
        expiresIn: "2 seconds"
    });
    console.log(token);

    const verify = await jwt.verify(token, "mynameisraviandthisisgoingtobemysecretkeyofjwt");
    console.log(verify);
}

// createToken();

module.exports = router;