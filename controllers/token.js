var User = require('../models/user');
var Token = require('../models/token');

module.exports = {
    confirmationGet: function(req, res, nest){
        Token.findOne({ token: req.params.token} , function (err, token) {
            if (!token) return res.status(400).send({ type: 'not-verified', msg: 'No encontramos un usuario con este token. Quizá haya expirado y debas solicitar uno nuevo.'});
            User.findById(token._userId, function (err, user) {
                if (!user) return res.status(400).send({ msg: 'No encontramos un usuario con este token'});
                if (user.verified) return res.redirect('/users');
                user.verified = true;
                user.save(function (err) {
                    if (err) { return res.status(500).send({ msg: err.message }); }
                    res.redirect('/');
                });
            });
        });
    },
};