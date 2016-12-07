#!/usr/local/bin/node

var querystring = require('querystring');
var param = querystring.parse(process.env.QUERY_STRING);
var MongoDB = require('mongodb').MongoClient;
var crypto = require('crypto');

console.log('Content-type: text/plain; charset=utf-8\n');

var index = "";
var key = "";

MongoDB.connect('mongodb://wp2016_groupJ:groupJ@localhost/wp2016_groupJ', function(err, db)
{ 
  if(!err) 
  {
    db.collection('MSOE', function(err, collection)
    {
      if(param.index.length == 0)
      {
        while(1)
        {
          var check = true;
          index = crypto.randomBytes(32).toString('hex').substr(0,10).toUpperCase();
          collection.findOne({index: index}, function(err, data)
          {
            if(data)
              check = false;
            else
              check = true;
          });
          if(check)
            break;
        }
        key = crypto.randomBytes(32).toString('hex').substr(0,15).toUpperCase();
        collection.insert({
          index: index,
          key: key,
          ttlstr: param.ttlstr,
          tmpstr: param.tmpstr,
          abcstr: param.abcstr,
        }, function(err, data) {
          if(data)
            console.log("!"+index+"!"+key);
          else
            console.log("");
          });
      }     
      else
      {
        collection.update({index: param.index}, 
        {
          index: param.index,
          key: param.key,
          ttlstr: param.ttlstr,
          tmpstr: param.tmpstr,
          abcstr: param.abcstr,
        }, function(err, data)
        {
          if(data)
            console.log("!"+param.index+"!"+param.key);
          else
            console.log("");
        });

      }

    });
  }
  db.close();
});

