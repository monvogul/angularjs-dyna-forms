//HEAD 
(function(app) {
try { app = angular.module("widgetApp"); }
catch(err) { app = angular.module("widgetApp", []); }
app.run(["$templateCache", function($templateCache) {
"use strict";

$templateCache.put("dynaForm.html","\n" +
    " <form name='form' ng-model-options=\"{ updateOn: 'default blur'}\" novalidate ng-class=\"formConfigData.formClass ?  formConfigData.formClass : ''\">\n" +
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
    "\n" +
    "\n" +
    "                      .form-style-5{\n" +
    "                          max-width: 500px;\n" +
    "                          padding: 10px 20px;\n" +
    "                          background: #f4f7f8;\n" +
    "                          margin: 10px auto;\n" +
    "                          padding: 20px;\n" +
    "                          background: #f4f7f8;\n" +
    "                          border-radius: 8px;\n" +
    "                          font-family: Georgia, \"Times New Roman\", Times, serif;\n" +
    "                      }\n" +
    ".form-style-5 fieldset{\n" +
    "    border: none;\n" +
    "}\n" +
    ".form-style-5 legend {\n" +
    "    font-size: 1.4em;\n" +
    "    margin-bottom: 10px;\n" +
    "}\n" +
    ".form-style-5 label {\n" +
    "    display: block;\n" +
    "    margin-bottom: 8px;\n" +
    "}\n" +
    ".form-style-5 input[type=\"text\"],\n" +
    ".form-style-5 input[type=\"date\"],\n" +
    ".form-style-5 input[type=\"datetime\"],\n" +
    ".form-style-5 input[type=\"email\"],\n" +
    ".form-style-5 input[type=\"number\"],\n" +
    ".form-style-5 input[type=\"search\"],\n" +
    ".form-style-5 input[type=\"time\"],\n" +
    ".form-style-5 input[type=\"url\"],\n" +
    ".form-style-5 textarea,\n" +
    ".form-style-5 select {\n" +
    "    font-family: Georgia, \"Times New Roman\", Times, serif;\n" +
    "    background: rgba(255,255,255,.1);\n" +
    "    border: none;\n" +
    "    border-radius: 4px;\n" +
    "    font-size: 16px;\n" +
    "    margin: 0;\n" +
    "    outline: 0;\n" +
    "    padding: 7px;\n" +
    "    width: 100%;\n" +
    "    box-sizing: border-box;\n" +
    "    -webkit-box-sizing: border-box;\n" +
    "    -moz-box-sizing: border-box;\n" +
    "    background-color: #e8eeef;\n" +
    "    color:#8a97a0;\n" +
    "    -webkit-box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;\n" +
    "    box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;\n" +
    "    margin-bottom: 30px;\n" +
    "\n" +
    "}\n" +
    ".form-style-5 input[type=\"text\"]:focus,\n" +
    ".form-style-5 input[type=\"date\"]:focus,\n" +
    ".form-style-5 input[type=\"datetime\"]:focus,\n" +
    ".form-style-5 input[type=\"email\"]:focus,\n" +
    ".form-style-5 input[type=\"number\"]:focus,\n" +
    ".form-style-5 input[type=\"search\"]:focus,\n" +
    ".form-style-5 input[type=\"time\"]:focus,\n" +
    ".form-style-5 input[type=\"url\"]:focus,\n" +
    ".form-style-5 textarea:focus,\n" +
    ".form-style-5 select:focus{\n" +
    "    background: #d2d9dd;\n" +
    "}\n" +
    ".form-style-5 select{\n" +
    "    -webkit-appearance: menulist-button;\n" +
    "    height:35px;\n" +
    "}\n" +
    ".form-style-5 .number {\n" +
    "    background: #1abc9c;\n" +
    "    color: #fff;\n" +
    "    height: 30px;\n" +
    "    width: 30px;\n" +
    "    display: inline-block;\n" +
    "    font-size: 0.8em;\n" +
    "    margin-right: 4px;\n" +
    "    line-height: 30px;\n" +
    "    text-align: center;\n" +
    "    text-shadow: 0 1px 0 rgba(255,255,255,0.2);\n" +
    "    border-radius: 15px 15px 15px 0px;\n" +
    "}\n" +
    "\n" +
    ".form-style-5 input[type=\"submit\"],\n" +
    ".form-style-5 input[type=\"button\"]\n" +
    "{\n" +
    "    position: relative;\n" +
    "    display: block;\n" +
    "    padding: 19px 39px 18px 39px;\n" +
    "    color: #FFF;\n" +
    "    margin: 0 auto;\n" +
    "    background: #1abc9c;\n" +
    "    font-size: 18px;\n" +
    "    text-align: center;\n" +
    "    font-style: normal;\n" +
    "    width: 100%;\n" +
    "    border: 1px solid #16a085;\n" +
    "    border-width: 1px 1px 3px;\n" +
    "    margin-bottom: 10px;\n" +
    "}\n" +
    ".form-style-5 input[type=\"submit\"]:hover,\n" +
    ".form-style-5 input[type=\"button\"]:hover\n" +
    "{\n" +
    "    background: #109177;\n" +
    "}\n" +
    "\n" +
    "</style>\n" +
    "\n" +
    "  </form>\n" +
    "\n" +
    "")
}]);
})();