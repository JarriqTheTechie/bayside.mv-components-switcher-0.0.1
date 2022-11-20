"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require("vscode");
var hoverProvider_1 = require("./providers/hoverProvider");
var documentLinkProvider_1 = require("./providers/documentLinkProvider");
var TagMVCColonProvider_1 = require("./providers/colonTagProvider");
function activate(context) {
    var _this = this;
    var disposable = vscode.commands.registerCommand('mv-components-support.switch', function () { return __awaiter(_this, void 0, void 0, function () {
        var relative_path, component_path, file, file, document_1;
        var _a, _b;
        return __generator(this, function (_c) {
            if (vscode.workspace.workspaceFolders && vscode.window.activeTextEditor) {
                if (vscode.workspace.asRelativePath((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.fileName).startsWith('templates/components/')) {
                    relative_path = vscode.workspace.asRelativePath((_b = vscode.window.activeTextEditor) === null || _b === void 0 ? void 0 : _b.document.fileName);
                    component_path = relative_path.replace("templates/components/", "");
                    if (component_path.endsWith(".py"))
                        file = component_path.replace(".py", ".html");
                    if (component_path.endsWith(".html"))
                        file = component_path.replace(".html", ".py");
                    document_1 = vscode.workspace.openTextDocument(vscode.workspace.workspaceFolders[0].uri.path + '/templates/components/' + file);
                    vscode.window.showTextDocument(document_1);
                }
            }
            return [2 /*return*/];
        });
    }); });
    var docSelector = ['py', 'html'];
    var linkProvider = vscode.languages.registerDocumentLinkProvider(docSelector, new documentLinkProvider_1["default"]());
    var hoverProvider = vscode.languages.registerHoverProvider(docSelector, new hoverProvider_1["default"]());
    var tagProvider = vscode.languages.registerCompletionItemProvider(docSelector, new TagMVCColonProvider_1["default"](), ':', '.');
    context.subscriptions.push(disposable, linkProvider, hoverProvider, tagProvider);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
