const Student = require("../model/Student");
const Request = require("../model/Request");
const Offer = require("../model/Offer");

const viewRequests = async (req, res) => {
    try {
        const username = req.user;
        const studentID = await Student.findOne({ where: { username: username } });
        if (!username || !studentID) {
            return res.status(404).json({ 'message': 'Student not found' });
        }
        const requests = await Request.findAll({ where: { student_id: studentID } });
        return res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

const cancelRequest = async (req, res) => {
    try {
        const requestID = req.body.request_id;
        const username = req.user;
        const student = await Student.findOne({ where: { username: username } });
        if (!username || !student) {
            return res.status(404).json({ 'message': 'Student not found' });
        }
        const request = await Request.findOne({ where: { id: requestID } });
        if (!request) {
            return res.status(404).json({ 'message': 'Request not found' });
        }
        if (request.status === 'cancelled') {
            return res.status(400).json({ 'message': 'Request already cancelled' });
        }
        await request.update({ status: 'cancelled' });
        return res.status(200).json({ 'message': 'Request cancelled successfully 🙂' });
    
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

module.exports = {
    viewRequests,
    cancelRequest
};