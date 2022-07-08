const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email id already present'],
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    }
});

studentSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`the current password is ${this.password}`);
    }
    next();
})


// We will create a new collection

const Student = new mongoose.model('Student', studentSchema);
module.exports = Student;