# tlab-portalです

これはnekoが密かに作り始めたサーバーレスでセキュアなポータルサイトを運用しようという目論見です。

This is portal site for takeda labolatory.

Neko(Twitter:@Im-nuko) try to operate secure site without some server.

## 要件
cloudflareでCDNによる負荷分散

balancing with cloudflare

herokuでapiサーバ,mongoDB運用

operating api server and mongoDB in Heroku

github.ioでフロントの構築
フロントは/docsの中にファイルを保存

put the front files at /docs and operating with github.io

認証はslackからのOAuthを使った認証をします

Authorizing with slack OAuth API.

そのままトークンにするかもしれないですが、もしかしたらjwtにする。
(ここはslackから返ってくるトークンの仕様と相談)


何かもし作った時は自分の名前を付けてブランチ切ってmasterにプルリク出してくださると助かります。

If you make any Shintyoku, please create your branch with your name and pull request.

branch example) neko/dev-portal
