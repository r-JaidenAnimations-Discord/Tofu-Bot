const { Sequelize, DataTypes } = require('sequelize');

/**
 * @param { Sequelize } sequelize
 */
module.exports = (sequelize) => sequelize.define('movieNightSuggestion', {
	movie: DataTypes.STRING,
	suggester: DataTypes.STRING,
	suggesterTag: DataTypes.STRING,
	suggesterAvatar: DataTypes.STRING,
	watchedDate: DataTypes.DATE,
	status: {
		type: DataTypes.ENUM,
		values: ['Pending Approval', 'Approved', 'Considered', 'Denied', 'Watched']
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
