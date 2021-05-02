var User = require('../../models/user');

exports.users_list = function(req, res){
    User.find({}, function(err, users){
        res.status(200).json({
            users: users
        });
    });
};

exports.users_create = function(req, res){
    var user = new User({name: req.body.name, email: req.body.email, password: req.body.password});

    user.save(function(err){
        if (err) return res.status(500).json(err);
        res.status(200).json(user);
    });
    
};

exports.user_reserve = function(req, res){
    User.findById(req.body.id, function(err, user){
        console.log(user);
        user.reserve(req.body.bicy_id, req.body.since, req.body.until, function(err){
            console.log('Reserva!');
            res.status(200).send();
        });
    });
};