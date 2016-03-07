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
        .when('/search', {
            templateUrl: 'templates/Search.html',
            controller: 'searchController'
        })
        .when('/product/:typeS', {
        templateUrl: 'templates/OurProduct.html',
        controller: 'typeController'
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
    $scope.currentPage = 0;
    $scope.pageSize = 12;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.items.length / $scope.pageSize);
    };
    $scope.back = function () {
        $scope.currentPage = 0;
    }
	    }]);

app.controller('searchController', ['$scope', '$firebaseArray', '$routeParams', function ($scope, $firebaseArray, $routeParams) {
    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");
    $scope.items = $firebaseArray(ref);
    $scope.currentPage = 0;
    $scope.pageSize = 12;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.items.length / $scope.pageSize);
    }


	    }]);

app.controller('typeController', ['$scope', '$firebaseArray', '$routeParams', function ($scope, $firebaseArray, $routeParams) {
    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");
    $scope.items = $firebaseArray(ref.orderByChild('typeS').equalTo($routeParams.typeS));
    $scope.type = $routeParams.typeS;
    $scope.currentPage = 0;
    $scope.pageSize = 12;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.items.length / $scope.pageSize);
    }
	    }]);

app.controller('homeController', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {
    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");
	    }]);

app.controller('detailController', ['$scope', '$firebaseArray', '$routeParams', function ($scope, $firebaseArray, $routeParams) {
    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");
    var id = $routeParams.id;
    $scope.items = $firebaseArray(ref.orderByChild('id').equalTo(id));
	    }]);

app.controller('mainController', ['$window', '$scope', '$firebaseArray', function ($window, $scope, $firebaseArray) {
    $scope.cart = [];
    $scope.search = {};
    $scope.numitem = 0;
    $scope.addItem = function (id) {
        var f = true;
        if ($scope.cart.indexOf(id) < 0) {
            for (var i = 0; i < $scope.cart.length; i++) {
                if (id.id == $scope.cart[i].id) {
                    f = false;
                }
            }
            if (f) {
                $scope.cart.push(id);
                $scope.numitem += 1;
            }
        };
    };
    
    $scope.remove = function (id) {
        $scope.cart.splice($scope.cart.indexOf(id), 1);
        $scope.numitem -= 1;
    };
    
    $scope.searching = function (sea) {
        $scope.search.name = sea;
        $window.location.href = '#search';
    };

    $scope.totalprice = function (product) {
        var sum = 0;
        angular.forEach(product, function (t) {
        sum += (parseInt(t.price) * parseInt(t.quantity));
        });
        return sum;
    }

}]);

//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
app.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});