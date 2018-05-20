//HEAD 
(function(app) {
try { app = angular.module("widgetApp"); }
catch(err) { app = angular.module("widgetApp", []); }
app.run(["$templateCache", function($templateCache) {
"use strict";

$templateCache.put("dynaForm.html","\n" +
    " <form name='form' novalidate ng-class=\"formConfigData.formClass ?  formConfigData.formClass : ''\">\n" +
    "\n" +
    "            <ng-form name=\"dynaForm1\">\n" +
    "                <span ng-repeat=\"view in formConfigData.groupViewList\">\n" +
    "\n" +
    "            <span ng-repeat=\"field in view.fieldList | orderBy:'order'\" ng-init=\"fieldname = field.fieldModel\">\n" +
    "              <field-item content=\"field\" save-model=\"formModelData\">\n" +
    "              </field-item>\n" +
    "             </span>\n" +
    "\n" +
    "\n" +
    "    <h3> Test Area</h3>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <textarea style=\"width:100%;height:200px\" cols=\"400\" obj-edit ng-model=\"view.fieldList\"> </textarea>\n" +
    "                </span>\n" +
    "            </ng-form>\n" +
    "        </div>\n" +
    "     <style>\n" +
    "/*input[type='date']:before {\n" +
    "    position: absolute;\n" +
    "    padding: 5px 0;\n" +
    "    content: attr(data-date);\n" +
    "    display: inline-block;\n" +
    "}\n" +
    "\n" +
    "\n" +
    "input[type='date']::-webkit-clear-button, input::-webkit-datetime-edit,\n" +
    "input::-webkit-inner-spin-button {\n" +
    "    visibility: hidden;\n" +
    "}\n" +
    "*/\n" +
    "</style>\n" +
    "\n" +
    "  </form>\n" +
    "\n" +
    "")
}]);
})();