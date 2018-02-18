var myApp = angular.module('myApp')

myApp.controller('OrdersController', ['$scope', '$http', '$location', '$routeParams', 'NgTableParams',
	function ($scope, $http, $location, $routeParams, NgTableParams) {

		$http.get('/orders').then(function (response) {
			var orders_arr = response.data;
			getUserDataById(orders_arr);
		})

		$scope.tableParams = new NgTableParams({}, {
			dataset: $scope.data
		});

		$scope.sort = function (keyname) {
			$scope.sortKey = keyname;
			$scope.reverse = !$scope.reverse;
		}

		getUserDataById = function (orders_arr) {
			var user_id_arr = []
			orders_arr.forEach(element => {
				if (user_id_arr.indexOf(element.user) == -1) {
					user_id_arr.push(element.user)
				}
			});
			$http({
				method: "GET",
				url: '/usersByOrders',
				params: {
					'user_ids': user_id_arr
				}
			}).then(function (response) {
				addUserName(response.data, orders_arr)
			})
		}

		getProductDataById = function (orders_arr) {
			var product_id_arr = [];
			orders_arr.forEach(element => {
				if (product_id_arr.indexOf(element.product) == -1) {
					product_id_arr.push(element.product)
				}
			});
			$http({
				method: "GET",
				url: '/productsByOrders',
				params: {
					'product_ids': product_id_arr
				}
			}).then(function (response) {
				addProductName(response.data, orders_arr)
			})
		}

		addUserName = function (user_arr, orders_arr) {
			orders_arr.forEach((element, index) => {
				var userName = user_arr.find(function (userObj) {
					return userObj._id == orders_arr[index].user
				})
				if (userName) {
					orders_arr[index].userData = userName;
				}
			});
			getProductDataById(orders_arr);
		}

		addProductName = function (product_arr, orders_arr) {

			orders_arr.forEach((element, index) => {
				var productObj = product_arr.find(function (productObj) {
					return productObj._id == orders_arr[index].product
				})
				if (productObj) {
					orders_arr[index].productData = productObj;
				}
			});
			$scope.data = orders_arr;
		}

	}])


