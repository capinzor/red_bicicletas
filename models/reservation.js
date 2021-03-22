var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var reservationSchema = new Schema({
    since: Date,
    until: Date,
    bicycle: { type: mongoose.Schema.Types.ObjectId, ref: 'Bicycle' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});


reservationSchema.methods.reservationDays = function(){
    return moment(this.until).diff(moment(this.since), 'days') + 1;
};

module.exports = mongoose.model('Reservation', reservationSchema);