/**
 * Created by john.nana on 10/17/2016.
 */
angular.module('square',['ui.router','ngAnimate','cgBusy'])
    .value('ServiceEndpoint', 'http://localhost:3000')
    .controller("mainCtrl", mainCtrl)
    .controller("regCtrl", regCtrl)
    .config(appConfig);


function appConfig ($stateProvider, $urlRouterProvider){
    //  $urlRouterProvider.otherwise("/home");
    $urlRouterProvider.otherwise(function($injector, $location){
        $injector.invoke(['$state', function($state) {
            $state.go('home');
        }]);
    });
    $stateProvider
        .state('home',{url: "/home",
            templateUrl: "/partial/partial-home.html",
            controller:"mainCtrl" })
        .state('register',{url: "/register",
            templateUrl: "/partial/partial-about.html",
            controller:"regCtrl"})

}


function mainCtrl($scope){
    var vm = $scope;
    vm.mydata= "Ogbeni";
}

function regCtrl($scope, $http, $state,ServiceEndpoint){
    var vm = $scope;
    $scope.delay = 0;
    $scope.minDuration = 0;
    $scope.message = 'Please Wait..';
    $scope.backdrop = false;
    $scope.req = null;
    $scope.adduser= {};

//date conversion
 /*   $scope.date = new Date();

    $scope.$watch('date', function (date)
    {
        $scope.dateString = dateFilter(date, 'yyyy-MM-dd');
    });

    $scope.$watch('dateString', function (dateString)
    {
        $scope.date = new Date(dateString);
    });
*/

    vm.register= function(form){

        console.log($scope.adduser);
        if (form.$valid){

            $http.post(ServiceEndpoint+"/signup",$scope.adduser)
                .then(function(){

                    toastr.success("Registration Successful");
                    /*script(src="https://code.jquery.com/jquery-1.12.4.js")
                    script(src="https://code.jquery.com/ui/1.12.1/jquery-ui.js")*/
                    $state.go("home");
                })
            .catch(function(err){
                    toastr.error("Registration failed");
                });
        }



    }
}