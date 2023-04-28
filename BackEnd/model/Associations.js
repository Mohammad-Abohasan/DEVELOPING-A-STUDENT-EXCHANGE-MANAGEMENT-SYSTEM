const Image = require("./Image");
const Offer = require("./Offer");
const Request = require("./Request");
const Student = require("./Student");
const User = require("./User");

const Associations = () => {
    Offer.hasMany(Request, { foreignKey: "offer_id" });
    Request.belongsTo(Offer, { foreignKey: "offer_id" });

    Student.hasMany(Request, { foreignKey: "student_id" });
    Request.belongsTo(Student, { foreignKey: "student_id" });

    User.hasOne(Student, { foreignKey: "username" });
    Student.belongsTo(User, { foreignKey: "username" });

    User.hasOne(Image, { foreignKey: "username" });
    Image.belongsTo(User, { foreignKey: "username" });
}

module.exports = Associations;