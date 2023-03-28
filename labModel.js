const mongoose = require("mongoose");

const labSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    noidung:{
        type: String,
    },
    tailieu:{
        type: Number,
        default:0,
    }
});

const LabModel = mongoose.model('lab',labSchema);
module.exports = LabModel;