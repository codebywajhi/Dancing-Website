const express = require('express');

const app = express();

const port = 3003;

const path = require("path");

// const bodyparser = require("body-parser");

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
   try { 

   await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

   console.log("connect to the data base ");


} catch (error) {

      console.error("Data base connection error : ");

   }
}

// making the schema for the data 
const contactSchema = new mongoose.Schema({

   person:{ type: String , required : true }, 
   Email: { type: String , required : true },
   Address: String,
   Age: String,

});

// next step is compiling our schema into model
const Contact = mongoose.model('Contact', contactSchema);

// it will help to run the console.log(req.body)
app.use(express.urlencoded({extended : true }));

//  for serving static file
app.use("/static", express.static("static"));

// making a view engine template
app.set("view engine", "pug");

//  directory path to views
app.set("views", path.join(__dirname, ("views")));

// getting the req from the file named (index.pug)
app.get("/", (req, res) => {

   const params = {}
   res.status(200).render("home.pug", params);

});

app.get("/about", (req, res) => {
   const params = {}
   res.status(200).render("about.pug", params);
})

app.get("/contact", (req, res) => {

   const params = {}
   res.status(200).render("contact.pug", params);

});


//  => npm install bodyparser <=

// we will use the post method which will help to post
//             the data into the data base 

app.post('/contact', (req, res) => {

   var myData = new Contact(req.body);

   myData.save()

      .then(() => {

         res.send("This item has been saved to the database");

      })

      .catch(() => {

         // console.error("Error is data is not save intp the data base");
         res.status(400).send("item was not saved to the databse");

      });

});

// serving the data to the port no 80 

app.listen(port, () => {

   console.log(`server is running at port ${port}`)

});