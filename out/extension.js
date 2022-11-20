"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const hoverProvider_1 = require("./providers/hoverProvider");
const documentLinkProvider_1 = require("./providers/documentLinkProvider");
const TagMVCColonProvider_1 = require("./providers/colonTagProvider");

function activate(context) {
    let disposable = vscode.commands.registerCommand('mv-components-support.switch', async () => {
        if (vscode.workspace.workspaceFolders && vscode.window.activeTextEditor) {
            if (vscode.workspace.asRelativePath(vscode.window.activeTextEditor?.document.fileName).startsWith('templates/components/')) {
                const relative_path = vscode.workspace.asRelativePath(vscode.window.activeTextEditor?.document.fileName)
                const component_path = relative_path.replace("templates/components/", "")
                if (component_path.endsWith(".py"))
                    var file = component_path.replace(".py", ".html")
                if (component_path.endsWith(".html"))
                    var file = component_path.replace(".html", ".py")
                const document = vscode.workspace.openTextDocument(vscode.workspace.workspaceFolders[0].uri.path + '/templates/components/' + file);
                vscode.window.showTextDocument(document);
            }
        }
    });


    const docSelector = ['py', 'html'];
    const linkProvider = vscode.languages.registerDocumentLinkProvider(docSelector, new documentLinkProvider_1.default());
    const hoverProvider = vscode.languages.registerHoverProvider(docSelector, new hoverProvider_1.default());
    const tagProvider = vscode.languages.registerCompletionItemProvider(docSelector, new TagMVCColonProvider_1.default(), ':', '.');
    context.subscriptions.push(disposable, linkProvider, hoverProvider, tagProvider);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}

exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map