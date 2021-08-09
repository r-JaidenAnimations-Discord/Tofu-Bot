const { Sequelize, datat } = require('sequelize');

/**
 * @param { Sequelize } sequelize
 */
module.exports = (sequelize) => sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	userID: Sequelize.STRING,
	staffOnly: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		autoNull: false
	}
});
