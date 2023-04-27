const Student = require("../model/Student");
const Request = require("../model/Request");
const Offer = require("../model/Offer");
const User = require("../model/User");
const { Op } = require('sequelize');
const { fn, col } = require('sequelize');

const viewRequests = async (req, res) => {
    try {
        const username = req.user;
        const user= await User.findOne({ where: { username } });
        const student_id = user.ID;
        const requests = await Request.findAll({ where: { studentID:student_id} });
        return res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

const cancelRequest = async (req, res) => {
    try {
        const requestID = req.body.request_id;
        const request = await Request.findOne({ where: { id: requestID } });
        if (!request) {
            return res.status(200).json({ 'message': 'Request not found' });
        }
        if (request.status === 'cancelled') {
            return res.status(200).json({ 'message': 'Request already cancelled' });
        }
        await request.update({ status: 'cancelled' });
        return res.status(200).json({ 'message': 'Request cancelled successfully 🙂' });

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

const viewAvailableOffers = async (req, res) => {
    try {
        const username = req.user;  
        const user= await User.findOne({ where: { username } });
        const student_id = user.ID;
        const student= await Student.findOne({ where: { ID: student_id } });
        const student_major = student.major;

        const availableOffers = await Offer.findAll({
            where: {
                offer_date: {
                    [Op.lte]: fn('CURDATE')
                },
                major_name:student_major   
            }
        });
        return res.status(200).json(availableOffers );

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};


module.exports = {
    viewRequests,
    cancelRequest,
    viewAvailableOffers
};