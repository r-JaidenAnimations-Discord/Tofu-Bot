const { Sequelize } = require('sequelize');

const tagSequelize = new Sequelize({
	dialect: 'sqlite',
	logging: false,
	storage: 'deployData/db/tags.sqlite'
});

const movieSuggestionSequelize = new Sequelize({
	dialect: 'sqlite',
	logging: false,
	storage: 'deployData/db/movieNightSuggestions.sqlite'
});

module.exports = {
	tagSequelize,
	movieSuggestionSequelize
}
