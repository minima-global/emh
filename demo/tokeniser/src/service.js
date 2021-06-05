const app = 'Tokeniser';

const server = 'http://127.0.0.1:9004';
const serverApiBase = 'api/EMH/?command';
const listenCommand = 'addAppListener';

const url = server + '/' + serverApiBase + '=' + listenCommand + '&name=' + app;
const encodedURL = encodeURI(url);

Minima.log(app + '  trying istmner boom! ' + url);

Minima.net.GET(encodedURL, function(getResult) {
  const result = decodeURIComponent(getResult.result)
  const resultObject = JSON.parse(result);
  if ( resultObject.status ) {
    Minima.log(app + ' listen boom! ', getResult);
    Minima.minidapps.listen(function(msg) {
      Minima.log(app + ' got sent message ', msg);
      Minima.minidapps.reply(msg.replyid, 'OK');
    });
  } else {
    Minima.log(app + '  trying istmner boom!failed top get ' + getResult);
  }
}); 

