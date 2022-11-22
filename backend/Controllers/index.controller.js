// import { Request, Response } from "express";
// import { QueryResult } from "pg";

const { Client } = require("pg");

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'admin',
  database:'price_history',
  port: 5432,
})



client.connect();

const getUsers = async (req,res) => {
  try {
    const response = await client.query("SELECT * from manufacturer");
    return res.status(200).json(response.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};

// const getPlatform = async (req,res) => {
//   try {
//     const response = await client.query("SELECT * from platform");
//     return res.status(200).json(response.rows);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json("Internal server error");
//   }
// };

const gettheProductHistory = async (req,res) => {
  try {
    const response = await client.query("SELECT * FROM PRICE NATURAL JOIN PRODUCT WHERE product_id = 2");
    return res.status(200).json(response.rows);
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({err: err.message});
  }
}

const getPlatform = async (req,res) => {
  try {
    const response = await client.query("SELECT * from platform");
    return res.status(200).json(response.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};


const getUserById = async (req,res) => {
  console.log(req.params.id);
  const id = parseInt(req.params.id);
  const response = await client.query(
    "SELECT * FROM customer WHERE customer_id = $1",
    [id]
  );
  return res.json(response.rows);
};

const createUser = (req, res) => {
  const { platform_id,name,app,website,applicable_age,rating,data_secutrity } = req.body;
  console.log(platform_id,name,app,website,applicable_age,rating,data_secutrity);
  const response = client.query(
    "INSERT INTO platform (platform_id,name,app,website,applicable_age,rating,data_security) VALUES ($1, $2, $3,$4,$5,$6,$7)",
    [platform_id,name,app,website,applicable_age,rating,data_secutrity]
  );
  console.log(response);
  res.json({
    message: "platform Added successfully",
    body: {
      platform: { platform_id,name,app,website,applicable_age,rating,data_secutrity },
    },
  });
};

const updateUser = async (req, res) => {
  const { platform_id,name,app,website,rating,applicable_age,data_secutrity } = req.body;
  const response = await client.query(
    "UPDATE platform SET name = $2, rating = $6, app = $3, website = $4, applicable_age = $5, data_security = $7 WHERE platform_id = $1",
    [platform_id,name,app,website,applicable_age,rating,data_secutrity]
  );
  console.log(response);
  res.json("platform Updated Successfully");
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  await client.query("DELETE FROM manufacturer where manf_id = $1", [id]);
  res.json(`Manufacturer ${id} deleted Successfully`);
};



module.exports = {deleteUser,updateUser,createUser,getUserById,getUsers,getPlatform,gettheProductHistory}
