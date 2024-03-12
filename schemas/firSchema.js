const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };
const nonReqString = { type: String, required: false };
const reqNumber = { type: Number, required: true };
const nonReqNumber = { type: Number, required: false };

const firSchema = new Schema({
    name: reqString,
    crime: reqString, 
    location: nonReqString,
    suspect:nonReqString,
    suspectNum: nonReqNumber,
    suspectEmail: nonReqString,
    email: reqString,
    firId: reqString,
    isComplete:{type:Boolean, required:false},
    createdOn: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("Fir", firSchema)