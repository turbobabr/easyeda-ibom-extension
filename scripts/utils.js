const fs = require('fs');
const path = require('path');

function replaceVars(content, vars) {
  let temp = content.toString();

  Object.keys(vars).map(key => {
      const re = new RegExp('\\$\{' + key + '\}', 'gi');

      temp = temp.replace(re, vars[key]);
      return true;
  });
  return temp;
};

function keyReplace(child, parent) {
  for (let key in child) {
      if (!child.hasOwnProperty(key)) continue;
      if (Array.isArray(child[key])) {
          parent[key] = child[key];
          continue;
      }
      if (typeof child[key] !== 'object') {
          parent[key] = child[key];
          continue;
      }
      if (!parent[key]) parent[key] = {};
      this.keyReplace(child[key], parent[key]);
  }
}

function iterateConfigs(defaultConfig, projectConfig) {
  if (!projectConfig) return defaultConfig;
  let temp = Object.assign({}, defaultConfig);

  for (let k in projectConfig) {
      if (!projectConfig.hasOwnProperty(k)) continue;
      if (typeof projectConfig[k] === 'object') {
          if (!temp[k]) temp[k] = {};
          this.keyReplace(projectConfig[k], temp[k]);
      } else {
          temp[k] = projectConfig[k];
      }
  }
  return temp;
}

function copyFolderSync(from, to) {
  try {
      fs.mkdirSync(to);
  } catch (e) {
  }
  fs.readdirSync(from).forEach((element) => {
      const stat = fs.lstatSync(path.join(from, element));

      if (stat.isFile()) {
          fs.copyFileSync(path.join(from, element), path.join(to, element));
      } else if (stat.isSymbolicLink()) {
          fs.symlinkSync(fs.readlinkSync(path.join(from, element)), path.join(to, element));
      } else if (stat.isDirectory()) {
          copyFolderSync(path.join(from, element), path.join(to, element));
      }
  });
}

function copyFile(from, to) {
  fs.createReadStream(from).pipe(fs.createWriteStream(to));
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content);
}

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function createDir(dirPath) {  
  if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
      return true;
  }
  
  return !fs.readdirSync(dirPath).length;
};

function readJSON(filePath) {
  return JSON.parse(readFile(filePath));
}

function readAndReplaceTextFile(path, vars) {
  return replaceVars(readFile(path), vars);
}

function readAndReplaceJSONFile(path, vars) {
  return JSON.stringify(JSON.parse(readAndReplaceTextFile(path, vars)), null, 4);
}

function buildArchiveFileName(version) {
  const pkg = readJSON(path.resolve(__dirname,'../package.json'));
  const id = pkg.easy.archiveFileName ? pkg.easy.archiveFileName : pkg.easy.id;
  return `easyeda-${id}-v${version}.zip`
}

function buildDownloadURL(version) {
  const pkg = readJSON(path.resolve(__dirname,'../package.json'));
  return `https://github.com/${pkg.easy.username}/${pkg.easy.repo}/releases/download/v${version}/${buildArchiveFileName(version)}`;
}

module.exports = {
  replaceVars: replaceVars,
  keyReplace: keyReplace,
  iterateConfigs: iterateConfigs,
  copyFolderSync: copyFolderSync,
  copyFile: copyFile,
  readFile: readFile,
  writeFile: writeFile,
  fileExists: fileExists,
  createDir: createDir,
  readJSON: readJSON,
  readAndReplaceTextFile: readAndReplaceTextFile,
  readAndReplaceJSONFile: readAndReplaceJSONFile,
  buildArchiveFileName: buildArchiveFileName,
  buildDownloadURL: buildDownloadURL
};