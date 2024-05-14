import { DataTypes } from "sequelize";
import db from "../util/database.js";
import Sequelize from "sequelize";
import Review from "./review.js";
const { default: database } = db;

const Drama = db.define("Drama", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING(1234),
        allowNull: false,
    },
    genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    castMembers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    language: {
        type: DataTypes.ENUM("Chinese", "Korean", "Japanese", "English"),
        allowNull: false,
    },
});

Drama.hasMany(Review, { as: "reviews", foreignKey: "dramaId" });

export default Drama;
