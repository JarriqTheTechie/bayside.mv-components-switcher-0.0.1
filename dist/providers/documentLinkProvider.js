'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_1 = require("vscode");
var util = require("../util");
var DocumentLinkProvider = /** @class */ (function () {
    function DocumentLinkProvider() {
    }
    DocumentLinkProvider.prototype.provideDocumentLinks = function (document) {
        var _a;
        var documentLinks = [];
        var text = document.getText();
        var wsPath = (_a = vscode_1.workspace.getWorkspaceFolder(document.uri)) === null || _a === void 0 ? void 0 : _a.uri.fsPath;
        //vscode_1.window.showInformationMessage(wsPath);
        if (!wsPath)
            return;
        for (var index = 0; index < document.lineCount; index++) {
            var line = document.lineAt(index);
            var matches = line.text.matchAll(util.regexJumpFile);
            for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
                var match = matches_1[_i];
                var matchedPath = match[0].toString().replace("<mv-", "")
                    .replace(",", "").replace("mv-,", "").replace("<", "").replace("\\", "").replace(">", "").trim();
                if (matchedPath.includes(".")) {
                    var component_path = matchedPath.split(".")[0];
                    var component_name = matchedPath.split(".")[1];
                    var jumpPath = wsPath + "\\templates\\components\\" + "".concat(component_path, "\\").concat(component_name, ".html");
                }
                else {
                    var component_name = matchedPath.split(".")[0];
                    var jumpPath = wsPath + "\\templates\\components\\" + "".concat(component_name, ".html");
                }
                var startColumn = new vscode_1.Position(line.lineNumber, line.text.indexOf(matchedPath));
                var endColumn = startColumn.translate(0, matchedPath.length);
                documentLinks.push(new vscode_1.DocumentLink(new vscode_1.Range(startColumn, endColumn), vscode_1.Uri.file(jumpPath)));
            }
        }
        return documentLinks;
    };
    return DocumentLinkProvider;
}());
exports["default"] = DocumentLinkProvider;
