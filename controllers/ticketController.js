const UserTicket = require("../models/userTicket");
const User = require("../models/user");
const mongoose = require("mongoose");

let db = mongoose.connection;
db.options = {};
db.on('error', console.error.bind(console, 'connection error:'));


module.exports = {

    findAll: async function (req, res) {
        try {
            const tickets = await UserTicket.find()
            res.json(tickets)
        } catch (err) {
            throw err;
        }
    },
    findOne: async function (req, res) {
        try {
            const tickets = await UserTicket.findById(req.params.id)
            res.json(tickets)
        } catch (err) {
            throw err;
        }
    },
    findOneUpdateComplete: async function (req, res) {
        try {
            const tickets = await UserTicket.findByIdAndUpdate(req.params.id, {ticket: true}, {new: true})
            res.json(tickets)
        } catch (err) {
            throw err;
        }
    },
    findOneUpdateunComplete: async function (req, res) {
        try {
            const tickets = await UserTicket.findByIdAndUpdate(req.params.id, {ticket: false}, {new: true})
            res.json(tickets)
        } catch (err) {
            throw err;
        }
    },
    findOneUpdateAssigne: async function (req, res) {
        try {
            const tickets = await UserTicket.findByIdAndUpdate(req.params.id, {assigne: req.body.assigne}, {new: true})
            res.json(tickets)
        } catch (err) {
            throw err;
        }
    },
    updateComment: async function (req, res) {
        try {
            const ticket = await UserTicket.findByIdAndUpdate(req.params.id,
                { "$push": { "comments": req.body.comments } },
                { "new": true, "upsert": true }
            )
            res.json(ticket)
        } catch (err) {
            throw err;
        }
    },
    save: async function (req, res) {
        try {
            const { email, description, product } = req.body;
            if (!email) return res.status(400).json({ msg: "Please select the user" })
            if (!description) {
                return res.status(400).json({ msg: "Please Description fields" })
            }

            let ts = Date.now();
            let date_ob = new Date(ts);
            let d = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            let hours = date_ob.getHours();
            let minutes = date_ob.getMinutes();
            let seconds = date_ob.getSeconds();
            const date = `${d}-${month}-${year}`
            const time = `${hours}:${minutes}:${seconds}`

            const newTicket = new UserTicket({
                email,
                description,
                product,
                date,
                time,
                ticket: true
            });

            const data  = await newTicket.save()
           
            res.json(data)

        } catch (err) {
            throw err;
        }
    },
    delete: async function (req, res) {
        try {
            await UserTicket.findByIdAndDelete(req.params.id)
            res.json({ success: true })
        } catch (err) {
            throw err;
        }
    },

}