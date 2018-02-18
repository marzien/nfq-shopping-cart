var myApp = angular.module('myApp')

myApp.controller('OrdersController', ['$scope', '$http', '$location', '$routeParams', 'NgTableParams',
	function ($scope, $http, $location, $routeParams, NgTableParams) {

		$http.get('/orders').then(function (response) {
			$scope.data = response.data
		})

		$scope.tableParams = new NgTableParams({}, {
			dataset: $scope.data
		});

		$scope.sort = function (keyname) {
			$scope.sortKey = keyname;
			$scope.reverse = !$scope.reverse;
		}

	}])


