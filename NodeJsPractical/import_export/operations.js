const add = (a, b) => {
    return a + b;
}

const sub  = (a, b) => {
    return a - b;
}

const name = "Ravi";
/* to export single method */
// module.exports = add;

/* to export more than one methods */
// module.exports.add = add;
// module.exports.sub = sub;

module.exports = {add, sub, name}

