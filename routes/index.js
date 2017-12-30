'use strict'

let _ = require('lodash');

var express = require('express');
var passport = require('passport');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var request = require('request');

// We are going to want to share some data between our server and UI, so we'll be sure to pass that data in an env variable.
var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: 'http://rsracingufrgs.com.br/callback'
};

/*router.get('/', function(req, res, next) {
  // Now, rather then just sending the text "You are on the homepage", we are going to actually render the view we created using the res.render method. The second argument will allow us to pass in data from the backend to our view dynamically.
  res.render('index', { env: env });
}); */

router.get('/', function (req, res, next) {

    const db = req.db;
    const async = require("async")

    const names = ['capitao','aerodinamica','chassi','controles','drivetrain','eletronica','gestao','marketing','powertrain','suspensao', 'patrocinadores1', 'patrocinadores2', 'patrocinadores3', 'galeria']

    const collections = names.map(name => db.get(name) )

    const functions = collections.map(collection => {
        return done => collection.find( {}, done )
    })

    async.series( functions, (err, results) => {
        // "results" is now an array containing [ docs1, docs2, .. ]
        res.render('index', {
            env: env,
            capitao: results[0],
            aerodinamica: results[1],
            chassi: results[2],
            controles: results[3],
            drivetrain: results[4],
            eletronica: results[5],
            gestao: results[6],
            marketing: results[7],
            powertrain: results[8],
            suspensao: results[9],
            patrocinadores1: results[10],
            patrocinadores2: results[11],
            patrocinadores3: results[12],
            galeria: results[13]
        });
    })
});

/*router.get('/', function (req, res, next) {

    const db = req.db;
    const async = require("async")

    const names = ['capitao','aerodinamica','chassi','controles','drivetrain','eletronica','gestao','marketing','powertrain','suspensao', 'patrocinadores1', 'patrocinadores2', 'patrocinadores3', 'galeria']

    const collections = names.map(name => db.get(name) )

    const functions = collections.map(collection => {
        return done => collection.find( {}, done )
    })

    async.series( functions, (err, results) => {
        // "results" is now an array containing [ docs1, docs2, .. ]
        if (err || _.isUndefined(results)) {
            //general error handling
            console.log(err);
            return res.render('index', {
                env: env,
                capitao: [],
                aerodinamica: [],
                chassi: [],
                controles: [],
                drivetrain: [],
                eletronica: [],
                gestao: [],
                marketing: [],
                powertrain: [],
                suspensao: [],
                patrocinadores1: [],
                patrocinadores2: [],
                patrocinadores3: [],
                galeria: []
            });
        }
        res.render('index', {
            env: env,
            capitao: _.isUndefined(results[0]) ? [] : result[0],
            aerodinamica: _.isUndefined(results[1]) ? [] : result[1],
            chassi: _.isUndefined(results[2]) ? [] : result[2],
            controles: _.isUndefined(results[3]) ? [] : result[3],
            drivetrain:_.isUndefined(results[4]) ? [] : result[4],
            eletronica: _.isUndefined(results[5]) ? [] : result[5],
            gestao: _.isUndefined(results[6]) ? [] : result[6],
            marketing: _.isUndefined(results[7]) ? [] : result[7],
            powertrain: _.isUndefined(results[8]) ? [] : result[8],
            suspensao: _.isUndefined(results[9]) ? [] : result[9],
            patrocinadores1: _.isUndefined(results[10]) ? [] : result[10],
            patrocinadores2: _.isUndefined(results[11]) ? [] : result[11],
            patrocinadores3: _.isUndefined(results[12]) ? [] : result[12],
            galeria: _.isUndefined(results[13]) ? [] : result[13],
        });
    })
});*/

/*router.get('/', function(req, res,next) {

    var db = req.db;


    var collectionCapitao = db.get('capitao');
    var collectionAerodinamica = db.get('aerodinamica');
    var collectionChassi = db.get('chassi');
    var collectionControles = db.get('controles');
    var collectionDrivetrain = db.get('drivetrain');
    var collectionEletronica = db.get('eletronica');
    var collectionGestao = db.get('gestao');
    var collectionMarketing = db.get('marketing');
    var collectionPowertrain = db.get('powertrain');
    var collectionSuspensao = db.get('suspensao');


    const async = require("async")

    const getCapitao = done => {
         collectionCapitao.find({}, (err,docs) => {
              done(err, docs)
         })
    }

    const getAerodinamica = done => {
         collectionAerodinamica.find({}, (err,docs) => {
              done(err, docs)
         })
    }

    const getChassi = done => {
         collectionChassi.find({}, (err,docs) => {
              done(err, docs)
         })
    }

    const getControles = done => {
         collectionControles.find({}, (err,docs) => {
              done(err, docs)
         })
    }

    const getDrivetrain = done => {
         collectionDrivetrain.find({}, (err,docs) => {
              done(err, docs)
         })
    }

    const getEletronica = done => {
         collectionEletronica.find({}, (err,docs) => {
              done(err, docs)
         })
    }

    const getGestao = done => {
         collectionGestao.find({}, (err,docs) => {
              done(err, docs)
         })
    }

    const getMarketing = done => {
         collectionMarketing.find({}, (err,docs) => {
              done(err, docs)
         })
    }

    const getPowertrain = done => {
         collectionPowertrain.find({}, (err,docs) => {
              done(err, docs)
         })
    }

    const getSuspensao = done => {
         collectionSuspensao.find({}, (err,docs) => {
              done(err, docs)
         })
    }

    async.series([
        done => getCapitao(done),
        done => getAerodinamica(done),
        done => getChassi(done),
        done => getControles(done),
        done => getDrivetrain(done),
        done => getEletronica(done),
        done => getGestao(done),
        done => getMarketing(done),
        done => getPowertrain(done),
        done => getSuspensao(done),
    ], (err, results) => {
        // "results" is now an array containing [ docs1, docs2, .. ]
        res.render('index', {
            env: env,
            capitao: results[0],
            aerodinamica : results[1],
            chassi : results[2],
            controles : results[3],
            drivetrain : results[4], 
            eletronica : results[5],
            gestao : results[6],
            marketing : results[7], 
            powertrain : results[8],
            suspensao : results[9]
        });
    })
}); */





router.get('/login',function(req, res){
  // Same thing for the login page.
  res.render('login', { env: env });
});

/*router.get('/galeria', function(req, res){

    res.render('gallery', { env: env });
});*/

router.get('/galeria', function (req, res, next) {

    const db = req.db;
    const async = require("async")

    const names = ['galeria']

    const collections = names.map(name => db.get(name) )

    const functions = collections.map(collection => {
        return done => collection.find( {}, done )
    })

    async.series( functions, (err, resultsgaleria) => {
        // "results" is now an array containing [ docs1, docs2, .. ]
        res.render('gallery', {
            env: env,
            galeria: resultsgaleria[0]
        });
    })
});

router.get('/blog', function(req, res){
    res.render('blog', { env: env });
})

router.get('/logout', function(req, res){
  // For the logout page, we don't need to render a page, we just want the user to be logged out when they hit this page. We'll use the ExpressJS built in logout method, and then we'll redirect the user back to the homepage.
  req.logout();
  res.redirect('/');
});

router.get('/user', ensureLoggedIn, function(req, res, next) {
  // Same thing for our 
  res.render('user', { env: env, user: req.user });
});

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/blog');
  });

module.exports = router;