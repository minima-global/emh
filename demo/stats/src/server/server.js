const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const tokens = {};

app.use(cors());
app.use(express.urlencoded({
  extended: true,
}));

app.post('/', function(request, response) {
  Object.keys(request.body).forEach((key) => {
    const tokenInfo = JSON.parse(key);
    const tokenDetails = tokens[tokenInfo.tokenId];
    if (!tokenDetails) {
      const tokenCount = {
        count: 1,
      };
      tokens[tokenInfo.tokenId] = tokenCount;
    } else {
      tokens[tokenInfo.tokenId].count += 1;
    }
  });
  response.send('OK');
});

app.get('/', function(request, response) {
  response.send(tokens);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
