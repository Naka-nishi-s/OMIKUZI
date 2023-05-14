import * as vscode from "vscode";

// プラグイン有効化時に発火する内容
export function activate(context: vscode.ExtensionContext) {
  console.log('"trash-plugin" is now active!');

  // おみくじを引く機能を登録
  registerCMD("trash-plugin.omikuzi", omikuzi, context);

  // 天気を選ぶ機能を登録
  registerCMD("trash-plugin.weather", weather, context);

  // おみくじボタンを配置
  registerButton("今日の運勢は", "trash-plugin.omikuzi", context);

  // おみくじボタンを配置
  registerButton("今日の天気は", "trash-plugin.weather", context);
}

/**
 * コマンドを登録する処理です。
 * @param name コマンドの名前
 * @param func コマンド実行時の処理
 * @param context vscode拡張機能のcontext
 * @return なし
 */
const registerCMD = (
  name: string,
  func: any,
  context: vscode.ExtensionContext
) => {
  const disposable = vscode.commands.registerCommand(name, func);
  context.subscriptions.push(disposable);
};

/**
 * ボタンを登録する処理です。
 * @param label ボタンのラベル
 * @param commandName 実行するコマンド名
 * @param context vscode拡張機能のcontext
 * @return なし
 */
const registerButton = (
  label: string,
  commandName: string,
  context: vscode.ExtensionContext
) => {
  const button = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    0
  );

  // ボタンの内容を記載
  button.command = commandName;
  button.text = label;

  // ボタンを登録
  context.subscriptions.push(button);

  // ボタンを表示
  button.show();
};

/**
 * ランダムにおみくじの情報をポップアップする処理
 * @param なし
 * @return なし
 */
const omikuzi = () => {
  const lists = ["大凶", "凶", "小吉", "吉", "中吉", "大吉"];
  const result = lists[Math.floor(Math.random() * lists.length)];
  vscode.window.showInformationMessage(`今日の運勢は${result}です！`);
};

/**
 * ランダムに天気の情報をポップアップする処理
 * @param なし
 * @returns なし
 */
const weather = () => {
  const lists = ["雨", "くもり", "晴れ", "ひょう", "霧"];
  const result = lists[Math.floor(Math.random() * lists.length)];
  vscode.window.showInformationMessage(
    `今日の天気は${result}です！違ったらごめんね`
  );
};

export function deactivate() {}
