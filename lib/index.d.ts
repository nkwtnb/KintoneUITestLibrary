import { Page } from "playwright";
export default class {
    page: Page;
    constructor(page: Page);
    /**
     * レコードデータを取得する
     */
    private getRecord;
    /**
     * レコードに値を入力する
     * @param record
     */
    private inputValueIntoRecord;
    /**
     * ログイン試行
     */
    attemptLogin(): Promise<void>;
    /**
     * 指定アプリへ遷移する
     */
    goToSpecifiedApp(appId: number): Promise<void>;
    /**
     * 指定レコードへ遷移する
     * @param appId
     * @param record
     */
    gotoSpecifiedRecord(appId: number, recordId: number): Promise<void>;
    /**
     * レコード追加画面へ遷移する
     * @param appId
     * @param record
     */
    createRecord(appId: number, record: Object): Promise<void>;
    /**
     * レコード編集画面へ遷移する
     * @param appId
     * @param recordId
     * @param record
     */
    editRecord(appId: number, recordId: number, record: Object): Promise<void>;
    /**
     * レコードを保存する
     */
    saveRecord(): Promise<any>;
}
