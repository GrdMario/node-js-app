export const errorHandler = (err: any, req, res, next) => {
        res.status(500).json({errors: [{
            msg: 'Internal Server Error'
        }]});
}
