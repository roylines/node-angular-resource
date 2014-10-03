var assert = require('assert'),
		angularRest = require('../lib/angular-rest'),
		sinon = require('sinon'),
		testObject = require('./testObject');

describe('angular-rest', function() {
	var app;
	beforeEach(function() {
		app = {
			"get": sinon.stub(),
			"post": sinon.stub(),
			"delete": sinon.stub()
		};
	});
	describe('without middleware', function() {
		describe('using testObject', function() {
			beforeEach(function() {
				angularRest(app, '/api', 'testObject');
			});
			it('should bind get', function() {
				assert(app.get.calledWith('/api/testObject/:id', testObject.get));
			});
			it('should bind create', function() {
				assert(app.post.calledWith('/api/testObject', testObject.create));
			});
			it('should bind save', function() {
				assert(app.post.calledWith('/api/testObject/:id', testObject.save));
			});
			it('should bind query', function() {
				assert(app.get.calledWith('/api/testObject', testObject.query));
			});
			it('should bind remove', function() {
				assert(app["delete"].calledWith('/api/testObject/:id', testObject.remove));
			});
		});
	});
	describe('with middleware', function() {
		var middleware = { };
		describe('using testObject', function() {
			beforeEach(function() {
				angularRest(app, '/api', 'testObject', middleware);
			});
			it('should bind get', function() {
				assert(app.get.calledWith('/api/testObject/:id', middleware, testObject.get));
			});
			it('should bind create', function() {
				assert(app.post.calledWith('/api/testObject', middleware, testObject.create));
			});
			it('should bind save', function() {
				assert(app.post.calledWith('/api/testObject/:id', middleware, testObject.save));
			});
			it('should bind query', function() {
				assert(app.get.calledWith('/api/testObject', middleware, testObject.query));
			});
			it('should bind remove', function() {
				assert(app["delete"].calledWith('/api/testObject/:id', middleware, testObject.remove));
			});
		});
	});
});
