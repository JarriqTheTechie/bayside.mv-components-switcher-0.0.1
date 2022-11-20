'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
const vscode_1 = require("vscode");
const util = require("../util");

class DocumentLinkProvider {
    provideDocumentLinks(document) {
        var _a;
        let documentLinks = [];


        const text = document.getText();

        const wsPath = (_a = vscode_1.workspace.getWorkspaceFolder(document.uri)) === null || _a === void 0 ? void 0 : _a.uri.fsPath;
        //vscode_1.window.showInformationMessage(wsPath);
        if (!wsPath)
            return;


        for (let index = 0; index < document.lineCount; index++) {
            const line = document.lineAt(index);
            const matches = line.text.matchAll(util.regexJumpFile);
            for (const match of matches) {
                const matchedPath = match[0].toString().replace("<mv-", "")
                    .replace(",", "").replace("mv-,", "").replace("<", "").replace("\\", "").replace(">", "").trim();

                if (matchedPath.includes(".")) {
                    const component_path = matchedPath.split(".")[0]
                    const component_name = matchedPath.split(".")[1]
                    var jumpPath = wsPath + "\\templates\\components\\" + `${component_path}\\${component_name}.html`

                } else {
                    const component_name = matchedPath.split(".")[0]
                    var jumpPath = wsPath + "\\templates\\components\\" + `${component_name}.html`
                }


                const startColumn = new vscode_1.Position(line.lineNumber, line.text.indexOf(matchedPath));
                const endColumn = startColumn.translate(0, matchedPath.length);

                documentLinks.push(new vscode_1.DocumentLink(new vscode_1.Range(startColumn, endColumn), vscode_1.Uri.file(jumpPath)));
            }
        }
        return documentLinks;
    }
}

exports.default = DocumentLinkProvider;
//# sourceMappingURL=documentLinkProvider.js.map