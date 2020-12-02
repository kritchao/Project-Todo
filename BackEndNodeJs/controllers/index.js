const firebase = require('firebase')
// Required for side-effects
require("firebase/firestore");
const config = require('../config/configfirebase.json')
firebase.initializeApp(config);

var db = firebase.firestore();

module.exports = db;