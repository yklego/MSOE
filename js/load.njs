#!/usr/local/bin/node

var querystring = require('querystring');
var param = querystring.parse(process.env.QUERY_STRING);
var MongoDB = require('mongodb').MongoClient;

console.log('Content-type: text/plain; charset=utf-8\n');

MongoDB.connect("mongodb://wp2016_groupJ:groupJ@localhost/wp2016_groupJ", function(err, db)
{
  if(!err)
  {
    db.collection('MSOE', function(err, collection)
    {
      collection.findOne({ index: param.index}, function(err, data)
      {
        if(data) {
          if( data.key.localeCompare(param.key) != 0)
          {
            console.log("");
          }
          else {
            console.log(data.abcstr);
          }
        }
        else
          console.log("");
      });
    });
  }
  db.close();
});


