var myApp = angular.module('myApp')

myApp.controller('OrdersController', ['$scope', '$http', '$location', '$routeParams',
	function ($scope, $http, $location, $routeParams) {

		$scope.getOrders = function () {
			$http.get('/orders').then(function (response) {
                $scope.orders = response.data
			})
		}
	}
])


	