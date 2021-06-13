const pluralizeWordOnly = (word, times) => {
    if (times === 1) {
        return word;
    } else {
        return `${word}s`;
    }
}

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
