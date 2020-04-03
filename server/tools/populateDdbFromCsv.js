const fs = require('fs');
const parse = require('csv-parse');
const async = require('async');
const uuid = require('uuid/v4');
const AWS = require('aws-sdk');

// --- start user config ---

const AWS_CREDENTIALS_PROFILE = 'default';
const CSV_FILENAME = "./openfraksl-saved-fractals-dev.csv";
const DYNAMODB_REGION = 'us-east-1';
const DYNAMODB_TABLENAME = 'openfraksl-saved-fractals-prod';

// --- end user config ---

const credentials = new AWS.SharedIniFileCredentials({
  profile: AWS_CREDENTIALS_PROFILE
});
AWS.config.credentials = credentials;
const docClient = new AWS.DynamoDB.DocumentClient({
  region: DYNAMODB_REGION
});

const rs = fs.createReadStream(CSV_FILENAME);
const parser = parse({
  columns: true,
  delimiter: ','
}, function(err, data) {

  var items_arr = [];

  while (data.length > 0) {
    items_arr.push(data.pop());
  }

  async.each(items_arr, function(item_data, callback) {

    const params = {
      TableName : DYNAMODB_TABLENAME,
      Item: {}
    };
      for (key of Object.keys(item_data)) {
        params.Item[key.replace(" (S)", "")] = item_data[key];
      }

    docClient.put(params, function(err, res, cap) {
      if (err == null) {
        console.log("uploaded");
      } else {
        console.log(err);
      }
      callback();
    });

  }, function() {
  });

});
rs.pipe(parser);