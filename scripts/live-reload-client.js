const http = require('http')
const DEFAULT_PORT = 9999;
function installExtension(extensionBuildPath, port) {
  port = port || DEFAULT_PORT;

  const data = JSON.stringify({
    path: extensionBuildPath
  });
  
  const options = {
    hostname: 'localhost',
    port: port,
    path: '/install-extension',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    },    
  }
  
  const req = http.request(options, res => {
    res.on('data', d => {      
      console.log('[easyeda-dev-server]: Installation request has been sent!')
    })
  })
  
  req.on('error', error => {
    console.error(error)
  })
  
  req.write(data)
  req.end()
}

const ping = (callback,port) => {
  port = port || DEFAULT_PORT;

  const options = {
    hostname: 'localhost',
    port: port,
    path: '/ping',
    method: 'GET'
  };

  const req = http.request(options, () => { 
    callback(true); 
  });  

  req.on('error', () => { 
    callback(false); 
  });  

  req.end()  
};

module.exports = {
  installExtension: installExtension,
  ping: ping
};
