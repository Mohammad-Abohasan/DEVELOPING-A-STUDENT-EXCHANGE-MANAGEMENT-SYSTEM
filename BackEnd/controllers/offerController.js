const Student = require("../model/Student");
const Request = require("../model/Request");
const Offer = require("../model/Offer");
const { Op } = require('sequelize');
const { fn, col } = require('sequelize');

const addNotes = async (req, res) => {
    try {
        const requestID = req.body.request_id;
        const notes = req.body.notes;
        const request = await Request.findByPK(requestID);
        if (!request) {
            return res.status(200).json({
                'message': 'Request not found'
            });
        }
        await request.update(notes);
        return res.status(200).json({
            'message': 'Notes added successfully 🙂'
        });
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
}

const editNotes = async (req, res) => {
    try {
        const requestID = req.body.request_id;
        const notes = req.body.notes;
        const request = await Request.findByPK(requestID);
        if (!request) {
            return res.status(200).json({
                'message': 'Request not found'
            });
        }
        await request.update(notes);
        return res.status(200).json({
            'message': 'Notes updated successfully 🙂'
        });
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
}

const viewPublishedOffers = async (req, res) => {
    try {
        const publishedOffers = await Offer.findAll({
            where: {
                offer_date: {
                    [Op.gte]: fn('CURDATE')
                },
            }
        });
        await res.status(200).json(publishedOffers);
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
}

const viewArchivedOffers = async (req, res) => {
    try {
        const archivedOffers = await Offer.findAll({
            where: {
                offer_date: {
                    [Op.lt]: fn('CURDATE')
                },
            }
        });
        await res.status(200).json(archivedOffers);
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
}

module.exports = {
    addNotes,
    editNotes,
    viewPublishedOffers,
    viewArchivedOffers
};