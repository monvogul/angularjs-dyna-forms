var app = angular.module('widgetApp',['angularMoment']);

app.controller('widgetCtrl', ['$scope','moment', function ($scope,moment) {

}]);

app.directive('dynaForm', ['$http', '$q', function ($http, $q) {
    var linker = function (scope, elem, attr) {
        $http.get(scope.formConfigJson).then(function (data) {
            scope.formConfigData = data.data;

        });
        scope.callAction=function(model, fieldContent){
            scope.$parent[fieldContent.onchange](model,fieldContent);
        }
    };
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        controller: 'widgetCtrl',
        templateUrl: "dynaForm.html",
        link: linker,
        scope: {
            formConfigData: '=', //config model (json)
            formModelData: '=', //data model (saveModel)
            formConfigJson: '@', //config url
            formModelJson: '@' //url to get model and assign return data to formModelData

        }
    };

}]);

app.directive('fieldItem', ['$compile', function ($compile) {
    var linker = function (scope, element, attr, ctrl) {

        scope.addValidations = function () {
            var ngValidations = scope.content.validations;
            if (angular.isUndefined(ngValidations))
                return ;

            angular.forEach(ngValidations, function (valObj) {
                var validation = Object.keys(valObj);
                var value = valObj[validation];
                elementTmp.setAttribute(validation, value);
            });

        }

        var htmlTemplate = scope.content.type === 'customTemplate' ? scope.content.template : getTemplate(scope.content.type, scope.content.labelandFieldWrapper);
        element.html(htmlTemplate);

        //add validations here
        var elementTmp;
        var elementTypes = ['input', 'select', 'textarea'];
                 for (var i = 0; (angular.isUndefined(elementTmp) || elementTmp === null) && i < elementTypes.length; i++) {
                        elementTmp = element[0].querySelector(elementTypes[i]);
                        if (elementTmp) {
                            //Set name attribute
                            elementTmp.setAttribute("name",scope.content.fieldModel);
                            if(scope.content.type === 'date' && !scope.content.showDatePicker){
                                elementTmp.setAttribute("type","text") ;
                            }
                            //set validations
                            scope.addValidations() ;
                        }
                    }

        $compile(element.contents())(scope);
        scope.callAction= function() {
            scope.$parent.callAction(scope.saveModel,scope.content);
        }

    };
    return {
        restrict: 'E',
        link: linker,
        replace: true,
        scope: {
            content: '=', //config model (json)
            saveModel: '=' //data model (saveModel)
        }
    }

}]);


app.directive('formatDtm', ['moment', function(moment) {
    return {
        restrict: 'A',
        require: "ngModel",
        scope:{
            ngModel : "="
        } ,
        link: function (scope, element, attrs, ctrl) {
            var inputFormat = attrs.inputFormat ? attrs.inputFormat : 'DD/MM/YYYY';
            var saveFormat = attrs.saveFormat ;
            var dispFormat = attrs.displayFormat ? attrs.displayFormat  : 'DD/MM/YYYY';


            ctrl.$formatters.push(function formatter(value) {
                 if(!value) {
                    element[0].setAttribute('data-date',attrs.placeholder ? attrs.placeholder : '') ;
                    return null;
                }
                try {
                    var dispDate = moment(value, inputFormat).format(dispFormat);
                    element[0].setAttribute('data-date', dispDate);
                    ctrl.$setValidity('date', true);


                    return (attrs.type === 'text') ? dispDate : new Date(value) ;
                }catch (err){
                    ctrl.$setValidity('date', false);
                    return undefined;
                }
            });
            ctrl.$parsers.push(function (value) {
                try {
                    var dispDate = moment(value).format(dispFormat);
                    element[0].setAttribute('data-date', dispDate);

                    var saveFormatDtm = moment(value).format(saveFormat);
                    ctrl.$setValidity('date', true);
                    return saveFormatDtm;
                }catch (err){
                        ctrl.$setValidity('date', false);
                        return undefined;
                }

            });
      }
    }
}]);

app.directive('objEdit', function () {
    return {
        restrict: 'A',
        require: "ngModel",
        link: function (scope, element, attrs, ctrl) {
            ctrl.$formatters.push(function formatter(value) {
                return JSON.stringify(value, undefined, 2);
            });
            ctrl.$parsers.push(function (value) {
                try {
                    var result = JSON.parse(value);
                    ctrl.$setValidity('json', true);
                    return result;
                } catch (e) {
                    ctrl.$setValidity('json', false);
                    return undefined;
                }
            });

        }
    }
});