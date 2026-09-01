/*
ESM = ES Module  import / export
CJS = CommonJS   require() / module.exports
*/
import fs from "fs";           // Node.js 內建模組：讀取、寫入、操作檔案
import path from "path";       // Node.js 內建模組：處理檔案與資料夾路徑
import express from "express"; // npm 套件：建立 Web Server、路由、RESTful API
import mariadb from "mariadb"; // npm 套件：連線與操作 MariaDB 資料庫
import ejs from "ejs";         // npm 套件：HTML 樣板引擎，將資料帶入網頁產生 HTML

const app = express(); // 建立 Express 路由器，將路由掛在 app 上
//app.listen(8081);
//反向代理建議改成:
app.listen(8081, "127.0.0.1", () => {
  console.log("Server running at http://127.0.0.1:8081");
});

import {router} from './controller/SensorController.js'; // 匯入自訂的路由模組
app.use('/custom',router);


// 瀏覽器 / 前端
// GET /custom/api/dht11
// server.js
// app.use('/custom', router)
// controller/SensorController.js
// router.get('/api/dht11', ...)
// connection_mariadb()
// service/SensorService.js
// 讀取 common.json
// 建立 MariaDB connection
// Query_DHT11()
// SELECT * FROM TEST_TB
// new DHT11(...)
// model/DHT11.js
// return result
// SensorController.js
// res.json(result)
// 回傳 JSON 給瀏覽器


// server.js       = 入口、掛路由
// Controller      = 接 HTTP Request / 回 Response
// Service         = 商業邏輯、查資料庫
// Model           = 資料格式
// MariaDB         = 真正資料來源