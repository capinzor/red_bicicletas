var mongoose = require('mongoose');
var Bicycle = require('../../../models/bicycle');
var User = require('../../../models/user');
var Reservation = require('../../../models/reservation');


describe('Testing Users', function() {

    beforeEach(function (done) {
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
        Reservation.deleteMany({}, function(err, success){
            if (err) console.log(err);
            User.deleteMany({}, function(err, success){
                if (err) console.log(err);
                Bicycle.deleteMany({}, function(err, success){
                    if (err) console.log(err);
                    done();
                });
            });
        });
    });

    describe('Cuando un Usuario reserva una bici',() => {
        it('debe existir la reserva', (done) => {
            const user = new User({name: 'Ezequiel'});
            user.save();
            const bicycle = new Bicycle({code: 1, color: "verde", model: "urbana"});
            bicycle.save();
            

            var today = new Date();
            var tomorrow = new Date();
            tomorrow.setDate(today.getDate()+1);
            user.reserve(bicycle.id, today, tomorrow, function(err, reservation){
                Reservation.find({}).populate('bicycle').populate('user').exec(function(err, reservations){
                    console.log(reservations[0]);
                    expect(reservations.length).toBe(1);
                    expect(reservations[0].reservationDays()).toBe(2);
                    expect(reservations[0].bicycle.code).toBe(1);
                    expect(reservations[0].user.name).toBe(user.name);
                    done();
                });
            });
        });
    });
    
});