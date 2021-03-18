var Bicycle = function(id, color, model, location){
    this.id=id;
    this.color=color;
    this.model=model;
    this.location=location;
}

Bicycle.prototype.toString = function () {
    return 'id: ' + this.id + ' | color: ' + this.color;
}

Bicycle.allBicycles = [];
Bicycle.add = function (aBicy) {
    Bicycle.allBicycles.push(aBicy);
}

Bicycle.findById = function (aBicyId) {
    var aBicy = Bicycle.allBicycles.find(x => x.id == aBicyId);
    if (aBicy)
        return aBicy;
    else
        throw new Error(`No existe un bicicleta con el id ${aBicyId}`)
}

Bicycle.removeById = function (aBicyId) {
    for (let i = 0; i < Bicycle.allBicycles.length; i++) {
        if (Bicycle.allBicycles[i].id==aBicyId) {
            Bicycle.allBicycles.splice(i,1);
            break;
        }        
    }
}

// var a = new Bicycle(1, 'rojo', 'urbana',[4.6297100, -74.0817500]);
// var b = new Bicycle(2, 'blanco', 'urbana',[4.7097100, -74.1417500]);

// Bicycle.add(a);
// Bicycle.add(b);

module.exports = Bicycle;
