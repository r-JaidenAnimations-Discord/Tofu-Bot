const { Sequelize, DataTypes } = require('sequelize');

/**
 * @param { Sequelize } sequelize
 */
module.exports = (sequelize) => sequelize.define('birthdays', {
	name: DataTypes.STRING,
	date: DataTypes.DATE
});
