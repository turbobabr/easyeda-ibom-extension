const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const klawSync = require('klaw-sync');
const path = require('path');
const bodyParser = require('body-parser')
const Utils = require('./utils');

app.use(cors());
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('EasyEDA live-reload server: Alive!');
});

const listExtensionFiles = (folderPath) => {
  const ignore = ['.DS_Store'];
  return klawSync(folderPath,{
    nodir: true,
    filter: (item) => {
      return !ignore.includes(path.basename(item.path))
    }
  }).map((item) => {
    return item.path;
  });  
};

app.get('/ping',(req,res) => {
  res.send('pong');
});

app.get('/fetch-file', (req, res) => {  
  res.sendFile(req.query.path);    
});

const installExtension = (folderPath) => {
  const manifest = Utils.readJSON(path.join(folderPath,'manifest.json'));
  io.emit('message', {
    type: 'methodCall',
    method: 'installExtension',
    params: {
      manifest: manifest,
      requiredFiles: listExtensionFiles(folderPath).map((filePath) => {
        return {
          name: path.basename(filePath),
          path: filePath
        };
      })
    }
  });
};

app.post('/install-extension', (req, res) => {    
  const { path } = req.body;
  console.log('[live-reload]: Installing extension at path - ' + path);
  installExtension(path);  
  res.end();
});

const start = (port) => {
  port = port || 9999;
  io.on('connection', () => {
    console.log('[live-reload]: Incoming connection...');  
  });

  http.listen(port, () => {
    console.log(`EasyEDA live-reload server: http://localhost:${port}/`);
  });
};

module.exports = {
  start: start    
};

