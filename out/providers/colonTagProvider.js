'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
const vscode_1 = require("vscode");
const util = require("../util");
const fs = require('fs');


class colonTagProvider {


    provideCompletionItems(document, position, token, context) {

        const unique = (value, index, self) => {
            return self.indexOf(value) === index
        }

        function checkItem(arrayItem, searchItem) {
            return arrayItem.findIndex(element => element.includes(searchItem)) >= 0
        }

        function getItem(arrayItem, getItem) {
            return arrayItem.filter(element => element.includes(getItem))
        }


        let files = []
        let completions = []
        let data = ""


        const getFiles = (path, relative_path) => {
            if (fs.lstatSync(path).isDirectory()) { // is this a folder?
                fs.readdirSync(path).forEach(f => {   // for everything in this folder
                    getFiles(path + '/' + f)            // process it recursively
                })
            } else if (path.endsWith(".py")) {  // is this a file we are searching for?
                const doc = vscode_1.workspace.fs.readFile(vscode_1.Uri.file(path));

                let params = ""
                let params_index = 2
                try {
                    let data = fs.readFileSync(path, 'utf8');
                    const regex = /self.(.*?)([\'\"][\),]|([ \t\n]|>))/gm;

                    let m;

                    while ((m = regex.exec(data.toString())) !== null) {
                        // This is necessary to avoid infinite loops with zero-width matches
                        if (m.index === regex.lastIndex) {
                            regex.lastIndex++;
                        }

                        // The result can be accessed through the `m`-variable.
                        m.forEach((match, groupIndex) => {
                            if (groupIndex === 1 && match !== "") {
                                params += `${match}` + "='${" + `${params_index}` + "}' "
                                params_index +=1
                                console.log(`Found match, group ${groupIndex}: ${match}`);
                            }

                        });
                    }
                    files.push(params)
                } catch (err) {
                    throw new Error(`${err}`);
                }


                let component_path = path.split("//")[1].replace("/", ".")
                let component_resolved = util.getFilenameAndExtension(component_path)[0]


                let completion = new vscode_1.CompletionItem(`mv-${component_resolved}></mv-${component_resolved}>`)
                completion.insertText = new vscode_1.SnippetString("<mv-" + `${component_resolved} ${data.toString()}` + `${params}` + ">${1}" + `</mv-${component_resolved}>`);
                completions.push(completion)

            }
        }


        const linePrefix = document.lineAt(position).text.substr(0, position.character).trim();
        //vscode_1.window.showInformationMessage(linePrefix)

        const directoryPath = vscode_1.workspace.workspaceFolders[0].uri.fsPath + '/templates/components/'
        getFiles(directoryPath, directoryPath)

        return completions.filter(unique)
    }
}


exports.default = colonTagProvider;