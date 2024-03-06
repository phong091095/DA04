var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "home.html?" + Math.random(),
            controller: "myCtrl"
        })
        .when("/about", {
            templateUrl: "about.html?" + Math.random()
        })
        .when("/detail/:id",{
            templateUrl: "productdt.html?" + Math.random(),
            controller: "myCtrl"
        })
        .when("/cart",{
            templateUrl: "Cart.html?" + Math.random(),
            controller: "myCtrl"
        })
        .when("/login",{
            templateUrl: "Login.html?" + Math.random()
        })
        .when("/register",{
            templateUrl: "Register.html?" + Math.random()
        })
        .when("/more",{
            templateUrl: "more.html?" + Math.random(),
            controller: "pro-ctrl"
        })
        .otherwise({
            redirectTo: "/home" 
        });
});
app.run(function($rootScope){
    $rootScope.$on('$routeChangeStart',function(){
        $rootScope.loading = true;
    });
    $rootScope.$on('$routeChangeSuccess',function(){
        $rootScope.loading = false;
    });
    $rootScope.$on('$routeChangeError',function(){
        $rootScope.loading = false;
        alert("Lỗi");
    });
})
app.controller("myctrl",function($scope,$http){
    $scope.data={};
    $http.get('km.json')
    .then(function(response){
        $scope.data = response.data.img;
    })
    .catch(function(error){
        alert("Không thể tải dữ liệu: "+error);
    });
})
app.controller("pro-ctrl",function($scope,$http,$filter){
    $scope.data=[];
    $scope.sort = '';
    $scope.length = 0;
    $http.get('products.json')
    .then(function(response){
        $scope.data = response.data;
        $scope.length = $scope.data.length;
    })
    .catch(function(error){
        alert("Không thể tải dữ liệu: "+error);
    })
    $scope.sortProducts = function () {
        switch ($scope.sort) {
            case 'tang':
                $scope.data = $filter('orderBy')($scope.data, 'price');
                break;
            case 'giam':
                $scope.data = $filter('orderBy')($scope.data, '-price');
                break;
            default:
                // Nếu không chọn cách sắp xếp nào, sử dụng giá trị mặc định
                $scope.data = $filter('orderBy')($scope.data, '');
                break;
        }
    };
    $scope.start = 0;
    $scope.trangtruoc = function(){
        if($scope.start<=0){

        }
        else{
            $scope.start -=4;
        }
    }
    $scope.trangsau = function(){
        if($scope.start >= $scope.length-4){
        }
        else{
            $scope.start +=4;
        }
        
    }

    
})
app.controller("myCtrl", function ($scope, $routeParams, $rootScope, $http,$timeout) {
    $scope.products = [];
    // Đọc dữ liệu từ file json
    $http.get("products.json").then(function (response) {
    $scope.products = response.data;
        // Lấy sản phẩm dựa trên id từ URL
        $scope.detailPro = $scope.products.find(item => item.id == $routeParams.id);
    });
    $rootScope.empty = false;
    $scope.showNotification = false;
    $scope.notificationMessage = "";
    if(typeof $rootScope.cart == 'undefined'){
        $rootScope.empty= true;
    }
    // Thêm sản phẩm vào giỏ hàng
    $scope.addCart = function (pro) {
        if (typeof $rootScope.cart == 'undefined') {
            $rootScope.cart = [];
        }
        var index = $rootScope.cart.findIndex((item) => item.id == pro.id);
        if (index >= 0) {
            $rootScope.cart[index].quantity++;
        } 
        else {
            var proIncart = {
                id: pro.id,
                title: pro.title,
                price: pro.price,
                quantity: 1,
                img: pro.img
            };
            $rootScope.cart.push(proIncart);
        }
        $rootScope.empty = false;
        $scope.notificationMessage = alert("Sản phẩm đã được thêm vào giỏ hàng");
        $scope.showNotification = true;
    };
    

    $scope.tongsl = function () {
        if (typeof $rootScope.cart !== 'undefined') {
            var tsl = 0;
            for (var i = 0; i < $rootScope.cart.length; i++) {
                tsl += $rootScope.cart[i].quantity;
            }
            return tsl;
        } else {
            // Nếu giỏ hàng không tồn tại hoặc rỗng, trả về 0
            return 0;
        }
    };

    // Hàm tính tổng tiền trong giỏ hàng
    $scope.tongtien = function () {
        if (typeof $rootScope.cart !== 'undefined') {
            var tt = 0;
            for (var i = 0; i < $rootScope.cart.length; i++) {
                tt += $rootScope.cart[i].quantity * $rootScope.cart[i].price;
            }
            return tt;
        } else {
            // Nếu giỏ hàng không tồn tại hoặc rỗng, trả về 0
            return 0;
        }
    };
    $rootScope.del = function(index){
        $rootScope.cart.splice(index,1);
        console.log($rootScope.cart.length);
        if($rootScope.cart.length === 0){
            $rootScope.empty= true;
        }
    }    
});


$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})  

var ab = angular.module("myapp1", []);
ab.controller1("myctrl1", function ($scope) {

});
