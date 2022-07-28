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
   */
   async gotoSpecifiedRecord(appId: number, recordId: number) {
    await this.page.goto(`${CONST.URL.BASE_URL}/k/${appId}/show#record=${recordId}`);
    await this.page.waitForSelector('div.gaia-argoui-optionmenubutton.gaia-argoui-app-menu-option');
  }
  /**
   * レコード追加画面へ遷移する
   */
   async gotoCreateRecord(appId: number) {
    await this.page.goto(`${CONST.URL.BASE_URL}/k/${appId}`);
    await this.page.locator('a[title="レコードを追加する"]').click();
    await this.page.waitForSelector('div.gaia-argoui-app-edit-buttons');
    await this.page.waitForTimeout(1000);
  }
  /**
   * レコードに値を入力する
   * @param record 
   */
  async editRecord(record: Object) {
    await this.page.evaluate((record: any) => {    
      const objRecord = kintone.app.record.get();    
      for (let field in record) {
        objRecord.record[field].value = record[field].value;
      }
      kintone.app.record.set(objRecord);
    }, record);
  }
  /**
   * レコードを保存する
   */
  async saveRecordEdit() {
    await this.page.locator('button.gaia-ui-actionmenu-save').click();
    await this.page.waitForSelector('div.gaia-argoui-app-toolbar-menu');
    return await this.getRecord();
  }
}
