'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_1 = require("vscode");
var util = require("../util");
var fs = require('fs');
var colonTagProvider = /** @class */ (function () {
    function colonTagProvider() {
    }
    colonTagProvider.prototype.provideCompletionItems = function (document, position, token, context) {
        var unique = function (value, index, self) {
            return self.indexOf(value) === index;
        };
        function checkItem(arrayItem, searchItem) {
            return arrayItem.findIndex(function (element) { return element.includes(searchItem); }) >= 0;
        }
        function getItem(arrayItem, getItem) {
            return arrayItem.filter(function (element) { return element.includes(getItem); });
        }
        var files = [];
        var completions = [];
        var data = "";
        var getFiles = function (path, relative_path) {
            if (fs.lstatSync(path).isDirectory()) { // is this a folder?
                fs.readdirSync(path).forEach(function (f) {
                    getFiles(path + '/' + f); // process it recursively
                });
            }
            else if (path.endsWith(".py")) { // is this a file we are searching for?
                var doc = vscode_1.workspace.fs.readFile(vscode_1.Uri.file(path));
                var params_1 = "";
                var params_index_1 = 2;
                try {
                    var data_1 = fs.readFileSync(path, 'utf8');
                    var regex = /self.(.*?)([\'\"][\),]|([ \t\n]|>))/gm;
                    var m = void 0;
                    while ((m = regex.exec(data_1.toString())) !== null) {
                        // This is necessary to avoid infinite loops with zero-width matches
                        if (m.index === regex.lastIndex) {
                            regex.lastIndex++;
                        }
                        // The result can be accessed through the `m`-variable.
                        m.forEach(function (match, groupIndex) {
                            if (groupIndex === 1 && match !== "") {
                                params_1 += "".concat(match) + "='${" + "".concat(params_index_1) + "}' ";
                                params_index_1 += 1;
                                console.log("Found match, group ".concat(groupIndex, ": ").concat(match));
                            }
                        });
                    }
                    files.push(params_1);
                }
                catch (err) {
                    throw new Error("".concat(err));
                }
                var component_path = path.split("//")[1].replace("/", ".");
                var component_resolved = util.getFilenameAndExtension(component_path)[0];
                var completion = new vscode_1.CompletionItem("mv-".concat(component_resolved, "></mv-").concat(component_resolved, ">"));
                completion.insertText = new vscode_1.SnippetString("<mv-" + "".concat(component_resolved, " ").concat(data.toString()) + "".concat(params_1) + ">${1}" + "</mv-".concat(component_resolved, ">"));
                completions.push(completion);
            }
        };
        var linePrefix = document.lineAt(position).text.substr(0, position.character).trim();
        //vscode_1.window.showInformationMessage(linePrefix)
        var directoryPath = vscode_1.workspace.workspaceFolders[0].uri.fsPath + '/templates/components/';
        getFiles(directoryPath, directoryPath);
        return completions.filter(unique);
    };
    return colonTagProvider;
}());
exports["default"] = colonTagProvider;
