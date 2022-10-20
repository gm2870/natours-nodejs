module.exports = (fn) => {
    return (req, res, next) => {
        console.log('res', res);
        fn(req, res, next).catch(next);
    };
};
