# Node.js Request Flow 與 ESM / npm 筆記

## Request 資料流向

> `import / export` 不放進 Request Flow。
> 它們是模組之間取得功能的方式，不是 Request 的執行順序。

| 順序 | 位置                 | 作用                                    |
| -- | ------------------ | ------------------------------------- |
| 1  | Browser / Frontend | 發送 `GET /custom/api/dht11`            |
| 2  | `server.js`        | 程式入口、建立 Express、掛載 Router             |
| 3  | Controller         | 接收 Request、呼叫 Service                 |
| 4  | Service            | 建立 MariaDB 連線、執行查詢、處理資料               |
| 5  | MariaDB            | 執行 SQL、回傳查詢結果                         |
| 6  | Model              | 由 Service 使用 Model 整理資料格式 / 建立物件      |
| 7  | Controller         | 接收 Service 回傳結果，執行 `res.json(result)` |
| 8  | Browser / Frontend | 收到 JSON Response                      |


### 各層角色

| 元件          | 角色                                |
| ----------- | --------------------------------- |
| `server.js` | 程式入口、建立 Express、掛載 Router         |
| Controller  | 接收 Request、呼叫 Service、回傳 Response |
| Service     | 建立 DB 連線、執行 SQL、處理資料              |
| Model       | 定義資料格式 / 物件結構                     |
| MariaDB     | 真正的資料來源                           |



---

# ESM / CommonJS

## ESM

* 使用 `import`
* 使用 `export`

```js
export const Query_DHT11 = () => {};
```

```js
import { Query_DHT11 } from './SensorService.js';
```

## CommonJS

* 使用 `require()`
* 使用 `module.exports`

```js
const express = require('express');
module.exports = router;
```

---

# Default Export / Named Export

## Default Export

* 一個檔案最多一個
* Import 不用 `{ }`
* Import 名稱可以自己取

```js
export default router;
```

```js
import myRouter from './router.js';
```

## Named Export

* 一個檔案可以很多個
* Import 要 `{ }`
* 名稱要對應

```js
export const Query_DHT11 = () => {};
export const connection_mariadb = () => {};
```

```js
import {
    Query_DHT11,
    connection_mariadb
} from './SensorService.js';
```

### 快速記憶

* `default` → 不用 `{ }`
* `named` → 要 `{ }`

---

# npm 套件

## 查看本地套件

```bash
npm list --depth=0
```

## 查看本地 `node_modules`

```bash
npm root
```

## 查看全域套件

```bash
npm list -g --depth=0
```

## 查看全域安裝位置

```bash
npm root -g
```

## 安裝方式

* 本地安裝

```bash
npm install express
```

* 全域安裝

```bash
npm install -g nodemon
```

### 快速記憶

* 沒有 `-g` → 目前專案
* 有 `-g` → 全域

---

# `for...in` / `for...of`

## `for...in`

取得：

* key
* property name
* array index

```js
const arr = ['A', 'B', 'C'];

for (const key in arr) {
    console.log(key);
}
```

輸出：

```text
0
1
2
```

## `for...of`

取得：

* value

```js
for (const value of arr) {
    console.log(value);
}
```

輸出：

```text
A
B
C
```

### 快速記憶

* `for...in` → key / index
* `for...of` → value

---

# Request Flow vs import / export

* `import / export`

  * 檔案之間怎麼取得功能

* Request Flow

  * Request 進來後程式怎麼執行

### 最短記法

```text
Request Flow
= 程式怎麼跑

import / export
= 檔案怎麼互相使用功能

for...in
= key / index

for...of
= value
```
