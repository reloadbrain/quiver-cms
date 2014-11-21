var ConfigService = require('./config-service'),
	Firebase = require('firebase'),
	firebaseEndpoint = ConfigService.get('public.firebase.endpoint'),
  firebaseRoot = new Firebase(firebaseEndpoint),
  firebaseSecret = ConfigService.get('private.firebase.secret'),
  Q = require('q'),
  deferred = Q.defer();

console.log('firebase-service auth');
firebaseRoot.auth(firebaseSecret, function () {
	console.log('authWithCustomToken successful');
	deferred.resolve();

	firebaseRoot.onAuth(function (authData) {
		if (!authData) {
			firebaseRoot.authWithCustomToken(firebaseSecret, function (authData) {
				// console.log('logged back in', authData);
			});
		}
		
	});
});



module.exports = {
	firebaseRoot: firebaseRoot,

	isAuthenticated: function () {
		return deferred.promise;
	},

	getWords: function () {
		return firebaseRoot.child('content').child('words');
	},

	getProducts: function () {
		return firebaseRoot.child('content').child('products');
	},

	getInstagram: function () {
		return firebaseRoot.child('content').child('social').child('instagram');
	},

	getFiles: function () {
		return firebaseRoot.child('content').child('files');
	},

	getHashtags: function () {
		return firebaseRoot.child('content').child('hashtags');
	},

	getUser: function (key) {
		return firebaseRoot.child('users').child(key);
	},

	getDiscounts: function () {
		return firebaseRoot.child('discounts');
	},

	getSettings: function () {
		return firebaseRoot.child('settings');
	},

	getTransaction: function (key) {
		return firebaseRoot.child('logs').child('transactions').child(key);
	},

	getUserTransaction: function (userId, key) {
		return firebaseRoot.child('users').child(userId).child('private').child('commerce').child('transactions').child(key);
	},

	getTheme: function () {
		return firebaseRoot.child('theme');
	},

	getLogs: function () {
		return firebaseRoot.child('logs');
	},

	getResources: function () {
		return firebaseRoot.child('resources');
	}
	
}