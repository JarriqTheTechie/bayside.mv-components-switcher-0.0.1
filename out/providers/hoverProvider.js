'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
const vscode_1 = require("vscode");
const util = require("../util");

class HoverProvider {
    provideHover(document, position) {
        var _a;
        let ranges = document.getWordRangeAtPosition(position, util.regexJumpFile);
        if (!ranges)
            return;
        const wsPath = (_a = vscode_1.workspace.getWorkspaceFolder(document.uri)) === null || _a === void 0 ? void 0 : _a.uri.fsPath;
        if (!wsPath)
            return;
        const text = document.getText(ranges);
        const matches = text.matchAll(util.regexJumpFile);
        vscode_1.window.showInformationMessage(matches);
        const component_struct = [...text.matchAll(util.regexJumpFile)][0][2]
        if (component_struct.includes(".")) {
            const component_path = component_struct.split(".")[0]
            const component_name = component_struct.split(".")[1]
            const jumpPath = wsPath + "\\templates\\components\\" + `${component_path}\\${component_name}`
            const md = '\`class:\`' + `[${component_name}](./${jumpPath}.html) \n`;
            return new vscode_1.Hover(new vscode_1.MarkdownString(md));
        }
            const component_name = component_struct
            const jumpPath = wsPath + "\\templates\\components\\" + `${component_name}`
            const md = '\`class:\`' + `[${component_name}](./${jumpPath}.html) \n`;
            return new vscode_1.Hover(new vscode_1.MarkdownString(md));
    }
}

exports.default = HoverProvider;
//# sourceMappingURL=hoverProvider.js.map