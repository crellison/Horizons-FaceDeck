var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
mongoose.connect(require('./config'))
var _=require('underscore')
var app = express();



var url = 'https://graph.facebook.com/'
var urlEnd = '/picture?width=500&height=500'

var Horizonite = mongoose.model('horizonite', {
  name: String, id: String
})

router.get('/', function(req, res, next) {
	Horizonite.find(function(error, user) {
	    if (error) {
	     	console.log("Can't find cats", error)
	    } else {
	    	
	    	var userData = []
	    	_.forEach(user, function(elt) {
	    		userData.push({
	    			'image':url+elt.id+urlEnd,
	    			'name':elt.name
	    		})
	    	})
			userData = _.shuffle(userData)
			res.render('index', {
				data:userData
			});
	    }
	})	
});

module.exports = router