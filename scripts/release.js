#! /usr/bin/env node

const path = require('path');
const Utils = require('./utils');
const Tasks = require('./tasks');

// Building archive file
Tasks.releaseTask(() => {
  // Building cheat sheet
  const outputDir = path.resolve(__dirname, '../releases');
  const packageFilePath = path.resolve(__dirname, '../package.json');

  const package = Utils.readJSON(packageFilePath);
  const cheatSheetFilePath = path.join(outputDir, 'cheatsheet.txt');
  Utils.writeFile(cheatSheetFilePath, `
#tag-name
v${package.version}

#release-name
${package.easy.name} v${package.version}

#Changelog
Changelog:
- point
`);

});