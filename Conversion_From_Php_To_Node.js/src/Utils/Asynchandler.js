
const asynchandler = (functionhandler) => {
    return (req, res, next) => {
        Promise.resolve(functionhandler(req, res, next)).catch(next);
    }
}

export default asynchandler