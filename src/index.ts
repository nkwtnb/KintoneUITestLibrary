declare var kintone:any;
import { Page } from "playwright";
import CONST from "./constatnts";

export default class{
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  /**
   * スクリーンショット
   */
  private async screenShot(filename: string) {
    await this.page.screenshot({ path: `./screenshot/${filename}.png`, fullPage: true });
  }
  /**
   * 指定画面への遷移
   */
  private async navigate(url: string) {
    await this.page.goto(url);
  }
  /**
   * ログイン試行
   */
  async attemptLogin() {
    await this.navigate(CONST.URL.LOGIN);
    await this.page.locator('input[name="username"]').fill(CONST.AUTH.USERNAME);
    await this.page.locator('input[name="password"]').fill(CONST.AUTH.PASSWORD);
    await this.page.locator('input[type="submit"]').click();
    await this.page.waitForSelector('a[title="kintone"]');
    await this.screenShot("login");
  }
  /**
   * 指定アプリへ遷移する
   */
  async goToSpecifiedApp(appId: number) {
    await this.navigate(`${CONST.URL.BASE_URL}/k/${appId}`);
    await this.page.waitForSelector('div.gaia-argoui-app-viewtoggle');
    await this.screenShot("app");
  }
  /**
   * 指定レコードへ遷移する
   */
   async gotoSpecifiedRecord(appId: number, recordId: number) {
    await this.navigate(`${CONST.URL.BASE_URL}/k/${appId}/show#record=${recordId}`);
    await this.page.waitForSelector('div.gaia-argoui-optionmenubutton.gaia-argoui-app-menu-option');
    await this.screenShot("record");
  }
  /**
   * レコード追加画面へ遷移する
   */
   async gotoCreateRecord(appId: number) {
    await this.navigate(`${CONST.URL.BASE_URL}/k/${appId}`);
    await this.page.locator('a[title="レコードを追加する"]').click();
    await this.page.waitForSelector('div.gaia-argoui-app-edit-buttons');
    await this.page.waitForTimeout(1000);
    await this.screenShot("edit");
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
    await this.screenShot("save");
  }
}
