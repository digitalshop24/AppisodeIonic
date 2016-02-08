angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $stateParams, $location, $http, $ionicPopup, $timeout, $rootScope, $ionicModal) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

// my


})

.controller('PopCtrl', function($scope, $stateParams, $location, $http, $ionicPopup, $timeout, $rootScope) {
    //Начальные данные
    $scope.visible = [];
    $scope.visible.search = false;
    $scope.visible.new = false;
    $scope.visible.pop = true;
    $scope.visible.sub = false;
    console.log('$scope.visible',$scope.visible);
    // localStorage['foo'] = 'bar';
    // var foo = localStorage['foo'];
    // console.log(foo);

    //получение первых 10 сериалов
    
    // var url ='http://appisode.ru/api/v1/shows?page=1&per_page=10';
    // $http.get(url).success(function(data, status, headers, config){
    //   $rootScope.serials = data; 
    //   var page = 1;
    //   var per_page = 10;
    //   //подгрузка остальных сериалов
    //   while (page != 5) {
    //     page++;
    //     // var url ='http://appisode.ru/api/v1/shows?page='+page+'&per_page='+per_page;
    //     var url ='http://appisode.ru/api/v1/shows/search?page=1&per_page=1&query=Игра';
        
    //     $http.get(url).success(function(data, status, headers, config){
    //       var serials = data; 
    //       for (var i = 0; i < 10; i++) {
    //         $rootScope.serials.push(serials[i]);
    //       }
    //     }); 
    //   }
    // });

  $scope.visiEffect = function(click_obj) {
      $scope.visible.pop = false;
      $scope.visible.sub = false;
      $scope.visible.new = false;
      $scope.visible.search = false;
      // страница подписок
      $scope.visible.subscription_ = false;
      $scope.visible.subscription_form1 = false;
      $scope.visible.subscription_form2 = false;


    switch(click_obj) {
      case 'pop':  
        $scope.visible.pop = true;
        break;
      case 'sub': 
        $scope.visible.sub = true;
        break;
      case 'new':  
        $scope.visible.new = true;
        break;
      case 'search':  
        $scope.visible.search = true;
        $scope.visible.pop = true;
        break;
      default:
        $scope.visible.sub = true;
        break;
    }
   
  }
  // $scope.searchData = function(data) {
  //   localStorage.setItem("search", data);
  //   $scope.SearchSerial = '';
   
  // }
  //  $scope.loadData = function() {
  //   localStorage.setItem("search", 'none');
    
  // }

// var url ='http://appisode.ru/api/v1/shows/search?page=1&per_page=10&query='+search;
  $scope.initData = function() {
       //получение первых 10 сериалов
    $scope.visible.pop = true;  
    var url ='http://appisode.ru/api/v1/shows?page=1&per_page=10';
    $http.get(url).success(function(data, status, headers, config){
      $rootScope.serials = data; 
      var page = 1;
      var per_page = 10;
      //подгрузка остальных сериалов
      while (page != 5) {
        page++;
        var url ='http://appisode.ru/api/v1/shows?page='+page+'&per_page='+per_page;
        $http.get(url).success(function(data, status, headers, config){
          var serials = data; 
          for (var i = 0; i < 10; i++) {
            $rootScope.serials.push(serials[i]);
          }
        }); 
      }
    });
  }

  $scope.check_auth = function() {
    var auth = [];
    auth.tel = localStorage['tel'];
    auth.key_auth = localStorage['key_auth'];
    console.log('auth' , auth);
    
    var url = 'http://appisode.ru/api/v1/users/check_auth'
    $http.post(url,auth).success(function(data, status, headers, config){
      $scope.auth_prov = data;
      if ($scope.auth_prov == true) localStorage['auth'] = true;
      else localStorage['auth'] = false;
    });
  }

  $scope.subscription = function() {
    var auth = localStorage['auth'];
    if (auth == true) $scope.show_sub();
    else $scope.register_form1();
  }
  $scope.register_form1 = function() {
    $scope.visible.subscription_ = false;
    $scope.visible.subscription_form1 = true;
    $scope.visible.subscription_form2 = false;
  }
  $scope.register_form2 = function(phone) {
    console.log('phone', phone);
    localStorage['phone'] = phone;
    $scope.visible.subscription_ = false;
    $scope.visible.subscription_form1 = false;
    $scope.visible.subscription_form2 = true;
    var auth = [];
    auth.phone = phone;
    console.log('auth',auth);
    var url = 'http://appisode.ru/api/v1/users/register';
    $http.post(url,auth).success(function(data, status, headers, config){
      console.log('data', data);
      console.log('status', status);
      console.log('headers', headers);
      console.log('config', config);
      $scope.auth_prov = data; //код для авторизации
      console.log('$scope.auth_prov', scope.auth_prov);
      localStorage['auth_prov'] = data;
    }).  
    error(function(data, status, headers, config) {
      console.log('data', data);
      console.log('status', status);
      console.log('headers', headers);
      console.log('config', config);
    });
  }

  $scope.register = function(auth_user) {
    console.log('auth_user', auth_user);
    auth_prov = localStorage['auth_prov'];
    if (auth_user == auth_prov) {
      var url = 'http://appisode.ru/api/v1/users/check_confirmation';
      var auth = [];
      auth.phone = localStorage['phone'];
      auth.confirmation = auth_user;
      $http.post(url,auth).success(function(data, status, headers, config){
        $scope.show_sub();
        localStorage['auth'] = true;
      });
    }
    else $scope.register_form1();
  }

  $scope.show_sub = function() {
    $scope.visible.subscription_ = true;
    $scope.visible.subscription_form1 = false;
    $scope.visible.subscription_form2 = false;
    $http.get(url).success(function(data, status, headers, config){
      $scope.subscription = data;
      console.log('subscription', $scope.subscription);
    });
  }
})

.controller('SearchCtrl', function($scope, $stateParams) {
})

.controller('SerialCtrl', function($scope, $stateParams) {
});
