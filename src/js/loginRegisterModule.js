

const electron = require('@electron/remote');
const net = electron.net;

module.exports = {
  login: function() {
    const request = net.request({
      method: 'GET',
      protocol: 'https:',
      hostname: 'httpbin.org/',
      path: '/get',    
    });
    
    request.on('response', (response) => {
      console.log(`STATUS: ${response.statusCode}, ${response.statusMessage}`);
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

      response.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`)
      });
    });
    request.end();
  },

  register: function() {
    console.log('test');
  }
};