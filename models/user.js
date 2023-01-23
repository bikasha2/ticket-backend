const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // tickets: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "userticket"
    //     }
    // ]

},
{
    versionKey: false 
});

module.exports = User = mongoose.model("user", UserSchema);