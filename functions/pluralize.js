/**
 * Add an 's' to a word when needed
 * @param {String} word The word to be possibly pluralized
 * @param {Number} times How many times the word references
 * @returns {String} Word either with or without 's'
 */
const pluralizeWordOnly = (word, times) => {
    if (times === 1) {
        return word;
    } else {
        return `${word}s`;
    }
}

/**
 * Add an 's' to a word when needed
 * @param {String} word The word to be possibly pluralized
 * @param {Number} times How many times the word references
 * @returns {String} Number of how many times the word references and word either with or without 's'
 */
const pluralizeWithNumber = (word, times) => {
    if (times === 1) {
        return `${times} ${word}`
    } else {
        return `${times} ${word}s`
    }
}

module.exports = {
    pluralizeWordOnly,
    pluralizeWithNumber
}
