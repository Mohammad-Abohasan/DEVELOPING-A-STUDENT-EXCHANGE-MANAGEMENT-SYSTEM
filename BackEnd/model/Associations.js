// const Image = require("./Image");
const Offer = require("./Offer");
const Request = require("./Request");
const Student = require("./Student");
const University = require("./University");
const Settings = require("./Settings");
const User = require("./User");

const Associations = () => {
    Offer.hasMany(Request, { foreignKey: "offer_id" });
    Request.belongsTo(Offer, { foreignKey: "offer_id" });

    Student.hasMany(Request, { foreignKey: "student_id" });
    Request.belongsTo(Student, { foreignKey: "student_id" });

    User.hasOne(Student, { foreignKey: "username" });
    Student.belongsTo(User, { foreignKey: "username" });

    Student.hasOne(Settings, { foreignKey: "student_id" });
    Settings.belongsTo(Student, { foreignKey: "student_id" });

    University.hasMany(Offer, { foreignKey: "university_id_src", as: "university_src" });
    Offer.belongsTo(University, { foreignKey: "university_id_src", as: "university_src" });

    University.hasMany(Offer, { foreignKey: "university_id_des", as: "university_des" });
    Offer.belongsTo(University, { foreignKey: "university_id_des", as: "university_des" });

    University.hasMany(Student, { foreignKey: "university_id" });
    Student.belongsTo(University, { foreignKey: "university_id" });
}

module.exports = Associations;
