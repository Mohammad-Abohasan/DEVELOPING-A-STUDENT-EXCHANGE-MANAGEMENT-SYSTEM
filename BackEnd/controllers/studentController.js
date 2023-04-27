const Student = require("../model/Student");
const Request = require("../model/Request");
const Offer = require("../model/Offer");
const User = require("../model/User");
const { Op } = require('sequelize');
const { fn, col } = require('sequelize');

const viewRequests = async (req, res) => {
    try {
        const username = req.user;
        const student = await Student.findOne({ 
            where: { 
                username
            } 
        });
        const requests = await Request.findAll({ 
            where: { 
                student_id: student.id 
            } 
        })
        return res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

const cancelRequest = async (req, res) => {
    try {
        const requestID = req.body.request_id;
        const request = await Request.findOne({ 
            where: { 
                id: requestID 
            } 
        });
        if (!request) {
            return res.status(200).json({ 'message': 'Request not found' });
        }
        if (request.status === 'Cancelled') {
            return res.status(200).json({ 'message': 'Request already cancelled' });
        }
        await request.update({ status: 'Cancelled' });
        return res.status(200).json({ 'message': 'Request cancelled successfully 🙂' });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

const viewAvailableOffers = async (req, res) => {
    try {
        const username = req.user;
        const student = await Student.findOne({ 
            where: { 
                username 
            } 
        });
        const availableOffers = await Offer.findAll({
            where: {
                offer_date: {
                    [Op.gte]: fn('CURDATE')
                },
                stu_sex: student.gender,
                major_name: student.major,
                college_name: student.college
            }
        });
        await res.status(200).json(availableOffers);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const submitOffer = async (req, res) => {
    try {
        const username = req.user;
        const offerID = req.body.offer_id;
        const student = await Student.findOne({ 
            where: { 
                username 
            } 
        });
        const newRequest = await Request.create({
            request_date: fn('CURDATE'),
            status: 'Pending',
            offer_id: offerID,
            student_id: student.id
        });
        res.status(200).json({ 'message': 'Request submitted successfully 🥳' });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = {
    viewRequests,
    cancelRequest,
    viewAvailableOffers,
    submitOffer
};