---
title: "CPCTF2019のWriteup的なもの"
slug: "cpctf2019"
description: "CPCTF2019のWriteup的なもの。"
tags:
- "CTF"
---

## まえがき
[CPCTF2019](https://cpctf.space/)というtraPの新歓イベントに参加しました。  
CTPと競プロを混ぜたみたいなものみたいです。  

{{< tweet 1118465776871034881 >}}

オンサイト1位だったのでWriteupみたいなものを書こうかなと思います。(とは言ってもそこまでかけない…)
解けたもののうちSolvedが少なくて書けそうなものを書きます。(備忘録程度に)

## Password: C4 (300)
[問題](https://cpctf.space/challenges/6f3c8a4e-83c8-427d-a69a-b1394dc5ad51?hide=true)  
![c4](/blog/img/2019-04-21-21-50-50.png)
ブラウザの開発者ツールを開くとwasmを呼び出しているのがわかるので、wasmを保存して中をバイナリエディターで開いて`FLAG`あたりで文字列検索をかけてみます。

> **wasmについての補足**  
> 通常、ブラウザ上ではHTMLが読み込まれ、デザインを指定するCSSや動的な処理を行うJavascriptが読み込まれます。しかしながら、SPA(Single Page Application)やPWA(Progressive Web Apps)などのようにブラウザ上で多量の動的な処理を行うが出てきたことにより、Javascriptのパース時間や(JIT)コンパイル時間がネックとなりました。そこで、ブラウザ上でコンパイル済みのものをそのまま載せようとしてできたのがwasm(WebAssembly)というものです。

## Password: C5 (400)
[問題](https://cpctf.space/challenges/fc499694-d5d7-4aec-88d1-9b254d174c80?hide=true)  
![c5](/blog/img/2019-04-21-22-19-23.png)
開発者ツールを開いても実行されているコードが見当たらないので、`go`のボタンに登録されているイベントを確認してみます。すると、`VM18:7`にコードが存在するようなので(どのように動いているかはわからないです…)そこをクリックすると実行されている関連コードが表示されます。

## deleted flag (200)
[問題](https://cpctf.space/challenges/86db500d-07ec-4b59-a142-0cac6ca8db08)  
問題にあるzipファイルを解凍すると(隠しファイルを表示する設定にしているなら)`.git`フォルダーが存在するので、タイトルのdeletedというところからgitの履歴のどこかに存在するのだろうなと推測します。`git reflog`を知っていればすぐなのですが、もし知らないなら`git 消す`や`git 戻す`あたりでググると出てくるかもしれません。

## Undo (300)
[問題](https://cpctf.space/challenges/6c5ac265-bd74-4e68-b0ca-d649de67643d)  
ファイル一覧を見たいですがlinux(ubuntu)なのでwindowsとはコマンドが違うので同じ動作をするコマンドをググります(覚えていない並感)。そうすると、`ls`というコマンドみたいなので実行してみます。しかし空っぽの`flag.txt`しか見つかりません。タイトルからおそらくアンドゥ機能を使うので、linux自体に存在するかググってみます。linuxにはないみたいですが、検索結果に`vi undo redo`のようなものが見つかります。`vim`(`vi`の進化形みたいなものでテキストエディターの1つ)のアンドゥ機能を試してみます。

## あとがき
はじめてwriteupみたいなものを書いたので、まったく勝手がわかっていなくて変な感じになってるかもしれません…  
Twitterでも書いたのですが、[`veeeeeeery_long _text`](https://cpctf.space/challenges/6362fc68-3633-40dd-91b0-f8984459dbb9?hide=true)のひっかけがかわいくてすきでした😆
