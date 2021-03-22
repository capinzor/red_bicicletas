var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bicycleSchema = new Schema({
    code: Number,
    color: String,
    model: String,
    location: {
        type: [Number], index: {type: '2dsphere', sparse: true}
    }
});

bicycleSchema.statics.createInstance = function (code,color,model,location) {
    return new this({
        code: code,
        color: color,
        model:model,
        location: location
    });
}

bicycleSchema.methods.toString = function () {
    return 'code: ' + this.code + ' | color: ' + this.color;
}

bicycleSchema.statics.allBicycles = function (cb) {
    return this.find({}, cb);   
}

bicycleSchema.statics.add = function(aBicy, cb){
    return this.create(aBicy, cb);
};

bicycleSchema.statics.findByCode = function(aCode, cb){
    return this.findOne({code: aCode}, cb);
};

bicycleSchema.statics.removeByCode = function(aCode, cb){
    return this.deleteOne({code: aCode}, cb);
};

module.exports = mongoose.model('Bicycle', bicycleSchema);