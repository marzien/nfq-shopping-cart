var myApp = angular.module('myApp')

myApp.controller('ProductsController', ['$scope', '$http', '$location', '$routeParams',
	function ($scope, $http, $location, $routeParams) {

		$scope.getProducts = function () {
			$http.get('/products').then(function (response) {
				$scope.products = response.data
			})
		}

		$scope.getProduct = function () {
			let id = $routeParams.id
			$http.get('/product/'+id).then(function (response) {
				$scope.product = response.data
			})
		}
		$scope.makeOrder = function (productID, orderQuant, userID) {
			let data = {
				product: productID,
				quantity: orderQuant,
				user: userID, 
			}
			let config = {
				headers: {'Content-Type': 'application/json'}
            }

			$http.post('/order', data, config).then(function (response) {
					if (response.data) {
						$scope.msg = "Order Submitted Successfully!";
					}
				})
				.catch(err => {
					$scope.msg = err.data.message;
					console.log('Error: can\'t sent order request. ' + err.data.message);
				});
		}
	}
])


	