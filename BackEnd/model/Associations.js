const Image = require("./Image");
const MatchesStudentOffer = require("./MatchesStudentOffer ");
const Offer = require("./Offer");
const Request = require("./Request");
const Student = require("./Student");
const User = require("./User");

const Associations = () => {
    Offer.hasMany(Request, { foreignKey: "offerID" });
    Request.belongsTo(Offer, { foreignKey: "offerID" });

    Student.hasMany(Request, { foreignKey: "studentID" });
    Request.belongsTo(Student, { foreignKey: "studentID" });


    Offer.hasMany(MatchesStudentOffer, { foreignKey: "offerID" });
    MatchesStudentOffer.belongsTo(Offer, { foreignKey: "offerID" });

    Student.hasMany(MatchesStudentOffer, { foreignKey: "studentID" });
    MatchesStudentOffer.belongsTo(Student, { foreignKey: "studentID" });

    Student.hasOne(User, { foreignKey: "ID" });
    User.belongsTo(Student, { foreignKey: "ID" });

    User.hasOne(Image, { foreignKey: "userID" });
    Image.belongsTo(User, { foreignKey: "userID" });
}

module.exports = Associations;
