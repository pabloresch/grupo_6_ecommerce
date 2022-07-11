guestMiddleware = function (req, res, next) {
    if (req.session.usuario) {
       return res.redirect('/');
    }
    next();
}

module.exports = guestMiddleware