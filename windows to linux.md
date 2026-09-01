# Raspberry Pi / Linux Node.js 部署筆記

## 1. 安裝 Node.js 套件

先確認：

```bash
node -v
npm -v
```

沒有的話：

```bash
sudo apt update
sudo apt install nodejs npm
```

進入專案目錄：

```bash
cd ~/vscode_nodejs
```

只要有 `package.json`，就執行：

```bash
npm install
```

> Windows 的 `node_modules` 不建議直接搬到 Linux。
> 保留 `package.json`，到 Linux 重新 `npm install`。

---

## 2. nodemon

全域安裝：

```bash
sudo npm install -g nodemon
```

確認位置：

```bash
which nodemon
npm config get prefix
```

啟動：

```bash
nodemon server.js
```

---

## 3. MariaDB

檢查是否啟動：

```bash
sudo systemctl status mariadb
```

檢查 3306：

```bash
sudo ss -lntp | grep 3306
```

檢查 `bind-address`：

```bash
sudo grep -R "bind-address" /etc/mysql/
```

只允許本機：

```ini
bind-address = 127.0.0.1
```

允許區網連線：

```ini
bind-address = 0.0.0.0
```

修改後：

```bash
sudo systemctl restart mariadb
```

---

## 4. Node.js 連 MariaDB

如果 Node.js 和 MariaDB 都在同一台 Raspberry Pi，建議直接：

```json
{
  "mariadb_connection": {
    "host": "127.0.0.1"
  }
}
```

不要使用 Raspberry Pi 的 Wi-Fi IP，例如：

```text
192.168.69.104
```

因為 DHCP IP 可能會改變。

架構：

```text
其他電腦
   ↓
http://192.168.69.104:8081
   ↓
Node.js / Express
   ↓
127.0.0.1:3306
   ↓
MariaDB
```

---

## 5. 常用檢查

查看 Raspberry Pi IP：

```bash
hostname -I
```

搜尋專案內舊 IP：

```bash
grep -R "192.168.39.138" .
```

啟動 Node.js：

```bash
node server.js
```

或：

```bash
nodemon server.js
```
