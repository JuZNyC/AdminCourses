const express = require('express')
const mongoose = require('mongoose')
const User = require('./user');
const app = express()
const ejs = require('ejs')
const {Schema} = require("mongoose");
require('dotenv').config();

app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI, (err) =>{
    console.log('mongo db connected', err);
});

const semesterSchema = new Schema(
    {
        season : {type: String, enum: ["spring", "summer", "fall", "winter"], required: true},
        year: {type: String, required: true}
    }
);

const instructorSchema = new Schema(
    {
        instructorId: {type: Schema.Types.ObjectId, required: true},
        instructorName: {type:String, required:true}
    }
);

const scheduleSchema = new Schema(
    {
        days: {type: [String], required: true},
        from: {type: String, required: true},
        to: {type: String, required: true}
    }
);

const courseSchema = {
    semester : {type: semesterSchema, required: true},
    department : {type: String, required: true},
    name : {type: String, required: true},
    number: {type: Number, required: true},
    instructor : {type: instructorSchema, required: true},
    description : {type: String, required: true},
    capacity : {type: Number, required: true},
    enrollmentDeadline: {type: Date, required: true},
    schedule: {type: scheduleSchema, required: true}
}

const courses = mongoose.model('courses', courseSchema);

app.get('/', (req, res) => {
    courses.find({}, function (err, courses) {
        res.render('index', {
            courseList: courses
        })
    })
})

app.listen(4000, function () {
    console.log('server is running');
})