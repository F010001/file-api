"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
class RecordModel extends sequelize_1.Model {
}
exports.RecordModel = RecordModel;
RecordModel.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    message: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    authorId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.connection,
    tableName: 'records',
});
