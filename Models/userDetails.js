const mongoose = require('mongoose');

const schema = {
    deviceId: { type: String, }, // Set type and optional validation
    name: { type: String, default: '' },
    email: { type: String, unique: true, default: '' },
    DOB: { type: Date, default: null },
    phone: { type: Number, default: null },
    nationality: { type: String, default: null },
    city: { type: String, default: null },
    pincode: { type: Number, default: null },
    points: { type: Number, default: 0 },
    value: { type: Number, default: 0 },
};

const userDataSchema = new mongoose.Schema(schema, {timestamps:true})
const userdataModel = mongoose.model('UserDatas',userDataSchema)

module.exports = userdataModel