# KintoneUITestLibrary

Playwrightを使用したkintoneのUIテストの為のAPIをまとめたライブラリです。

## Dependencies

- Node.js >= 16.13.1
- Playwright >= 1.24.0

## Configuration
### 認証に必要な情報をconfig.jsonに記載します。
__設定例__
```json
{
  "subdomain": "hogehoge",
  "authentication": {
    "username": "nkwtnb",
    "password": "strongpassword"
  }
}
```

## Usage
### （例1）ブラウザを自動操作し、kintoneにログインにして、新規レコードを作成する例
```javascript
import { chromium } from "playwright";
import KintoneUITestLibrary from "kintone-ui-test";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const lib = new KintoneUITestLibrary(page);
  await lib.attemptLogin();
  await lib.gotoCreateRecord(1234);
  // 登録したい内容をレコードオブジェクト形式で作成
  const record = {
    "氏名": {
      "value": "taro yamada"
    }
  };
  await lib.editRecord(record);
  await lib.saveRecordEdit();
  await browser.close();
})();
```
### （例2）submitイベントで年齢計算がされることを確認する例
```javascript
import { test, expect, chromium } from "@playwright/test";
import KintoneUITestLibrary from "kintone-ui-test";

test('submitイベントで年齢が計算される', async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext({
    locale: "ja-JP"
  });
  const page = await context.newPage();
  const lib = new KintoneUITestLibrary(page);
  await lib.attemptLogin();
  await lib.gotoCreateRecord(1234);
  const record = {
    "生年月日": {
      value: "2002-01-01"
    },
  };
  await lib.editRecord(record);
  const newRecord = await lib.saveRecordEdit();
  // 「生年月日」から計算し、「年齢」に値が設定されていること（2022年時点）
  expect(newRecord["年齢"].value).toEqual("20");
  await browser.close();
});
```

## License
MIT