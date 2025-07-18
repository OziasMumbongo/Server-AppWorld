require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb')
const app = express();
const port = 3000;

const uri = process.env.CONNECTION;


app.use(bodyParser.json());
let client, db


async function connectToMongo(){
console.log(uri);
client = new MongoClient(uri,{})
await client.connect();
db = client.db("StepUpStyle");
usersCollection = db.collection("Users");
productsCollection = db.collection("Products");
cartCollection = db.collection("Cart");
paymentCollection = db.collection("Payments");
ordersCollection = db.collection("Orders")
console.log(" Connected To MongoDB")
}


//CRUD FOR USERS
app.get('/Users', async (req, res) => {
  const myUsers = await usersCollection.find({}).toArray();
  console.log(myUsers)
  res.status(200).send(myUsers)
});


app.get('/Users/:id', async (req, res) => {

try{
  const { ObjectId } = require('mongodb');
  const usersId = req.params.id;
  const Users = await usersCollection.findOne({ _id: new ObjectId(usersId) });
  if(!Users){
    console.log("User Not Found")
    return res.status(404).send("User Not Found")
  } else {
    console.log("User Found")
    return res.status(200).send(Users);
  }
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
})

app.post('/Users', async (req, res) => {

try{
  const newUser = req.body;
  const result = await usersCollection.insertOne(newUser);
  if(!newUser.name || !newUser.password || !newUser.age || !newUser.email){
    console.log("Missing required details")
    return res.status(400).send("Missing required details")
  } else{
    console.log("Successfully Created");
    return res.status(201).send(newUser)
  }
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});


app.put('/Users/:id', async (req, res) => {

try{
  const { ObjectId } = require('mongodb');
  const usersId = req.params.id;
  const updateUser = { ...req.body };
  delete updateUser._id;
  const updatedData = await usersCollection.updateOne({ _id: new ObjectId(usersId)},{ $set: updateUser});
  if(!updateUser.name || !updateUser.password || !updateUser.email){
    console.log("User Not Found")
    res.status(400).send("Missing Required Details")
  } else {
    console.log("Update Success")
    res.status(200).send(updateUser)
  }
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});


app.delete('/Users/:id', async (req, res) => {

try{
  const { ObjectId } = require('mongodb');
  const usersId = req.body;
  const deleteId = await usersCollection.deleteOne({ _id: new ObjectId(usersId) });
  if(!deleteId){
  console.log("User Not Found");
  return res.status(404).send("User Not Found");
 } else{
  console.log("Successfully Deleted");
  return res.status(200).send("Successfully Deleted");
 } 
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});


//CRUD FOR PRODUCTS
app.get('/Products', async (req, res) => {
 const myProducts = await productsCollection.find({}).toArray();
  console.log(myProducts)
  res.status(200).send(myProducts)
});


app.get('/Products/:id', async (req, res) => {
  try{
  const { ObjectId } = require('mongodb');
  const productsId = req.params.id;
  const Products = await productsCollection.findOne({ _id: new ObjectId(productsId) });
  if(!Products){
    console.log("Product Not Found")
    return res.status(404).send("Product Not Found")
  } else {
    console.log("Product Found")
    return res.status(200).send(Products);
  }
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post('/Products', async (req, res) => {
 try{
  const newProducts = req.body;
  const result = await productsCollection.insertOne(newProducts);
  if(!newProducts.product || !newProducts.price || !newProducts.quantity){
    console.log("Missing required details")
    return res.status(400).send("Missing required details")
  } else{
    console.log("Successfully Created");
    return res.status(201).send(newProducts)
  }
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});


app.put('/Products/:id',async (req, res) => {
  try{
  const { ObjectId } = require('mongodb');
  const productsId = req.params.id;
  const updateProduct = { ...req.body };
  delete updateProduct._id;
  const updatedData = await productsCollection.updateOne({ _id: new ObjectId(productsId)},{ $set: updateProduct});
  if(!updateProduct.price || !updateProduct.quantity){
    console.log("Product Not Found")
    res.status(400).send("Missing Required Details")
  } else {
    console.log("Update Success")
    res.status(200).send(updateProduct)
  }
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});


app.delete('/Products/:id', async (req, res) => {
 try{
  const { ObjectId } = require('mongodb');
  const productId = req.body;
  const deleteId = await productsCollection.deleteOne({ _id: new ObjectId(productId) });
  if(!deleteId){
  console.log("Product Not Found");
  return res.status(404).send("User Not Found");
 } else{
  console.log("Successfully Deleted");
  return res.status(200).send("Successfully Deleted");
 } 
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});


//CRUD FOR CART
app.get('/Cart', async (req, res) => {
const myCart = await cartCollection.find({}).toArray();
  console.log(myCart)
  res.status(200).send(myCart)
});

app.get('/Cart/:id', async (req, res) => {
    try{
  const { ObjectId } = require('mongodb');
  const cartId = req.params.id;
  const Cart = await cartCollection.findOne({ _id: new ObjectId(cartId) });
  if(!Cart){
    console.log("Cart Not Found")
    return res.status(404).send("Cart Not Found")
  } else {
    console.log("Cart Found")
    return res.status(200).send(Cart);
  }
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post('/Cart', async (req, res) => {
 try{
  const newCart = req.body;
  const result = await cartCollection.insertOne(newCart);
  if(!newCart.name || !newCart.price || !newCart.quantity){
    console.log("Missing required details")
    return res.status(400).send("Missing required details")
  } else{
    console.log("Successfully Created");
    return res.status(201).send(newCart)
  }
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});


app.put('/Cart/:id', async (req, res) => {
  try{
  const { ObjectId } = require('mongodb');
  const cartId = req.params.id;
  const updateCart = { ...req.body };
  delete updateCart._id;
  const updatedData = await cartCollection.updateOne({ _id: new ObjectId(cartId)},{ $set: updateCart});
  if(!updateCart.price || !updateCart.quantity){
    console.log("Cart Not Found")
    res.status(400).send("Missing Required Details")
  } else {
    console.log("Update Success")
    res.status(200).send(updateCart)
  }
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});


app.delete('/Cart/:id', async (req, res) => {
 try{
  const { ObjectId } = require('mongodb');
  const cartId = req.body;
  const deleteId = await cartCollection.deleteOne({ _id: new ObjectId(cartId) });
  if(!deleteId){
  console.log("Cart Not Found");
  return res.status(404).send("Cart Not Found");
 } else{
  console.log("Successfully Deleted");
  return res.status(200).send("Successfully Deleted");
 } 
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});


//CRUD FOR PAYMENT DETAILS
app.get('/Payments', async (req, res) => {
  const paymentsDetails = await paymentCollection.find({}).toArray();
  console.log(paymentsDetails)
  res.status(200).send(paymentsDetails)
});


app.get('/Payments/:id', async (req, res) => {
  try{
  const { ObjectId } = require('mongodb');
  const paymentsId = req.params.id;
  const Payments = await paymentCollection.findOne({ _id: new ObjectId(paymentsId) });
  if(!Payments){
    console.log("Payment Required")
    return res.status(402).send("Payment Required")
  } else {
    console.log("Successfully Payment")
    return res.status(200).send(Payments);
  }
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post('/Payments', async (req, res) => {
 try{
  const newPayments = req.body;
  const result = await paymentCollection.insertOne(newPayments);
  if(!newPayments.name || !newPayments.account_type || !newPayments.account_no || !newPayments.routing_no){
    console.log("Missing required details")
    return res.status(400).send("Missing required details")
  } else{
    console.log("Successfully Created");
    return res.status(201).send(newPayments)
  }
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});


app.put('/Payments/:id', async (req, res) => {
  try{
  const { ObjectId } = require('mongodb');
  const paymentsId = req.params.id;
  const updatePayments = { ...req.body };
  delete updatePayments._id;
  const updatedData = await paymentCollection.updateOne({ _id: new ObjectId(paymentsId)},{ $set: updatePayments});
  if(!updatePayments.name){
    console.log("User Not Found")
    res.status(400).send("Missing Required Details")
  } else {
    console.log("Update Success")
    res.status(200).send(updatePayments)
  }
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});


app.delete('/Payments/:id', async (req, res) => {
 try{
  const { ObjectId } = require('mongodb');
  const paymentsId = req.body;
  const deleteId = await paymentCollection.deleteOne({ _id: new ObjectId(paymentsId) });
  if(!deleteId){
  console.log("User Not Found");
  return res.status(404).send("User Not Found");
 } else{
  console.log("Successfully Deleted");
  return res.status(200).send("Successfully Deleted");
 } 
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});


//CRUD FOR ORDERS
app.get('/Orders', async (req, res) => {
  const myOrders = await ordersCollection.find({}).toArray();
  console.log(myOrders)
  res.status(200).send(myOrders)
});


app.get('/Orders/:id', async (req, res) => {
  try{
  const { ObjectId } = require('mongodb');
  const ordersId = req.params.id;
  const Orders = await ordersCollection.findOne({ _id: new ObjectId(ordersId) });
  if(!Orders){
    console.log("Order Not Found")
    return res.status(404).send("Order Not Found")
  } else {
    console.log("Order Successful")
    return res.status(200).send(Orders);
  }
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post('/Orders', async (req, res) => {
 try{
  const newOrders = req.body;
  const result = await ordersCollection.insertOne(newOrders);
  if(!newOrders.name || !newOrders.items || !newOrders.quantity || !newOrders.email){
    console.log("Missing required details")
    return res.status(400).send("Missing required details")
  } else{
    console.log("Successfully Created");
    return res.status(201).send(newOrders)
  }
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});


app.put('/Orders/:id', async (req, res) => {
  try{
  const { ObjectId } = require('mongodb');
  const ordersId = req.params.id;
  const updateOrder = { ...req.body };
  delete updateOrder._id;
  const updatedData = await ordersCollection.updateOne({ _id: new ObjectId(ordersId)},{ $set: updateOrder});
  if(!updateOrder.name || !updateOrder.price || !updateOrder.email){
    console.log("Order Not Found")
    res.status(400).send("Missing Required Details")
  } else {
    console.log("Update Success")
    res.status(200).send(updateOrder)
  }
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});


app.delete('/Orders/:id', async (req, res) => {
 try{
  const { ObjectId } = require('mongodb');
  const ordersId = req.body;
  const deleteId = await ordersCollection.deleteOne({ _id: new ObjectId(ordersId) });
  if(!deleteId){
  console.log("Order Not Found");
  return res.status(404).send("Order Not Found");
 } else{
  console.log("Successfully Deleted");
  return res.status(200).send("Successfully Deleted");
 } 
} catch (error) { 
    console.error(error);
    res.status(500).send("Server error");
  }
});


app.listen(port, async () => {
  await connectToMongo()
  console.log(`Server running at http://localhost:${port}`);
  console.log("hi Ozias")
})