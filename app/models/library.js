// this is the model which should have all relevant details of a particular library that has been selected.
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');

//user schema
var LibrarySchema = new Schema({
	name: { type: String, required: true, index: {unique: true}},
	location: {type: String, required: true, index: {unique: true}},
	occupants: {type: Number, required: true 	
});

LibrarySchema.meth      ods.compareName = function(name) {
	var library = this;
	return name.localeCompare(library.name) == 0;
};

LibrarySchema.methods.occupants = function() {
	var library = this;
	return library.occupants;
};

module.exports = mongoose.model('Library', LibrarySchema);