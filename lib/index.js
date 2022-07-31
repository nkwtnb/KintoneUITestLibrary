"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/constatnts.ts
var path = require("path");
var fs = require("fs");
var readConfig = () => {
  const buff = fs.readFileSync(path.resolve(process.cwd(), "./config.json"));
  const config = JSON.parse(buff.toString());
  return config;
};
var constatnts = (() => {
  const config = readConfig();
  const subdomain = config.subdomain;
  return {
    URL: {
      BASE_URL: `https://${subdomain}.cybozu.com`,
      LOGIN: `https://${subdomain}.cybozu.com/login`
    },
    AUTH: {
      USERNAME: config.authentication.username,
      PASSWORD: config.authentication.password
    }
  };
})();
var constatnts_default = constatnts;

// src/index.ts
var src_default = class {
  constructor(page) {
    this.page = page;
  }
  getRecord() {
    return __async(this, null, function* () {
      const record = yield this.page.evaluate(() => {
        const objRecord = kintone.app.record.get();
        return objRecord.record;
      });
      return record;
    });
  }
  inputValueIntoRecord(record) {
    return __async(this, null, function* () {
      yield this.page.evaluate((record2) => {
        const objRecord = kintone.app.record.get();
        for (let field in record2) {
          objRecord.record[field].value = record2[field].value;
        }
        kintone.app.record.set(objRecord);
      }, record);
    });
  }
  attemptLogin() {
    return __async(this, null, function* () {
      yield this.page.goto(constatnts_default.URL.LOGIN);
      yield this.page.locator('input[name="username"]').fill(constatnts_default.AUTH.USERNAME);
      yield this.page.locator('input[name="password"]').fill(constatnts_default.AUTH.PASSWORD);
      yield this.page.locator('input[type="submit"]').click();
      yield this.page.waitForSelector('a[title="kintone"]');
    });
  }
  goToSpecifiedApp(appId) {
    return __async(this, null, function* () {
      yield this.page.goto(`${constatnts_default.URL.BASE_URL}/k/${appId}`);
      yield this.page.waitForSelector("div.gaia-argoui-app-viewtoggle");
    });
  }
  gotoSpecifiedView(appId, viewId) {
    return __async(this, null, function* () {
      yield this.page.goto(`${constatnts_default.URL.BASE_URL}/k/${appId}/?view=${viewId}`);
      yield this.page.waitForSelector("div.contents-gaia.app-index-contents-gaia div.box-gaia");
    });
  }
  gotoSpecifiedRecord(appId, recordId) {
    return __async(this, null, function* () {
      yield this.page.goto(`${constatnts_default.URL.BASE_URL}/k/${appId}/show#record=${recordId}`);
      yield this.page.waitForSelector("div.gaia-argoui-optionmenubutton.gaia-argoui-app-menu-option");
    });
  }
  createRecord(appId, record) {
    return __async(this, null, function* () {
      yield this.page.goto(`${constatnts_default.URL.BASE_URL}/k/${appId}/edit`);
      yield this.page.waitForSelector("div.gaia-argoui-app-edit-buttons");
      yield this.inputValueIntoRecord(record);
    });
  }
  editRecord(appId, recordId, record) {
    return __async(this, null, function* () {
      yield this.page.goto(`${constatnts_default.URL.BASE_URL}/k/${appId}/show#record=${recordId}&mode=edit`);
      yield this.page.waitForSelector("div.gaia-argoui-app-edit-buttons");
      yield this.inputValueIntoRecord(record);
    });
  }
  saveRecord() {
    return __async(this, null, function* () {
      yield this.page.locator("button.gaia-ui-actionmenu-save").click();
      yield this.page.waitForSelector("div.gaia-argoui-app-toolbar-menu");
      yield this.page.waitForSelector("div.gaia-argoui-app-edit-buttons", { state: "hidden" });
      yield this.page.waitForSelector(".showlayout-gaia");
      return yield this.getRecord();
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
