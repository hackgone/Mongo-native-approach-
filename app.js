const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url,{ useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  findDocuments(db, function() {
      client.close();
    });
});
const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    {
      name:"Apple",
      score:8,
      revier:"Great fruit"
    },
    {
      name:"orange",
      score:6,
      revier:"kinda sour"

    },
    {
      name:"Banana",
      score:9,
      revier:"Great stuff"

    }
  ], function(err, result) {
    assert.equal(err, null);//validate
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);//3 results are inserted in db
    console.log("Inserted 3 documents into the collection");//log if all correct
    callback(result);
  });
};
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruit) {//array insertion in fruit
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruit)//log fruit array
    callback(fruit);
  });
}
