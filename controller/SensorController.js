import fs from "fs";           // Node.js 內建模組：讀取、寫入、操作檔案
import path from "path";       // Node.js 內建模組：處理檔案與資料夾路徑
import express from "express"; // npm 套件：建立 Web Server、路由、RESTful API
import mariadb from "mariadb"; // npm 套件：連線與操作 MariaDB 資料庫
import ejs from "ejs";         // npm 套件：HTML 樣板引擎，將資料帶入網頁產生 HTML

import {connection_mariadb,
  close_mariadb,
  Query_DHT11
} from '../service/SensorService.js';

export var router = express.Router();
router.get("/api/test", (req , res) =>{
  const jsonText = fs.readFileSync('./common.json', 'utf8');
  const data = JSON.parse(jsonText);
  for (const key in data.mariadb_connection) {
    console.log(key, data.mariadb_connection[key]);
  }
  res.json(data);
});

router.get("/api/sensor", async (req, res) => {
    const jsonText = fs.readFileSync('./common.json', 'utf8');
    const data = JSON.parse(jsonText);

    console.log(data.mariadb_connection.host);
    const conn = await mariadb.createConnection({
      host: data.mariadb_connection.host,
      user: data.mariadb_connection.user,
      password: data.mariadb_connection.password,
      database: data.mariadb_connection.database,
      connectTimeout: 5000
    });

    const rows = await conn.query(
        "SELECT * FROM dht11_data ORDER BY created_at DESC LIMIT 1;"
    );

    const result = rows.map(row => ({
      ...row, //其他欄位全部保留
      id: row.id.toString(),
    }));

    res.json(result);
});

router.get("/api/dht11", async(req,res)=>{
  await connection_mariadb();
  const result = await Query_DHT11();
  res.json(result);
  await close_mariadb();
});

router.get("/api/bh1750", async(req,res)=>{
  await connection_mariadb();
  const result = await Query_BH1750();
  res.json(result);
  await close_mariadb();
});