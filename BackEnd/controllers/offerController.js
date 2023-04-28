const Student = require("../model/Student");
const Request = require("../model/Request");
const Offer = require("../model/Offer");
const { Op } = require('sequelize');
const { fn, col } = require('sequelize');

const updateNotesByType = async (req, res, updateType) => {
    try {
        const requestID = req.body.request_id;
        const notes = req.body.notes;
        const request = await Request.findByPk(requestID);
        await request.update({ notes });
        let message = '';
        if (updateType === 'Add') {
            message = 'Notes added successfully 🙂';
        } else if (updateType === 'Edit') {
            message = 'Notes edited successfully 🙂';
        }
        await res.status(200).json({
            'message': message,
        });
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
}

const addNotes = async (req, res) => {
    await updateNotesByType(req, res, 'Add');
}

const editNotes = async (req, res) => {
    await updateNotesByType(req, res, 'Edit');
}

const getOffersByType = async (req, res, offerType) => {
    try {
        let whereClause = {};
        let message = '';
        if (offerType === 'Published') {
            whereClause = {
                offer_date: {
                    [Op.gt]: fn('CURDATE')
                },
            };
            message = 'Published Offers';
        } else if (offerType === 'Pending') {
            whereClause = {
                offer_date: {
                    [Op.lte]: fn('CURDATE')
                },
                user_id: null
            };
            message = 'Pending Offers';
        } else if (offerType === 'Archived') {
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