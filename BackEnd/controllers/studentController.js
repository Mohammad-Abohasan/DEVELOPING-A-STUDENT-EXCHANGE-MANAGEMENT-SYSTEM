const University = require("../model/University");
const Settings = require("../model/Settings");
const Student = require("../model/Student");
const Request = require("../model/Request");
const Offer = require("../model/Offer");
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
        res.status(500).json({
            'message': err.message
        });
    }
};

const cancelRequest = async (req, res) => {
    try {
        const requestID = req.body.request_id;
        const request = await Request.findByPk(requestID);
        await request.update({
            status: 'Cancelled'
        });
        return res.status(200).json({
            'message': 'Request cancelled successfully 🙂'
        });
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
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
            },
            include: [
                {
                    model: University,
                    as: 'university_src',
                    attributes: ['name', 'country', 'city']
                }
            ]
        });
        await res.status(200).json(availableOffers);
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
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

        const found = await Request.findAll({
            where: {
                offer_id: offerID,
                student_id: student.id
            }
        });
        if (found.length > 0) {
            return res.status(200).json({
                'message': 'Request already exists'
            });
        }

        await Request.create({
            request_date: fn('CURDATE'),
            status: 'Pending',
            offer_id: offerID,
            student_id: student.id
        });
        res.status(200).json({
            'message': 'Request submitted successfully 🥳'
        });
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
}

const viewInterests = async (req, res) => {
    try {
        const username = req.user;
        const student = await Student.findOne({
            where: {
                username
            }
        });
        const setting = await Settings.findAll({
            where: {
                student_id: student.id
            }
        });
        res.status(200).json(setting);
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
};

const addInterest = async (req, res) => {
    try {
        const username = req.user;
        const student = await Student.findOne({
            where: {
                username
            }
        });
        const trainType = req.body.train_type;
        const supportAmount = req.body.support_amount;
        const collegeName = req.body.college_name;
        const branchName = req.body.branch_name;
        const workField = req.body.work_field;
        const placeOfWork = req.body.place_of_work;

        const found = await Settings.findAll({
            where: {
                train_type: trainType,
                support_amount: supportAmount,
                college_name: collegeName,
                branch_name: branchName,
                work_field: workField,
                place_of_work: placeOfWork,
                student_id: student.id
            }
        });
        if (found.length > 0) {
            return res.status(200).json({
                'message': 'Interest already exists'
            });
        }

        const setting = await Settings.create({
            train_type: trainType,
            support_amount: supportAmount,
            college_name: collegeName,
            branch_name: branchName,
            work_field: workField,
            place_of_work: placeOfWork,
            student_id: student.id
        });
        res.status(200).json({
            'message': 'Interest added successfully 🥳',
            'data': setting
        });
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
};

const updateInterest = async (req, res) => {
    try {
        const settingID = req.body.setting_id;
        const trainType = req.body.train_type;
        const supportAmount = req.body.support_amount;
        const collegeName = req.body.college_name;
        const branchName = req.body.branch_name;
        const workField = req.body.work_field;
        const placeOfWork = req.body.place_of_work;
        if (trainType) {
            await Settings.update({ train_type: trainType }, {
                where: { id: settingID }
            });
        }
        if (supportAmount) {
            await Settings.update({ support_amount: supportAmount }, {
                where: { id: settingID }
            });
        }
        if (collegeName) {
            await Settings.update({ college_name: collegeName }, {
                where: { id: settingID }
            });
        }
        if (branchName) {
            await Settings.update({ branch_name: branchName }, {
                where: { id: settingID }
            });
        }
        if (workField) {
            await Settings.update({ work_field: workField }, {
                where: { id: settingID }
            });
        }
        if (placeOfWork) {
            await Settings.update({ place_of_work: placeOfWork }, {
                where: { id: settingID }
            });
        }
        res.status(200).json({
            'message': 'Interest updated successfully 😁',
        });
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
}

const cancelInterest = async (req, res) => {
    try {
        const interestID = req.body.interest_id;
        const setting = await Settings.findByPk(interestID);
        if (!setting) {
            return res.status(200).json({
                'message': 'Interest not found'
            });
        }
        await setting.destroy();
        return res.status(200).json({
            'message': 'Interest cancelled successfully 🙂'
        });
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
};

const getInterestOffer = async (req, res) => {
    try {
        const username = req.user;
        const student = await Student.findOne({
            where: {
                username
            }
        });
        const settingID = req.body.setting_id;
        const setting = await Settings.findByPk(settingID);
        const whereClause = {
            major_name: student.major
        };

        // console.log(Object.entries(setting));
        if (setting.train_type) {
            whereClause.train_type = setting.train_type;
        }
        if (setting.support_amount) {
            whereClause.support_amount = setting.support_amount;
        }
        if (setting.college_name) {
            whereClause.college_name = setting.college_name;
        }
        if (setting.branch_name) {
            whereClause.branch_name = setting.branch_name;
        }
        if (setting.work_field) {
            whereClause.work_field = setting.work_field;
        }
        if (setting.place_of_work) {
            whereClause.place_of_work = setting.place_of_work;
        }
        // console.log(Object.entries(whereClause));

        const interestOffers = await Offer.findAll({
            where: whereClause
        });
        res.status(200).json(interestOffers);
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
}

const viewStudentDetails = async (req, res) => {
    try {
        const studentID = req.body.student_id;
        const student = await Student.findByPk({
            where: {
                student_id: studentID
            }
        });
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
};

module.exports = {
    viewRequests,
    cancelRequest,
    viewAvailableOffers,
    submitOffer,
    viewInterests,
    addInterest,
    updateInterest,
    cancelInterest,
    getInterestOffer,
    viewStudentDetails
};