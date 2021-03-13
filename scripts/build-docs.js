#! /usr/bin/env node
const path = require('path');
const Utils = require('./utils');

(() => {
  const package = Utils.readJSON(path.resolve(__dirname,'../package.json'));  
  const archiveFileName = Utils.buildArchiveFileName(package.version);

  // Updating README.md  
  const readmeTemplateFilePath = path.resolve(__dirname,'../README.template.md');
  const readmeOutputFilePath = path.resolve(__dirname,'../README.md');  
  const readmeContents = Utils.readAndReplaceTextFile(readmeTemplateFilePath, {
    downloadFileName: archiveFileName,
    downloadUrl: Utils.buildDownloadURL(package.version),
    issuesUrl: package.bugs.url
  });

  Utils.writeFile(readmeOutputFilePath,readmeContents);
})();