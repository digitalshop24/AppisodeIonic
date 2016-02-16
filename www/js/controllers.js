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
    $scope.star = [];
     $scope.toggle = [];
    $scope.visible.search = false;
    $scope.visible.new = false;
    $scope.visible.pop = true;
    $scope.visible.sub = false;
    $scope.visible.subscription_ = false;
    $scope.visible.subscription_form1 = false;
    $scope.visible.subscription_form2 = false;
    $scope.star.pop = 'icon-left ion-star activ';
    $scope.star.sub = '';
    $scope.star.new = '';
    $scope.toggle_full = []; 
    
  $scope.visiEffect = function(click_obj) {
      $scope.visible.pop = false;
      $scope.visible.sub = false;
      $scope.visible.new = false;
      $scope.visible.search = false;
      $scope.star.pop = '';
      $scope.star.sub = '';
      $scope.star.new = '';
      // страница подписок

    switch(click_obj) {
      case 'pop':  
        $scope.visible.pop = true;
        $scope.star.pop = 'icon-left ion-star activ';
        break;
      case 'sub': 
        $scope.visible.sub = true;
        $scope.star.sub = 'icon-left ion-star activ';
        break;
      case 'new':  
        $scope.visible.new = true;
        $scope.star.new = 'icon-left ion-star activ';
        break;
      default:
        $scope.visible.sub = true;
        $scope.star.sub = 'icon-left ion-star activ';
        break;
    }
  }

  $scope.initData = function() {
  //получение первых 10 сериалов
    $scope.visible.pop = true;  
    var url ='http://appisode.ru/api/v1/shows/popular';
    $http.get(url).success(function(data, status, headers, config){
      $rootScope.serials = data; 
      console.log('$rootScope.serials',$rootScope.serials);
      var page = 1;
      var per_page = 10;
      //подгрузка остальных сериалов
      // while (page != 5) {
      //   page++;
      //   var url ='http://appisode.ru/api/v1/shows?page='+page+'&per_page='+per_page;
      //   $http.get(url).success(function(data, status, headers, config){
      //     var serials = data; 
      //     for (var i = 0; i < 10; i++) {
      //       $rootScope.serials.push(serials[i]);
      //     }
      //   }); 
      // }
    });
  }

  $rootScope.check_auth = function() {
    // localStorage['key_auth'] = undefined;
    // localStorage['phone'] = undefined;
    var key = localStorage['key_auth'];
    var phone = localStorage['phone'];
    var url = 'http://appisode.ru/api/v1/users/check_auth?phone='+phone+'&key='+key;
    $http.get(url).success(function(data, status, headers, config){
      $scope.subscription = data;
    });
  }

  $rootScope.subs = function() {
    $scope.key = localStorage['key_auth'];
    $scope.phone = localStorage['phone'];
    if (($scope.key == undefined)||($scope.key == 'undefined')||($scope.phone == undefined)||($scope.phone == 'undefined')) {$rootScope.showPopup_auth();}
    else {
    if (($scope.key.length != 0)&&($scope.phone.length != 0)) { $rootScope.show_sub();}
    else { $rootScope.showPopup_auth(); }
    }
  }
  // $rootScope.register_form1 = function() {
  //   // $scope.visible.sub = true;
  //   // $scope.visible.subscription_ = false;
  //   // $scope.visible.subscription_form1 = true;
  //   // $scope.visible.subscription_form2 = false;
  //   $scope.showPopup_auth();
  // }
  // $rootScope.register_form2 = function(phone) {
  //   localStorage['phone'] = phone;
  //   $scope.visible.subscription_ = false;
  //   $scope.visible.subscription_form1 = false;
  //   $scope.visible.subscription_form2 = true;
  //   var auth = [];
  //   auth.phone = phone;
  //   var url = 'http://appisode.ru/api/v1/users/register?phone='+auth.phone;
  //   $http.get(url).success(function(data, status, headers, config){
  //     console.log('data', data);
  //     console.log('status', status);
  //     console.log('headers', headers);
  //     console.log('config', config);
  //     // $scope.auth_prov = data; //код для авторизации
  //     // console.log('$scope.auth_prov', $scope.auth_prov);
  //     // localStorage['auth_prov'] = data;
  //   }).  
  //   error(function(data, status, headers, config) {
  //     console.log('error');
  //     console.log('data', data);
  //     console.log('status', status);
  //     console.log('headers', headers);
  //     console.log('config', config);
  //   });
  //   $scope.showPopup_auth_success();
  // }

  // $rootScope.register = function(auth_user) {
  //     var auth_phone = localStorage['phone'];
  //     var url = 'http://appisode.ru/api/v1/users/check_confirmation?phone='+auth_phone+'&confirmation='+auth_user;
  //     $http.get(url).success(function(data, status, headers, config){
  //       if (data.key != undefined){
  //         localStorage['key_auth'] = data.key;
  //         localStorage['auth'] = true;
  //         $rootScope.show_sub();
  //       }
  //       else $rootScope.subs();
  //     });
    
  //   // else $scope.register_form1();
  // }

  $rootScope.show_sub = function() {
    $scope.visible.subscription_ = true;
    var key = localStorage['key_auth'];
    var phone = localStorage['phone'];
    console.log('///////');
    var url = 'http://appisode.ru/api/v1/subscriptions?phone='+phone+'&key='+key;
    console.log(url);
    $http.get(url).success(function(data, status, headers, config){
          $scope.subscription = data;
          console.log('subscription', $scope.subscription);
    });
  }
