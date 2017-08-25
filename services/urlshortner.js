module.exports = function(app, shortUrl) {
  // query the db for the shortUrl and forward to the original url
  app.route('/:fwdUrl').get((req, res, next) => {
      let minUrl = req.params.fwdUrl;

      if(minUrl !== 'favicon.ico'){
        shortUrl.findOne({'shortUrl': minUrl}, (err, data) => {
          if(err){
            console.log('Error reading Database...');
          }

          let regEx = new RegExp("^(http|https)://", "i");
          let strUrl = data.originalUrl;

          if(regEx.test(strUrl)){
            res.redirect(301, data.originalUrl);
          }else{
            res.redirect(301, 'http://'+ data.originalUrl);
          }
        });
      }
  });

  app.route('/new/:url(*)').get((req, res, next) => {
    let url = req.params.url;
    let regEx = /[-a-zA-Z0-9@:%\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%\+.~#?&//=]*)?/gi;﻿
    let shortenedUrl;
    let result;

    let record = new shortUrl(
      {
        originalUrl: null,
        shortUrl: null
      }
    );

    if(regEx.test(url) === true){
      shortenedUrl = Math.floor(Math.random()*100000).toString();
      record.originalUrl = url;
      record.shortUrl = shortenedUrl;
      record.save(err => {
        if(err){
          console.log('Error saving to database');
        }
      });
      
      result = {
        "original_url": record.originalUrl,
        "short_url": record.shortUrl
      }
    }else{
      result = {"error": "URL invalid"};
    }
    res.json(result);
  });
};
