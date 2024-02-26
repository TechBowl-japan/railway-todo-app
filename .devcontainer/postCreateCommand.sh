#!/bin/bash
# $'\r': command not foundというエラーがVSCodeのターミナルに出力されている時はこのファイルの改行コードをLFにすること。

# name & email
echo "git config"
if [ -z $EMAIL ];then
    EMAIL=$GITHUB_USER@satt.jp # 仮のメールアドレスを設定している
fi
git config --global user.email $EMAIL
git config --global user.name $GITHUB_USER

# Windowsでは改行コードが違うため、想定外のファイル更新が起こる可能性がある。改行コードをすべてのOSで統一する設定。
git config --global core.autocrlf input

# git rebase -iなどのコマンドでvscodeを開くための設定。設定しないと、ホストマシンのVScodeを開こうとするので、コンテナ上のcodeを実行する。
git config --global core.editor "code --wait"

# git rebase -iなどエディターを開くGitコマンドが使えるように、Codeコマンドをコンテナ内でも使えるようにする。
echo "code command setting"
echo "export PATH=$PATH:$(find /vscode -name "code" -printf '%h\n' | grep vscode/vscode-server | head -1)" >> "/root/.bashrc"

# git secretをインストールして、AWSキーのコミットを防ぐ設定をする。https://github.com/awslabs/git-secrets
# AWSキーとRSA秘密鍵を設定　追加する場合はここに記述する。
echo "git secrets setting"
git secrets --install -f && git secrets --register-aws && git secrets --add 'BEGIN\sRSA\sPRIVATE\sKEY'
git secrets --add -a "(\"|')?(AWS|aws|Aws)?_?(ACCOUNT|account|Account)_?(ID|id|Id)?(\"|')?\\s*(:|=>|=)\\s*(\"|')?[0-9]{4}\\-?[0-9]{4}\\-?[0-9]{4}(\"|')?"

exit 0
