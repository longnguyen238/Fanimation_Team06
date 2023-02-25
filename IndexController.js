var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider) {
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
      templateUrl: "product.html",
    })
    .when("/ped", {
      templateUrl: "Product/pedestalfan.html",
    });
});

app.controller("myCtrl", function ($scope, $http) {
  function getData() {
    $http.get("JSON/Pedestalfans.json").then(function (rspt) {
      if (sessionStorage.getItem("seeFans") == null) {
        sessionStorage.setItem("seeFans", JSON.stringify(rspt.data));
        $scope.fanList = JSON.parse(sessionStorage.getItem("seeFans"));
      } else {
        $scope.fanList = JSON.parse(sessionStorage.getItem);
      }
    });
  }
  getData();
});

$(document).ready(function () {
  $("img").click(function () {
    var img = $(this).attr('src');
    $("#show-img").attr('src', img);
    $("#imgmodal").modal('show');
  });
});