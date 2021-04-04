var Bicycle = require('../../../models/bicycle');
var request = require('request');
//var request = require('../../../bin/www');
var request = require('request');
var mongoose = require('mongoose');

var base_url = "http://localhost:5000/api/bicycles";

describe('Bicycle API', () => {

    beforeEach(function (done) {
        //jasmine.DEFAULT_TIMEOUT_INTERVAL = 0;
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

    describe('GET BICYCLES /', () => {
        it('Status 200', () =>{
            expect(Bicycle.allBicycles.length).toBe(0);

            var a = new Bicycle(1, 'negro', 'urbana', [4.6997100, -74.0007500]);
            Bicycle.add(a);

            request.get('http://localhost:5000/api/bicycles', function(error, response, body){
                expect(response.statusCode).toBe(200);
            });
        });
    });

    // describe('POST BICYCLES /create', () => {
    //     it('Status 200', (done) =>{
    //         var headers = {'content-type' : 'aplicattion/json'};
    //         var aBicy = '{"id": 10, "color": "rojo", "model": "urbana", "lat": 4, "lng": -74}';
    //         request.post({
    //             headers: headers,
    //             url: 'http://localhost:5000/api/bicycles/create', 
    //             body: aBicy 
    //          }, function(error, response, body) {
    //             expect(response.statusCode).toBe(200);
    //             var bicy = JSON.parse(body).bicycle;
    //             console.log(bicy);
    //             expect(bicy.color).toBe("rojo");
    //             expect(bicy.model).toBe("urbana");
    //             expect(bicy.location[0]).toBe(4);
    //             expect(bicy.location[1]).toBe(-74);
    //             done();
    //         });
    //     });    
    // });

    // describe ('POST BICYCLES /delete', () => {
    //     it('Status 204', (done) => {
    //         var headers = {'content-type' : 'application/json'};
    //         var a = new Bicycle({code: 10, color: 'rojo', model: 'urbana', location: [-34, -54]});
    //         var aBicyId = { "id": a.code };
    //         Bicycle.add (a);
            
    //         expect(Bicycle.allBicycles.length).toBe(1);

    //         request.post({
    //             headers: headers,
    //             url: base_url + '/delete',
    //             body: JSON.stringify(aBicyId)
    //         }, function(error, response, body) {
    //             expect(response.statusCode).toBe(204);
    //             Bicycle.allBicycles(function(err, doc) {
    //                 expect(doc.length).toBe(0);
    //                 done();
    //             });
    //         });
    //     });
    // });
});

