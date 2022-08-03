# KintoneUITestLibrary

Playwrightを使用したkintoneのUIテストの為のAPIをまとめたライブラリです。

## Features

- kintoneへのログイン
- 指定アプリへの遷移
- レコード一覧画面への遷移
- レコード作成画面への遷移
- レコード編集画面への遷移
- レコード詳細画面への遷移
- レコードへの値入力
- 編集中レコードの保存
- レコードデータの取得

などを実装（順次追加）

## Dependencies

- Node.js >= 16.13.1
- Playwright >= 1.24.0

## Configuration
### 各設定をconfig.jsonに記載します。
__設定例__
```json
{
  // 対象の環境に合わせて、サブドメイン、ログイン情報を記載する
  "subdomain": "hogehoge",
  "authentication": {
    "username": "nkwtnb",
    "password": "strongpassword"
  },
  // テスト用の対象アプリ、対象ビューのIDを記載する
  "test": {
    "appId": 4256,
    "viewId": 20
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
  // 登録したい対象アプリID、内容を引数で渡す
  await lib.createRecord(1234, {
    "氏名": {
      "value": "taro yamada"
    }
  });
  await lib.saveRecord();
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
  // 登録したい対象アプリID、内容を引数で渡す
  await lib.createRecord(1234, {
    "生年月日": {
      value: "2002-01-01"
    },
  });
  const newRecord = await lib.saveRecord();
  // 「生年月日」から計算し、「年齢」に値が設定されていること（2022年時点で20歳）
  expect(newRecord["年齢"].value).toEqual("20");
  await browser.close();
});
```

## License
MIT