var mongoose = require('mongoose');
var Reservation = require('./reservation');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    nombre:  String,
});

userSchema.methods.reserve = function(bicyId, since, until, cb){
    var reservation = new Reservation({user: this._id, bicycle: bicyId, since: since, until: until});
    console.log(reservation);
    reservation.save(cb);
};

module.exports = mongoose.model('User', userSchema);