# KintoneUITestLibrary

Playwrightを使用したkintoneのUIテストの為のAPIをまとめたライブラリです。

## Dependencies

- Node.js >= 16.13.1
- Playwright >= 1.24.0

## Configuration

認証に必要な情報をconfig.jsonに記載します。  
__記載例__
```
{
  "subdomain": "hogehoge",
  "authentication": {
    "username": "nkwtnb",
    "password": "strongpassword"
  }
}
```

## Usage
kintoneにログインにして、新規レコードを作成する例
```
import { chromium } from "playwright";
import KintoneUITestLibrary from "kintone-ui-test";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const lib = new KintoneUITestLibrary(page);
  await lib.attemptLogin();
  await lib.gotoCreateRecord(112);
  const record = {
    "プロジェクト名": {
      "value": "プロジェクトA"
    }
    "タスク名": {
      "value": "タスク名"
    },
  };
  await lib.editRecord(record);
  await lib.saveRecordEdit();
  await browser.close();
})();
```
## License
MIT