var Bicycle = require('../../../models/bicycle');
var request = require('request');
//var request = require('../../../bin/www');

describe('Bicycle API', () => {
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
});

describe('POST BICYCLES /create', () => {
    it('Status 200', (done) =>{
        var headers = {'content-type' : 'aplicattion/json'};
        var aBicy = '{"id": 10, "color": "rojo", "modelo": "urbana", "lat": 4, "lng": -74}';
        request.post({
            headers: headers,
            url: 'http://localhost:5000/api/bicycles/create', 
            body: aBicy 
         }, function(error, response, body){
            expect(response.statusCode).toBe(200);
            expect(Bicycle.findById(10).color).toBe("rojo");
            done();
        });
    });    
});