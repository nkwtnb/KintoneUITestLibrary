import { Page } from "playwright";
export default class {
    page: Page;
    constructor(page: Page);
    /**
     * スクリーンショット
     */
    private screenShot;
    /**
     * 指定画面への遷移
     */
    private navigate;
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
    saveRecordEdit(): Promise<void>;
}
