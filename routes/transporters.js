//========================================================================================================================================
// Required modules
//========================================================================================================================================
const express = require('express'),
	router = express.Router();

//========================================================================================================================================
// Required models
//========================================================================================================================================
const Transporter = require('../models/transporter');

//========================================================================================================================================
// Required middleware
//========================================================================================================================================
const auth = require('../middleware/auth/auth'),
	unauth = require('../middleware/auth/unauth');

// ===========================================================================================================================================
//  Index
// To Display All the open jobs in the database
//============================================================================================================================================

router.get('/api/transporters', function(req, res) {
	Transporter.find({}, function(err, users) {
		if (err) {
			res.render('transporter/index', {
				users : users
			});
		} else {
			res.render('transporter/index', {
				users : users
			});
		}
	});
});

// ===========================================================================================================================================
//  Create- New
// Show The Form For Creating A new Transporter
//============================================================================================================================================
router.get('/api/transporters/new', function(req, res) {
	res.render('transporter/add');
});

// ===========================================================================================================================================
//  Store
//  Save the Details of a new Transporter
//============================================================================================================================================

router.post('/api/transporters', function(req, res) {
	// var transporter = req.body.transporter;
	// console.log(transporter);
	// console.log('This is the Rating message ');
	// // Transporter.create(transporter, function (err, newTransporter) {
	// //     if (err) {
	// //         // return res.redirect('/jobs/new');
	// //         res.send('Error');
	// //     }
	// //     res.redirect('/transporters');
	// // });
});

// ===========================================================================================================================================
//  Show
//  Display the Full Details of the region Category Client
//============================================================================================================================================
router.get('/api/categories/:id', function(req, res) {
	var id = req.params.id;

	Category.findById(id, function(err, foundCategory) {
		if (err) {
			console.log('error');
		}
		res.render('category/show', {
			category : foundCategory
		});
	});
});

// ===========================================================================================================================================
//  Edit
//  Show the Edit Form For The Client
//============================================================================================================================================
router.get('/api/categories/:id/edit', function(req, res) {
	res.send('Show The Form for edit');
});

// ===========================================================================================================================================
//  Update
//  Update the Details of the Client
//============================================================================================================================================
router.post('/api/categories/:id', function(req, res) {
	//Method PUT
	res.send('Show The Form for edit');
});

module.exports = router;
