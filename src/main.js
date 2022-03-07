const testButton = document.getElementById("testBtn");
const inputText = document.getElementById("exampleInputEmail1");


const electron = require('@electron/remote');
const net = electron.net;

testButton.addEventListener('click', () => {
  const request = net.request({
    method: 'GET',
    protocol: 'http:',
    hostname: 'httpbin.org',
    path: '/get',
    redirect: 'follow',
  });
  console.log(inputText.value);
  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}, ${response.statusMessage}`);
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

    response.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`)
    });
});
request.end();

});