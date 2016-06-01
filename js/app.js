var app = angular.module('store', ['firebase', 'ngRoute', 'angularUtils.directives.dirPagination', 'ngAnimate', 'ui.bootstrap']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/Home.html'
            , controller: 'homeController'
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
        .when('/checkout', {
            templateUrl: 'templates/checkout.html'
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
            templateUrl: 'templates/OurProduct.html'
            , controller: 'productController'
        })
        .when('/search', {
            templateUrl: 'templates/Search.html'
            , controller: 'searchController'
        })
        .when('/product/:typeS', {
            templateUrl: 'templates/OurProduct.html'
            , controller: 'typeController'
        })
        .when('/detail/:id', {
            templateUrl: 'templates/detail.html'
            , controller: 'detailController'
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

app.controller('productController', ['$scope', '$firebaseArray', function ($scope, $firebaseArray, $routeParams) {
    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");
    $scope.items = $firebaseArray(ref);
    $scope.currentPage = 1;
    $scope.pageSize = 12;


	    }]);

app.controller('typeController', ['$scope', '$firebaseArray', '$routeParams', function ($scope, $firebaseArray, $routeParams) {
    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");
    $scope.items = $firebaseArray(ref.orderByChild('typeS').equalTo($routeParams.typeS));
    $scope.type = $routeParams.typeS;
    $scope.currentPage = 1;
    $scope.pageSize = 12;
	    }]);

app.controller('homeController', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {
    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");
	    }]);

app.controller('detailController', ['$scope', '$firebaseArray', '$routeParams', function ($scope, $firebaseArray, $routeParams) {
    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");
    window.scrollTo(0, 0);
    var id = $routeParams.id;
    $scope.items = $firebaseArray(ref.orderByChild('id').equalTo(id));
    var listitem = {};
    var listitem2 = [];
    ref.on('value', function (snapshot) {
        listitem = snapshot.val();
        var arr = $.map(listitem, function (el) {
            return el;
        })
        var t = 4;
        for (var i = 0; i < t; i++) {
            var it = arr[Math.floor(Math.random() * arr.length)];
            if (it.id == id) {
                if (i != 0) {
                    i--;
                } else {
                    t++;
                }
                arr.splice(i, 1);
            } else {
                listitem2.push(it);
                arr.splice(arr.indexOf(it), 1);
            }
        }
        $scope.relateitem = listitem2;

    })


	    }]);

app.controller('mainController', ['$window', '$scope', '$firebaseArray', function ($window, $scope, $firebaseArray) {
    var _selected;
    $scope.selected = undefined;
    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");
    $scope.statesWithFlags = $firebaseArray(ref);
    $scope.enter = function (id) {
        $window.location.href = '#detail/' + id.id;
    }


    $scope.refer = function () {
        $('.navbar-collapse').toggleClass('in');
    }
    $scope.scrolltop = function () {
        window.scrollTo(0, 0);
    }
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

    $scope.showConfirm = function () {
        $window.location.href = '#/';
        $scope.cart = [];
        $scope.numitem = 0;

        //                   setTimeout(function () {
        //                    $window.location.reload();
        //                }, 100);

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