const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 3
    },
    lastname: {
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
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
        unique: true
    },
    age: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// generating token
employeeSchema.methods.generateAuthToken = async function() {
    try{
        const token = jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY);
        console.log(token);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch(e) {
        console.log("Error: ", e);
    }
}

// converting password into hash
employeeSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`the current password is ${this.password}`);
    }
    next();
});


// We will create a new collection

const Employee = new mongoose.model('Employee', employeeSchema);
module.exports = Employee;