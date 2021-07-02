const { Sequelize } = require('sequelize');

const tagSequelize = new Sequelize({
	dialect: 'sqlite',
	logging: false,
	storage: 'db/tags.sqlite'
});

const movieSuggestionSequelize = new Sequelize({
	dialect: 'sqlite',
	logging: false,
	storage: 'db/movieNightSuggestions.sqlite'
});

module.exports = {
	tagSequelize,
	movieSuggestionSequelize
}