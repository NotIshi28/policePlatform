const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };

const userSchema = new Schema({
    name: reqString,
    email: reqString,
    password: reqString,
    createdOn: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("User", userSchema)