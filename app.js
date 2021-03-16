const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB",{
   useNewUrlParser: true,
   useUnifiedTopology: true
 });

const fruitSchema= new mongoose.Schema({
  name: {
    type : String,
    required: [true,"please fill this"]
  },
  rating: {
    type: Number,
    min: 1,
    max:10
  },
  review: String
});

const Fruit= mongoose.model("Fruit",fruitSchema);
const fruit= new Fruit({
  name:"hollllooooooooooooo",
  rating : 7,
  review: "not bad",
});
//fruit.save();

const personSchema =new mongoose.Schema({
  name : {
    type : String,
    required: [true,"please fill this"]
  },
  age: {
    type: Number,
    min: 1,
    max:10
  },
  favouriteFruit:fruitSchema
});

const Person = mongoose.model("Person",personSchema);
const person= new Person({
  name:"GOD HU ME",
  age:37,
  favouriteFruit: Kiwi
});
//person.save();

const Kiwi = new Fruit({
  name:"kiwi",
  rating :10,
  review:"good"
});
const Banana = new Fruit({
  name:"banana",
  rating :4,
  review:"ood"
});

/*Fruit.insertMany([Kiwi,Banana],function(err){
  if(err){
    console.log("unsuccessful");
  }else{
    console.log("success");
  }
});*/

Fruit.find(function (err,fruits){
  if(err){
    console.log(err);
  }else {
    mongoose.connection.close();
    fruits.forEach(function (fruit) {
      console.log(fruit.name);

    })
  }

});
/*Fruit.updateOne({_id :"6050d24d2cf8ee1ec0a3dbb0"},
  {name:"JUMPING"},
  function (err){
    if (err) {
      console.log(err);
    }else{
    console.log("updated");
  }
 }
);*/
Fruit.deleteMany({name:"Apple"},function (err){
  if (err) {
    console.log(err);
  }else{
  console.log("Deleted");
}
});
