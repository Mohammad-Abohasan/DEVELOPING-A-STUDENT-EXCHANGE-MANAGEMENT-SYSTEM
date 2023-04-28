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

const getOffersByType = async (req, res) => {
    try {
        const whereClause = {};
        let message = '';
        if (category === 'Published') {
            whereClause = {
                offer_date: {
                    [Op.gt]: fn('CURDATE')
                },
            };
            message = 'Published Offers';
        } else if (category === 'Pending') {
            whereClause = {
                offer_date: {
                    [Op.lte]: fn('CURDATE')
                },
                user_id: null
            };
            message = 'Pending Offers';
        } else if (category === 'Archived') {
            whereClause = {
                offer_date: {
                    [Op.lte]: fn('CURDATE')
                },
                user_id: {
                    [Op.not]: null
                }
            };
            message = 'Archived Offers';
        }
        const offers = await Offer.findAll({
            where: whereClause
        });
        await res.status(200).json({
            'message': message,
            'data': offers
        });
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
}

const viewPublishedOffers = async (req, res) => {
    await getOffersByType(req, res, 'Published');
}

const viewPendingOffers = async (req, res) => {
    await getOffersByType(req, res, 'Pending');
}

const viewArchivedOffers = async (req, res) => {
    await getOffersByType(req, res, 'Archived');
}


module.exports = {
    addNotes,
    editNotes,
    viewPublishedOffers,
    viewPendingOffers,
    viewArchivedOffers
};