import fs from "fs";           // Node.js 內建模組：讀取、寫入、操作檔案
import path from "path";       // Node.js 內建模組：處理檔案與資料夾路徑
import express from "express"; // npm 套件：建立 Web Server、路由、RESTful API
import mariadb from "mariadb"; // npm 套件：連線與操作 MariaDB 資料庫
import ejs from "ejs";         // npm 套件：HTML 樣板引擎，將資料帶入網頁產生 HTML

//一個 ES Module 最多只能有一個 default export，但可以同時有很多個 named export。
// default export
// → import 時不用大括號
// named export
// → import 時要用大括號
import {DHT11} from "../model/DHT11.js";

let conn;
export const connection_mariadb = async function(){
    const jsonText = await fs.promises.readFile('./common.json', 'utf8');
    const data = JSON.parse(jsonText);

    conn = await mariadb.createConnection({
      host: data.mariadb_connection.host,
      user: data.mariadb_connection.user,
      password: data.mariadb_connection.password,
      database: data.mariadb_connection.database
    });
}

export const close_mariadb = async function(){
  await conn.end();
}

export const Query_DHT11 = async function(){
  const rows = await conn.query(
    "SELECT * FROM TEST_TB"
  );
  let result = rows.map(row => new DHT11(
    row.id.toString(),
    row.temperature,
    row.humidity,
    row.created_at
  ));
  return result;
}

export const Query_BH1750 = async function(){
  const rows = await conn.query(
    "SELECT * FROM TEST_TB");
  let result = rows.map(row => new BH1750(
    row.id.toString()+"lx",
    row.illuminance,
    row.created_at
  ));
  return result;
}