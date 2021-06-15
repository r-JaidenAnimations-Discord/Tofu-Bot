const Sequelize = require('sequelize');

/**
 * @param { Sequelize } sequelize
 */
module.exports = (sequelize) => sequelize.define('movieNightSuggestion', {
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
});
