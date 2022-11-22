//Packages
const axios = require("axios");
const cheerio = require("cheerio");
const { Pool } = require("pg");

// get the url
const client = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'admin',
  database:'price_history',
  port: 5432,
});

let url = "https://www.amazon.in/Classmate-Notebook-Single-Line-Pages/dp/B0883NPLL3";

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

const gettheProductHistory = async (req, res) => {
  const {link} = req.body;
  url = link;
  // do the serios work here
  try{
  await scrape();
  }
  catch (err){
    return res.status(500).json(null);
  }
  // got the data into product array
  // Fetch the product price history
  const customer_id = 1145;
  var pdid = -1;
  // get the product_id
  var productIdres
  try{
    productIdres = await client.query('SELECT id FROM link2id WHERE link = $1',[link]);
  }catch (err){
    console.log(err.message);
    return res.status(500).json({
      error:true,
      message:err.message,
      backendmessage:"Enter a valid link"
    })
  }
  if(!productIdres.rows[0]){
    let response1 = await client.query('INSERT INTO link2id VALUES ($1)',[link]);
    let response2 = await client.query('SELECT id FROM link2id WHERE link = $1',[link]);
    console.log(response2.rows[0].id);
    pdid = response2.rows[0].id;
    // insert into product
    let response3 = await client.query('INSERT INTO PRODUCT VALUES ($1,$2,$3,$4,5,0,0)',[pdid,product.name,'a11','a102',]);
  }
  const product_id = pdid == -1 ? productIdres.rows[0].id : pdid;
  try {
    // insert the new price with new date
    const datenow = formatDate(Date.now());
    // console.log(datenow);
    let response4 = await client.query('INSERT INTO PRICE VALUES ($1,$2,$3,$4)',[product_id,datenow,datenow,product.price])
    console.log(response4.rowCount);
  }
  catch (err) {
    console.log(err.message);
    console.log("price insertion error");
  }

  // Now do the main task

  try {
    console.log(product_id);
    const response = await client.query('SELECT * FROM PRICE NATURAL JOIN PRODUCT WHERE product_id = $1',[product_id]);
    console.log(response.rows);
    return res.status(200).json({
      product_name:product.name,
      rows:response.rows
    });
  }
  catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error:true,
      messgae:err.message
    })
  }
};


const product = { name: "", price: "", link: "" };

//Set interval
const handle = setInterval(scrape, 20000);

async function scrape() {
  //Fetch the data
  const { data } = await axios.get(url);
  //Load up the html
  const $ = cheerio.load(data);
  const item = $("div#dp-container");
  //Extract the data that we need
  product.name = $(item).find("h1 span#productTitle").text().replace(/[ ]/g,"");
  product.link = url;
  const price = $(item)
    .find("span .a-price-whole")
    .first()
    .text()
    .replace(/[,.]/g, "");
  const priceNum = parseInt(price);
  product.price = priceNum;
  //Send an SMS
  if (priceNum < 1000) {
        clearInterval(handle);
  }
}




module.exports = {gettheProductHistory};