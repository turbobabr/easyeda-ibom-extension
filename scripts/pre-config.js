const Utils = require('./utils');
const path = require('path');

const replacePreConfigValues = () => {
  const config = Utils.readJSON(path.resolve(__dirname,'../pre-config.json'));
  const pkgPath = path.resolve(__dirname,'../package.json');
  Utils.writeFile(pkgPath,Utils.readAndReplaceTextFile(pkgPath,config));
};

(() => {  
  replacePreConfigValues();  
})();