// подписаться
  $rootScope.subscription_new_episodes = function(id, id_ser, subtype) {
    
    if ($scope.toggle_full.id == true) subtype = 'season';
    console.log('id', id);
    console.log('id_ser', id_ser);
    console.log('subtype', subtype);
    var key = localStorage['key_auth'];
    var phone = localStorage['phone'];
    if ((id_ser == 'non')||(id_ser == undefined)||(subtype == 'season')) {
      var url = 'http://appisode.ru/api/v1/subscriptions/subscribe?phone='+phone+'&key='+key+'&show_id='+id+'&subtype='+subtype;
    }
    else var url = 'http://appisode.ru/api/v1/subscriptions/subscribe?phone='+phone+'&key='+key+'&show_id='+id+'&episode_id='+id_ser+'&subtype='+subtype;
   
    if ((key == undefined)||(key == 'undefined')||(phone == undefined)||(phone == 'undefined')) { $rootScope.showPopup_auth(id,id_ser,subtype);  }
    else 
    if ((key.length != 0)&&(phone.length != 0))
    {   console.log('url', url);
        $http.get(url).success(function(data, status, headers, config){
         console.log('success');
      console.log('data', data);
      console.log('status', status);
      console.log('headers', headers);
      console.log('config', config);
        }).error(function(data, status, headers, config){
        console.log('error');
      console.log('data', data);
      console.log('status', status);
      console.log('headers', headers);
      console.log('config', config);
        });
        
    } 
    else { $rootScope.subs(); }
  }
//отписатся
  $rootScope.un_subscription_new_episodes = function(id) {
    var key = localStorage['key_auth'];
    var phone = localStorage['phone'];
    var url = 'http://appisode.ru/api/v1/subscriptions/unsubscribe?phone='+phone+'&key='+key+'&subscription_id='+id;
    $http.get(url).success(function(data, status, headers, config){
        console.log('subscription', data);
        $rootScope.show_sub();
    });
  }


//// тугл
$rootScope.toggle_full_mana = function(index, toggle_one) {
  $scope.toggle_full.index = toggle_one;
}

$rootScope.showPopup_auth = function(id, id_ser, subtype) {
  $rootScope.data = {};
  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.tel">',
    title: 'Аторизация',
    subTitle: 'Введите телефон для авторизации',
    scope: $rootScope,
    buttons: [
      { text: 'Отмена' },
      {
        text: '<b>Отправить</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$rootScope.data.tel) {
            e.preventDefault();
          } else {
            localStorage['phone'] = $rootScope.data.tel;
            if (id_ser == 'non') {
                var url = 'http://appisode.ru/api/v1/subscriptions/subscribe?phone='+phone+'&key='+key+'&show_id='+id+'&subtype='+subtype;
            }
            else var url = 'http://appisode.ru/api/v1/subscriptions/subscribe?phone='+phone+'&key='+key+'&show_id='+id+'&episode_id'+id_ser+'&subtype='+subtype;
            console.log(url);
            $http.get(url).success(function(data, status, headers, config){
            })
            $scope.showPopup_auth_success();
          }
        }
      }
    ]
  });
 };
$rootScope.showPopup_auth_success = function() {
  $rootScope.data = {};
  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.cod">',
    title: 'Аторизация',
    subTitle: 'Введите код полученый в СМС',
    scope: $rootScope,
    buttons: [
      { text: 'Отмена' },
      {
        text: '<b>Подтвердить</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$rootScope.data.cod) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
              var auth_phone = localStorage['phone'];
              var url = 'http://appisode.ru/api/v1/users/check_confirmation?phone='+auth_phone+'&confirmation='+$rootScope.data.cod;
              $http.get(url).success(function(data, status, headers, config){
                if (data.key != undefined){
                  localStorage['key_auth'] = data.key;
                  localStorage['auth'] = true;
                  $rootScope.show_sub();
                }
                else $rootScope.subs();
              });
            }
        }
      }
     
    ]
  });
}; 

//end
})

.controller('SearchCtrl', function($scope, $stateParams, $location, $http, $ionicPopup, $timeout, $rootScope) {
  
  $scope.searchData = function(search) {
    var url ='http://appisode.ru/api/v1/shows/search?page=1&per_page=10&query='+search;
    $http.get(url).success(function(data, status, headers, config){
      $scope.search = data;
      console.log('search', $scope.search);
    });
  }
 
})

.controller('SerialCtrl', function($scope, $stateParams, $location, $http, $ionicPopup, $timeout, $rootScope) {
  var id = $stateParams.id;
  var url ='http://appisode.ru/api/v1/shows/'+id;
  $http.get(url).success(function(data, status, headers, config){
      $scope.serial = data;
      $scope.img_bg = $scope.serial.poster
      console.log('$scope.serial', $scope.serial);
      $scope.red_round($scope.serial.episodes, $scope.serial.episodes.length);
  }); 
  $scope.red_round = function(episodes,col) {

    $scope.red_round_xz =[];
    for(var i = 0; i < col; i++) {
      $scope.red_round_xz[i] = '';
    }
    for(var i = 0; i < col; i++) {
      if (episodes[i].aired == false) {
        $scope.activ_red_round(i,episodes);
        break;
      }
    }
  }
  $scope.activ_red_round = function(index, episodes) {
    if (episodes[index].aired == false) {
      for(var i = 0; i <$scope.red_round_xz.length; i++) {
        $scope.red_round_xz[i] = '';
      }
      $scope.red_round_xz[index] = 'red_round';
      $scope.red_round_xz_index = episodes[index].id;
    }
  }
  $scope.aired_seria = function(aried) {
    if (aried) return 'no_activ_btn';
    else return 'activ_btn'
  }
});
