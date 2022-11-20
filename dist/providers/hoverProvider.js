'use strict';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_1 = require("vscode");
var util = require("../util");
var HoverProvider = /** @class */ (function () {
    function HoverProvider() {
    }
    HoverProvider.prototype.provideHover = function (document, position) {
        var _a;
        var ranges = document.getWordRangeAtPosition(position, util.regexJumpFile);
        if (!ranges)
            return;
        var wsPath = (_a = vscode_1.workspace.getWorkspaceFolder(document.uri)) === null || _a === void 0 ? void 0 : _a.uri.fsPath;
        if (!wsPath)
            return;
        var text = document.getText(ranges);
        var matches = text.matchAll(util.regexJumpFile);
        vscode_1.window.showInformationMessage(matches);
        var component_struct = __spreadArray([], text.matchAll(util.regexJumpFile), true)[0][2];
        if (component_struct.includes(".")) {
            var component_path = component_struct.split(".")[0];
            var component_name_1 = component_struct.split(".")[1];
            var jumpPath_1 = wsPath + "\\templates\\components\\" + "".concat(component_path, "\\").concat(component_name_1);
            var md_1 = '\`class:\`' + "[".concat(component_name_1, "](./").concat(jumpPath_1, ".html) \n");
            return new vscode_1.Hover(new vscode_1.MarkdownString(md_1));
        }
        var component_name = component_struct;
        var jumpPath = wsPath + "\\templates\\components\\" + "".concat(component_name);
        var md = '\`class:\`' + "[".concat(component_name, "](./").concat(jumpPath, ".html) \n");
        return new vscode_1.Hover(new vscode_1.MarkdownString(md));
    };
    return HoverProvider;
}());
exports["default"] = HoverProvider;
