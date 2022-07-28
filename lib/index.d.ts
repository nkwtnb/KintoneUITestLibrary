import { Page } from "playwright";
export default class {
    page: Page;
    constructor(page: Page);
    /**
     * レコードデータを取得する
     */
    private getRecord;
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
     */
    gotoSpecifiedRecord(appId: number, recordId: number): Promise<void>;
    /**
     * レコード追加画面へ遷移する
     */
    gotoCreateRecord(appId: number): Promise<void>;
    /**
     * レコードに値を入力する
     * @param record
     */
    editRecord(record: Object): Promise<void>;
    /**
     * レコードを保存する
     */
    saveRecordEdit(): Promise<any>;
}
