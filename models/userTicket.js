const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserTicketSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    ticket: {
        type: Boolean
    }
},
{
    versionKey: false 
});

module.exports = UserTicket = mongoose.model("userticket", UserTicketSchema);