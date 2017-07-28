var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');

router.get('/es', function (req, res) {
  var client = elasticsearch.Client({
    host: 'http://aegis:shield@192.168.11.99:9200'
  });
  client.search({
    index: 'law_case_info',
    type: 'case_info',
    body: {
      'query': {
        multi_match: {
          query: 'e4037330903d9a44603829a0d7c3917d',
          fields:['_id']
        }
      }
    }
  }).then(function(response) {
    var hits = response.hits.hits;
    res.end(JSON.stringify(hits));
    console.log(response);
  }, function(error) {
    console.trace(error.message);
  });
});

module.exports = router;
