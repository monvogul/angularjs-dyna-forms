var app = angular.module('myExampleApp', ['widgetApp']);

app.controller('myCtrl', ['$scope', function ($scope) {
    $scope.myExampleModel = {
        name: "Mansi Bhatia",
        age: 34,
        dob: "22/10/1982",
        timeOfBirth: "08:55",
        married: true,
        comments: "More form design: \n https://www.sanwebe.com/2014/08/css-html-forms-designs \n https://codepen.io/KovJonas/pen/BoPOPY",
        completed: "N",
        state: {stateName: "VICTORIA", ABBR: "VIC"},
        someObject: {myMinDate: "1981-01-01"},
        myMaxDate: "2019-05-17",   ////////////////////////////////MUST BE ISO FORMAT
        countries: [
            {name: 'Afghanistan', code: 'AF'},
            {name: 'Åland Islands', code: 'AX'},
            {name: 'Albania', code: 'AL'},
            {name: 'Algeria', code: 'DZ'}]
    };

    $scope.showTestArea = false;

    $scope.myapp = function (a, b) {
        //console.log("you chnaged somehing " , a) ;
    }

}]);

