const { Sequelize, DataTypes } = require('sequelize');

/**
 * @param { Sequelize } sequelize
 */
module.exports = (sequelize) => sequelize.define('movieNightSuggestion', {
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
	movie: Sequelize.STRING,
	suggester: Sequelize.STRING,
	status: Sequelize.STRING,
	suggestionMessageID: Sequelize.STRING,
	verdictReason: Sequelize.TEXT,
	verdicter: Sequelize.TEXT,
	verdicterID: Sequelize.TEXT,
	// usage_count: {
	// 	type: Sequelize.INTEGER,
	// 	defaultValue: 0,
	// 	autoNull: false
	// }
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
	verdicter: DataTypes.STRING
=======
	verdicter: DataTypes.STRING,
	verdicterID: DataTypes.STRING
>>>>>>> Stashed changes
>>>>>>> Stashed changes
});
