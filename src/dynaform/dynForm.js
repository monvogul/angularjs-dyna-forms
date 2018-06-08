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

                var validation = Object.keys(valObj).toString();
                var value = valObj[validation];

                var validationName = validation.indexOf("min") != -1 ? "min" : "max" ;

                if("min-var" === validation || "max-var" === validation) {
                    var evaluatedVal= eval("scope.saveModel" + "."  + value );
                    elementTmp.setAttribute(validationName,evaluatedVal);
                }else if(validation === "min-val" || validation === "max-val") {
                    elementTmp.setAttribute(validationName,value);
                }
                else{
                    elementTmp.setAttribute(validation, value);
                }
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
                            // //TODO: currently datepicker is not supported. Need to work on integrating with 3rd party tool.
                            // if(scope.content.type === 'date' && !scope.content.showDatePicker){
                            //     elementTmp.setAttribute("type","text") ;
                            // }
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
            var dateType = attrs.dateType  ;
            var minVal = attrs.min   ;
            var maxVal = attrs.max ;

            console.log(attrs) ;

            ctrl.$formatters.push(function formatter(value) {

                var displayDate = "" ;

                 if(!value) {
                    element[0].setAttribute('data-date',attrs.placeholder ? attrs.placeholder : '') ;
                    return null;
                }
                try {
                    //set date to the display format
                    displayDate = moment(value, inputFormat,true).format(dispFormat) ;
                    element[0].setAttribute('data-date', displayDate);

                    //Check date validity
                    var isValidMinMax = true ;
                    if(dateType === 'date') {
                        isValidMinMax =  _validateDateRange(value, inputFormat);
                    }else if(dateType == 'time'){
                        isValidMinMax = _validateTimeRange(value,inputFormat);
                    }
                    ctrl.$setValidity(dateType, true);

                    //Set date validity
                    if(!isValidMinMax) {
                        ctrl.$setValidity(dateType +'Range', isValidMinMax);
                        return undefined ;
                    }

                    return (attrs.type === 'text') ? displayDate : new Date(value) ;
                }catch (err){
                    ctrl.$setValidity(dateType, false);
                    return undefined ;
                }
            });
            ctrl.$parsers.push(function (value) {
                try {
                    var saveFormatDtm = moment(value, dispFormat,true).format(saveFormat);

                     if(!moment(value, dispFormat,true).isValid())
                         throw "Invalid "+ dateType + ": " +  value ;

                    //check date for min max
                    var isValidMinMax = true ;
                    if(dateType === 'date') {
                        isValidMinMax =  _validateDateRange(value, dispFormat);
                    }else if(dateType == 'time'){
                        isValidMinMax = _validateTimeRange(value,dispFormat);
                    }

                    ctrl.$setValidity(dateType, true);
                    if(!isValidMinMax) {
                        ctrl.$setValidity(dateType +'Range', isValidMinMax);
                        return undefined ;
                    }
                    return saveFormatDtm;
                }catch (err){
                        ctrl.$setValidity(dateType, false);
                        return undefined;
                }

            });

            var _validateDateRange = function(dtmValue, format){
                var isValidMinMax = true;
                if(minVal && maxVal)
                    isValidMinMax = moment(dtmValue, format,true).isBetween(minVal,maxVal) ;
                else if(minVal)
                    isValidMinMax = moment(dtmValue, format,true).isAfter(minVal) ;
                else if(maxVal)
                    isValidMinMax = moment(dtmValue, format).isBefore(maxVal) ;
                return isValidMinMax ;
            }
            var _validateTimeRange = function(dtmValue, format){ //TODO:document that it is assumed time min and max will be 24 hour format
                var minTime;
                var maxTime;
                var isValidMinMax = true;
                //Format min and max value as moment values
                if(minVal)
                     minTime = moment(minVal, "HH:mm:ss");
                if(maxVal)
                    maxTime = moment(maxVal, "HH:mm:ss");

                console.log(minTime, maxTime) ;
                if(minVal && maxVal)
                    isValidMinMax = moment(dtmValue, format,true).isBetween(minTime,maxTime) ;
                else if(minVal)
                    isValidMinMax = moment(dtmValue, format,true).isAfter(minTime) ;
                else if(maxVal)
                    isValidMinMax = moment(dtmValue, format).isBefore(maxTime) ;
                return isValidMinMax ;



            }
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