var Bicycle = require('../../models/bicycle');

exports.bicycle_list = function (req, res) {
    res.status(200).json({
        bicycles: Bicycle.allBicycles
    })
}

exports.bicycle_create = function (req, res) {
    var bicy = new Bicycle(req.body.id, req.body.color, req.body.model);
    bicy.location=[req.body.lat, req.body.lng];
    Bicycle.add(bicy);

    res.status(200).json({ 
        bicycle: bicy
    });
}

exports.bicycle_delete = function (req, res) {
    Bicycle.removeById(req.body.id);

    res.status(204).send();
}