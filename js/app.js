var app = angular.module('store', ['firebase', 'ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/Home.html',
            controller: 'homeController'
        })
        .when('/about', {
            templateUrl: 'templates/About.html'

        })
        .when('/cart', {
            templateUrl: 'templates/cart.html'


        })
        .when('/about', {
            templateUrl: 'templates/About.html'

        })
        .when('/cart', {
            templateUrl: 'templates/cart.html'


        })
        .when('/contact', {
            templateUrl: 'templates/Contact.html'

        })
        .when('/search', {
            templateUrl: 'templates/Search.html'
        })
        .when('/contact', {
            templateUrl: 'templates/Contact.html'

        })
        .when('/pripo', {
            templateUrl: 'templates/PrivacyPolicy.html'

        })


        .when('/product', {
            templateUrl: 'templates/OurProduct.html',
            controller: 'productController'

        })
        .when('/detail/:id', {
            templateUrl: 'templates/detail.html',
            controller: 'detailController'
        })
        
		}]);

app.directive('headerDirective', [function () {
        return {
            templateUrl: 'templates/header.html'
        }
	}
]);
app.directive('footerDirective', [function () {
        return {
            templateUrl: 'templates/footer.html'
        }
	}
]);

app.controller('productController', ['$scope', '$firebaseArray', '$routeParams', function ($scope, $firebaseArray, $routeParams) {
    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");
    $scope.items = $firebaseArray(ref);
	    }]);

app.controller('homeController', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {
    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");

	    }]);
app.controller('detailController', ['$scope', '$firebaseArray', '$routeParams', function ($scope, $firebaseArray, $routeParams) {
    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");
    var id = $routeParams.id;
    $scope.items = $firebaseArray(ref.orderByChild('id').equalTo(id));
	    }]);

app.controller('mainController',['$scope', '$firebaseArray', function ($scope, $firebaseArray){
    $scope.cart=[];
    $scope.numitem=0;
    $scope.addItem = function(id){
    
    if($scope.cart.indexOf(id)<0){
        $scope.cart.push(id);
        $scope.numitem += 1;
    };
    };
    $scope.remove = function(id){
        $scope.cart.splice($scope.cart.indexOf(id),1);
        $scope.numitem -= 1;
        
    }
}]);



