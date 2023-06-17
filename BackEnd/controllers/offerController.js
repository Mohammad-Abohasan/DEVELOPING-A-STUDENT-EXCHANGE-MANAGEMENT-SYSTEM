const Student = require("../model/Student");
const Request = require("../model/Request");
const Offer = require("../model/Offer");
const { Op } = require('sequelize');
const { fn, col } = require('sequelize');
const University = require("../model/University");

const updateNotesByType = async (req, res, updateType) => {
    try {
        const offerID = req.body.offer_id;
        const studentID = req.body.student_id;
        const notes = req.body.notes;
        // console.log(offerID, studentID, notes)
        const request = await Request.findOne({
            where: {
                offer_id: offerID,
                student_id: studentID
            }
        });
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
            where: whereClause,
            include: [
                {
                    model: University,
                    as: 'university_src',
                    attributes: ['name', 'country', 'city']
                }
            ]
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

const getOfferDetailsByType = async (req, res, offerType) => {
    try {
        const offerID = req.params.offerID;
        let whereClause = { id: offerID };
        let message = '';
        if (offerType === 'Published') {
            whereClause = {
                ...whereClause,
                offer_date: {
                    [Op.gt]: fn('CURDATE')
                },
            };
            message = 'Published Offers';
        } else if (offerType === 'Pending') {
            whereClause = {
                ...whereClause,
                offer_date: {
                    [Op.lte]: fn('CURDATE')
                },
                user_id: null
            };
            message = 'Pending Offers';
        } else if (offerType === 'Archived') {
            whereClause = {
                ...whereClause,
                offer_date: {
                    [Op.lte]: fn('CURDATE')
                },
                user_id: {
                    [Op.not]: null
                }
            };
            message = 'Archived Offers';
        }
        const offerDetails = await Offer.findAll({
            where: whereClause,
            include: [
                {
                    model: University,
                    as: 'university_src',
                    attributes: ['name', 'country', 'city']
                }
            ]
        });
        await res.status(200).json({
            'message': message,
            'data': offerDetails
        });
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
}

const viewPublishedOfferDetails = async (req, res) => {
    await getOfferDetailsByType(req, res, 'Published');
}

const viewPendingOfferDetails = async (req, res) => {
    await getOfferDetailsByType(req, res, 'Pending');
}

const viewArchivedOfferDetails = async (req, res) => {
    await getOfferDetailsByType(req, res, 'Archived');
}

const viewStudentList = async (req, res) => {
    try {
        const offerID = req.params.offerID;
        const students = await Student.findAll({
            include: [
                {
                    model: Request,
                    where: { offer_id: offerID },
                }
            ],
            attributes: ['name', 'gpa', 'major', 'english_1_mark', 'english_2_mark']
        });
        await res.status(200).json(students);
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
}

const viewStudentArchive = async (req, res) => {
    try {
        const studentID = req.params.studentID;

        const studentArchive = await Request.findAll({
            where: {
                student_id: studentID
            },
            include: [
                {
                    model: Offer,
                    attributes: ['offer_date', 'train_start_date', 'train_end_date', 'branch_name'],
                    include: [
                        {
                            model: University,
                            as: 'university_src',
                            attributes: ['name', 'country']
                        }
                    ]
                }
            ]
        })
        await res.status(200).json(studentArchive);
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
}

const viewStudentDetails = async (req, res) => {
    try {
        const studentID = req.params.studentID;
        const student = await Student.findOne({
            where: {
                id: studentID
            }
        });
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
};

const assignStudent = async (req, res) => {
    // view published offer -> choose offer -> view list of student -> choose student
    try {
        const studentID = req.params.studentID;
        const offerID = req.params.offerID;
        // console.log(studentID, offerID)
        const request = await Request.findOne({
            where: {
                student_id: studentID,
                offer_id: offerID
            }
        });
        await Request.update({ status: 'Rejected' }, {
            where: {
                offer_id: request.offer_id
            }
        });
        await request.update({ status: 'Accepted' }, {
            where: {
                offer_id: request.offer_id,
                student_id: request.student_id
            }
        });
        const offer = await Offer.findByPk(offerID);
        await offer.update({ user_id: studentID });
        await res.status(200).json({
            'message': 'Offer assigned to student successfully'
        });
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
    viewPendingOffers,
    viewArchivedOffers,
    viewArchivedOfferDetails,
    viewPendingOfferDetails,
    viewPublishedOfferDetails,
    viewStudentList,
    viewStudentArchive,
    assignStudent,
    viewStudentDetails
};