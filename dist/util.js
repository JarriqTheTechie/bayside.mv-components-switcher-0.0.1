'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
exports.regexJumpFile = /(<mv-)(.*?)([\'\"][\),]|([ \t\n]|>))/g;
exports.regexJumpFileParams = /self.(.*?)([\'\"][\),]|([ \t\n]|>))/gm;
function getFilenameAndExtension(pathfilename) {
    var filenameextension = pathfilename.replace(/^.*[\\\/]/, '');
    var filename = filenameextension.substring(0, filenameextension.lastIndexOf('.'));
    var ext = filenameextension.split('.').pop();
    return [filename, ext];
}
exports.getFilenameAndExtension = getFilenameAndExtension;
