var myApp = angular.module('myApp', ['ngRoute', 'angularUtils.directives.dirPagination', 'ngTable'])

myApp.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'ProductsController',
			templateUrl: 'views/products.html',
		})
		.when('/products', {
			controller: 'ProductsController',
			templateUrl: 'views/products.html',
		})
		.when('/products/details/:id', {
			controller: 'ProductsController',
			templateUrl: 'views/product_details.html',
		})
		.when('/orders', {
			controller: 'OrdersController',
			templateUrl: 'views/orders.html',
		})
		.otherwise({
			redirectTo: '/',
		})
})