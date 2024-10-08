const endPointReturn = (msg, results, status) => {
    return {msg, results: results ? results : false, status}
}

module.exports = endPointReturn