const fs = require("fs");
const path = require("path");
import { test, expect, chromium } from "@playwright/test";
import KintoneUITestLibrary from "../lib/index";

test.describe("Features test", () => {
  let lib;
  let config;
  test.beforeAll(async () => {
    const buff = fs.readFileSync(path.resolve(process.cwd(), "./test.config.json"));
    config = JSON.parse(buff.toString());
    const browser = await chromium.launch({
      headless: false
    });
    const context = await browser.newContext({
      locale: "ja-JP"
    });
    const page = await context.newPage();
    lib = new KintoneUITestLibrary(page);
  });
  test("login", async () => {
    await lib.attemptLogin();
  });
  test("go to specified app", async () => {
    await lib.goToSpecifiedApp(config.appId);
  });
  test("go to specified view", async () => {
    await lib.gotoSpecifiedView(config.appId, config.viewId);
  });
  test.describe("record", () => {
    let record;
    test("create", async () => {
      await lib.createRecord(config.appId, {
        "生年月日": {
          "value": "1990-01-01"
        },
      });
      record = await lib.saveRecord();
    });
    test("edit", async () => {
      await lib.editRecord(config.appId, record["$id"].value, {
        "生年月日": {
          "value": "2000-01-01"
        },
      });
      await lib.saveRecord();
    });
  });
});
