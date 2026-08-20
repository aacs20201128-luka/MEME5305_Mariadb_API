/*
ESM = ES Module  import / export
CJS = CommonJS   require() / module.exports

在目前專案資料夾裡，先看本地套件：npm list --depth=0
這代表這些套件安裝在目前專案的：node_modules/
而且通常會記錄在：package.json

如果要看全域安裝的套件：npm list -g --depth=0
要看全域套件實際裝在哪：npm root -g
目前專案的本地套件位置則可以看：npm root

現在 npm 預設沒有加 -g，就是安裝到目前專案本地。
for (const key in obj)   // 拿 key / index
for (const value of arr) // 拿 value

ispan@~/MEME53_Project$ sudo ss -lntp | grep 3306
LISTEN 0      80         127.0.0.1:3306       0.0.0.0:*    users:(("mariadbd",pid=2169,fd=25)) 
MariaDB 只接受「Linux 這台機器自己」連線
你要改 MariaDB 的 bind-address。常見設定檔位置是：
sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf
bind-address = 127.0.0.1 改成 bind-address = 0.0.0.0 存檔後重啟
sudo systemctl restart mariadb
 */
import fs from "fs";           // Node.js 內建模組：讀取、寫入、操作檔案
import path from "path";       // Node.js 內建模組：處理檔案與資料夾路徑
import express from "express"; // npm 套件：建立 Web Server、路由、RESTful API
import mariadb from "mariadb"; // npm 套件：連線與操作 MariaDB 資料庫
import ejs from "ejs";         // npm 套件：HTML 樣板引擎，將資料帶入網頁產生 HTML

const app = express(); // 建立 Express 路由器，將路由掛在 app 上
app.listen(8081);

import {router} from './controller/SensorController.js'; // 匯入自訂的路由模組
app.use('/custom',router);


// 所以你現在可以先把 import/export 從 Request 流程圖拿掉。
// 它們是「檔案之間怎麼互相取得功能」；
// 而 Controller → Service → Model 是「Request 進來後程式怎麼執行」。
// server.js
//    ↓ import
// Controller
//    ↓ import
// Service
//    ↓ import
// Model