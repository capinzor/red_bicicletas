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

exports.bicycle_update = function (req, res) {
    var bicy = Bicycle.findById(req.params.id);
    bicy.id=req.body.id;
    bicy.color=req.body.color
    bicy.model=req.body.model;
    bicy.location=[req.body.lat, req.body.lng];

    res.status(200).json({ 
        bicycle: bicy
    });
}