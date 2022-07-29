declare var kintone:any;
import { Page } from "playwright";
import CONST from "./constatnts";

export default class{
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  /**
   * レコードデータを取得する
   */
   private async getRecord() {
    const record =  await this.page.evaluate(() => {
      const objRecord = kintone.app.record.get();
      return objRecord.record;
    });
    return record;
  }
  /**
   * レコードに値を入力する
   * @param record 
   */
   private async inputValueIntoRecord(record: Object) {
    await this.page.evaluate((record: any) => {
      const objRecord = kintone.app.record.get();      
      for (let field in record) {
        objRecord.record[field].value = record[field].value;
      }
      kintone.app.record.set(objRecord);
    }, record);
  } 
  /**
   * ログイン試行
   */
  async attemptLogin() {
    await this.page.goto(CONST.URL.LOGIN);
    await this.page.locator('input[name="username"]').fill(CONST.AUTH.USERNAME);
    await this.page.locator('input[name="password"]').fill(CONST.AUTH.PASSWORD);
    await this.page.locator('input[type="submit"]').click();
    await this.page.waitForSelector('a[title="kintone"]');
  }
  /**
   * 指定アプリへ遷移する
   */
  async goToSpecifiedApp(appId: number) {
    await this.page.goto(`${CONST.URL.BASE_URL}/k/${appId}`);
    await this.page.waitForSelector('div.gaia-argoui-app-viewtoggle');
  }
  /**
   * 指定レコードへ遷移する
   * @param appId 
   * @param record
   */
   async gotoSpecifiedRecord(appId: number, recordId: number) {
    await this.page.goto(`${CONST.URL.BASE_URL}/k/${appId}/show#record=${recordId}`);
    await this.page.waitForSelector('div.gaia-argoui-optionmenubutton.gaia-argoui-app-menu-option');
  }
  /**
   * レコード追加画面へ遷移する
   * @param appId 
   * @param record
   */
   async createRecord(appId: number, record: Object) {
    await this.page.goto(`${CONST.URL.BASE_URL}/k/${appId}/edit`);
    await this.page.waitForSelector('div.gaia-argoui-app-edit-buttons');
    // await this.page.waitForTimeout(1000);
    await this.inputValueIntoRecord(record);
  }
  /**
   * レコード編集画面へ遷移する
   * @param appId 
   * @param recordId 
   * @param record
   */
   async editRecord(appId: number, recordId: number, record: Object) {
    await this.page.goto(`${CONST.URL.BASE_URL}/k/${appId}/show#record=${recordId}&mode=edit`);
    await this.page.waitForSelector('div.gaia-argoui-app-edit-buttons');
    await this.inputValueIntoRecord(record);
  }

  /**
   * レコードを保存する
   */
  async saveRecord() {
    await this.page.locator('button.gaia-ui-actionmenu-save').click();
    await this.page.waitForSelector('div.gaia-argoui-app-toolbar-menu');
    await this.page.waitForSelector('div.gaia-argoui-app-edit-buttons', {state: "hidden"});
    await this.page.waitForSelector('.showlayout-gaia');
    return await this.getRecord();
  }
}
