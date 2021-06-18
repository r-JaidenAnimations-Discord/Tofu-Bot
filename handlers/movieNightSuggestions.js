const { Sequelize, DataTypes } = require('sequelize');

/**
 * @param { Sequelize } sequelize
 */
module.exports = (sequelize) => sequelize.define('movieNightSuggestion', {
	movie: DataTypes.STRING,
	suggester: DataTypes.STRING,
	status: {
		type: DataTypes.ENUM,
		values: ['Pending Approval', 'Approved', 'Denied', 'Watched']
	},
	suggestionMessageID: DataTypes.STRING,
	verdictReason: {
		type: DataTypes.TEXT,
		defaultValue: 'No reason specified',
		allowNull: false
	},
	verdicter: DataTypes.STRING,
	verdicterID: DataTypes.STRING
});
