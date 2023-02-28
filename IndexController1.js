var a = angular.module("myApp", ["ngRoute"]);
a.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "Home.html",
    })
    .when("/faq", {
      templateUrl: "FAQ.html",
    })
    .when("/about", {
      templateUrl: "About.html",
    })
    .when("/reg", {
      templateUrl: "Register.html",
    })
    .when("/gallery", {
      templateUrl: "Gallery.html",
    })
    .when("/product", {
      templateUrl: "product1.html",
    })
    .when("/ped", {
      templateUrl: "Product/pedestalfan.html",
    })
    .when("/cart", {
      templateUrl: "cart.html",
    })
    .when("/login", {
      templateUrl: "login.html"
    })
});

a.run(function ($rootScope, $http) {
  $http.get("JSON/Fan.json").then(function (response) {
    $rootScope.menu = response.data.menu;
    console.log($rootScope.menu);
  });

  $rootScope.cart = [];
  $rootScope.total = 0;
});

a.controller("myCtrl", function ($scope, $rootScope) {
  $scope.addCart = function (id) {
    var item = $rootScope.menu[id];

    for (var i = 0; i < $rootScope.cart.length; ++i) {
      if ($rootScope.cart[i].id == id) {
        $rootScope.cart[i].qty++;
        $rootScope.total += $rootScope.cart[i].price;
        return;
      }
    }

    var newEle = {
      id: id,
      brand: item.brand,
      model: item.model,
      price: item.price,
      qty: 1,
    };
    $rootScope.total += item.price;
    $rootScope.cart.push(newEle);
    console.log($rootScope.cart);
  };

  $scope.choose = function () {
    let markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
    let cats = [];
    for (var checkbox of markedCheckbox) {
      cats.push(checkbox.value);
    }

    let data = $rootScope.menu;

    $scope.menu = cats.length == 0 ? data : data.filter((item) => cats.indexOf(item.type) >= 0);
  };

  $scope.show = function (id) {
    console.log("ma: " + id);

    let data = $rootScope.menu;
    let product = data.find((v) => v.id == id);

    $scope.brand = product.brand;
    $scope.price = product.price;
    $scope.color = product.color;
    $scope.winglength = product.winglength;
    $scope.wattage = product.wattage;

    $scope.img = product.img;

    console.log(product);
  };
});

a.controller("cartControl", function ($scope, $rootScope) {
  $scope.isShow = false;
  $scope.removeAll = function () {
    $rootScope.total = 0;
    $rootScope.cart = [];
  };

  $scope.checkout = function () {
    if ($rootScope.cart.length > 0) {
      $scope.isShow = true;
    } else {
      $scope.isShow = false;
    }
  };

  $scope.thank = function () {
    alert("Thanks for your order !");
    $scope.isShow = false;
    $rootScope.total = 0;
    $rootScope.cart = [];
  };
});
