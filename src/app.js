var app =angular.module('myExampleApp',['widgetApp']);

app.controller('myCtrl', ['$scope', function($scope) {
   $scope.myExampleModel = {
       name: "Mansi Bhatia",
       age: 34,
       dob:"05/10/1982",
       married:true,
       completed:'N',
       state:{stateName:"VICTORIA",ABBR:"VIC"},
       countries:[
           {name: 'Afghanistan', code: 'AF'},
           {name: 'Åland Islands', code: 'AX'},
           {name: 'Albania', code: 'AL'},
           {name: 'Algeria', code: 'DZ'}]
   } ;


   $scope.myapp= function(a,b){
       console.log("you chnaged somehing " , a) ;
    }

}]);

