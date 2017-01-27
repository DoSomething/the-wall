const router = require('express')();
const request = require('superagent');

const host = 'http://dosomething.org/api/';

router.get('/cats', (req, res) => {
  request
    .get(`${host}v1/gifs/search`)
    .query({ q: 'cats', rating: 'pg', api_key: key })
    .end((err, gifs) => {
      res.json(gifs.body);
    });
});

module.exports = router;
