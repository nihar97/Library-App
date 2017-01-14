// the main api with the list of libraries
var bodyParser = require('body-parser'); 	// get body-parser
var Library      = require('../models/library');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

//create tokens for users if needed

module.exports = function(app, express) {
	
	var apiRouter = express.Router();

	//on routes that end in /libraries
	apiRouter.route('/libraries')

		//add a library to the list
		.post(function(req,res) {
			var library = new Library();
			library.name = req.body.name;
			library.location = req.body.location;
			library.occupants = req.body.occupants;

			library.save(function(err) {
				if (err) {
					if (err.code == 11000)
						return res.json({ success: false, message: 'A library with that name already exists.'});
					else
						return res.send(err);
				}

				res.json({message: 'New Library added to list.'});
			});
		})

		//get all the libraries
		.get(function(req,res) {
			Library.find({}, function(err, libraries) {
				if (err) res.send(err);

				//return the libraries
				res.json(libraries);
			});
		});

	//routes for one particular library
	apiRouter.route('libraries/:library_id')

		//get the library
		.get(function(req, res) {
			Library.findById(req.params.library_id, function(err, library){
				if (err) res.send(err);

				res.json(library);
			});
		})

		// update the library with this id
		.put(function(req, res) {
			Library.findById(req.params.library_id, function(err, library) {

				if (err) res.send(err);

				// set the new library information if it exists in the request
				if (req.body.name) library.name = req.body.name;
				if (req.body.location) library.location = req.body.location;
				if (req.body.occupants) library.occupants = req.body.occupants;

				// save the library
				library.save(function(err) {
					if (err) res.send(err);

					// return a message to the console
					res.json({ message: 'Library information updated.' });
				});

			});
		})

		// delete the library with this id
		.delete(function(req, res) {
			Library.remove({
				_id: req.params.library_id
			}, function(err, user) {
				if (err) res.send(err);

				res.json({ message: 'Successfully deleted the library.' });
			});
		});

	return apiRouter;
	
};