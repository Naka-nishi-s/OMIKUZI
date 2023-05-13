import * as vscode from "vscode";

// プラグイン有効化時に発火する内容
export function activate(context: vscode.ExtensionContext) {
  console.log('"trash-plugin" is now active!');

  // コマンドを作成
  let disposable = vscode.commands.registerCommand(
    "trash-plugin.happy",
    omikuzi
  );

  // 作成したコマンドを登録
  context.subscriptions.push(disposable);

  // 右下にボタンを作成
  const button = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    0
  );

  // ボタンの内容を記載
  button.command = "trash-plugin.happy";
  button.text = "今日の運勢は";

  // ボタンを登録
  context.subscriptions.push(button);

  // ボタンを表示
  button.show();
}

// おみくじの処理
const omikuzi = () => {
  const lists = ["大凶", "凶", "小吉", "吉", "中吉", "大吉"];
  const result = lists[Math.floor(Math.random() * lists.length)];
  vscode.window.showInformationMessage(`今日の運勢は${result}です！`);
};

// プラグイン削除時?の挙動
export function deactivate() {}
