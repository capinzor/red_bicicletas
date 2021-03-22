var mongoose = require('mongoose');
var Bicycle = require('../../../models/bicycle');
//var server = require('../../../bin/www'); //Para Mongoose


describe('Testing Bicycles', function() {

    beforeAll(function (done) {        
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, {useNewUrlParser: true});

        const db = mongoose.connection;
        db.on('error',console.error.bind(console, 'connection error'));
        db.once('open', function(){
            console.log('We are connected to test database: ');
            done();
        });
    });

    afterEach(function(done) {
        Bicycle.deleteMany({}, function(err, success){
            if (err) console.log(err);
            done();
        });
        
    });

    describe('Bicycle.createInstance',() => {
        it('crea una instancia de Bicycle', () => {
            var bicy = Bicycle.createInstance(1, "verde", "urbana", [-34.5, -54.1]);

            expect(bicy.code).toBe(1);
            expect(bicy.color).toBe("verde");
            expect(bicy.model).toBe("urbana");
            expect(bicy.location[0]).toBe(-34.5);
            expect(bicy.location[1]).toBe(-54.1);
        });
    });

    describe('Bicycle.allBicycles', () => {
        it('comienza vacia', (done) => {
            Bicycle.allBicycles(function(err, bicys){
                expect(bicys.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicycle.add', () => {
        it('agrega solo una bici', (done) => {
            var aBicy = new Bicycle({code: 1, color: "verde", model: "urbana", location: [-34, -54]});
            Bicycle.add(aBicy, function(err, newBicy){
                if (err) console.log(err);
                Bicycle.allBicycles(function(err, bicycles){
                    expect(bicycles.length).toEqual(1);
                    expect(bicycles[0].code).toEqual(aBicy.code);
                    expect(bicycles[0].color).toEqual(aBicy.color);
                    expect(bicycles[0].model).toEqual(aBicy.model);
                    expect(bicycles[0].location[0]).toEqual(aBicy.location[0]);
                    expect(bicycles[0].location[1]).toEqual(aBicy.location[1]);

                    done();
                });
            });
        });
    });

    describe('Bicycle.findByCode', () => {
        it('debe devolver la bici con code 1', (done) => {
            Bicycle.allBicycles(function(err, bicycles){
                expect(bicycles.length).toBe(0);


                var aBicy = new Bicycle({code: 1, color: "verde", model: "urbana"});
                Bicycle.add(aBicy, function(err, newBicy){
                    if (err) console.log(err);

                    var aBicy2 = new Bicycle({code: 2, color: "roja", model: "urbana"});
                    Bicycle.add(aBicy, function(err, newBicy){
                        if (err) console.log(err);
                        Bicycle.findByCode(1, function (error, targetBicy){
                            expect(targetBicy.code).toBe(aBicy.code);
                            expect(targetBicy.color).toEqual(aBicy.color);
                            expect(targetBicy.model).toEqual(aBicy.model);

                            done();
                        });
                    });
                });
            });
        });
    });

    // describe('Bicycle.removeByCode', () => {
    //     it('debe borrar la bici con code 1', (done) => {
    //         Bicycle.allBicis(function(err, bicis){
    //             expect(bicis.length).toBe(0);

    //             var aBici = new Bicycle({code: 1, color: "verde", modelo: "urbana", ubicacion: [-34, -54]});
    //             Bicycle.add(aBici, function(err, newBici){
    //                 if (err) console.log(err);

    //                 Bicycle.add(aBici, function(err, newBici){
    //                     if (err) console.log(err);
    //                     Bicycle.allBicis(function(err, bicis){
    //                         expect(bicis.length).toBe(1);
    //                         Bicycle.removeByCode(1, function(error, response) {
    //                             Bicycle.allBicis(function(err, bicis){
    //                                 expect(bicis.length).toBe(0);
    //                                 done();
    //                             });
    //                         });
    //                     });
    //                 });
    //             });
    //         });
    //     });
    // });

});