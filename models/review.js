import { DataTypes } from "sequelize";
import db from "../util/database.js";
import Sequelize from "sequelize";
import Drama from "./drama.js";
const { default: database } = db;

const Review = db.define("Review", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

export default Review;
