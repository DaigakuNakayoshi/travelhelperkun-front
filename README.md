# 旅行お助け君（フロント）

## 開発環境構築

### bun のインストール

https://bun.sh/docs/installation

### node ライブラリインストール

```sh
bun install
```

### gitをcloneする

```sh
git clone git@github.com:DaigakuNakayoshi/travelhelperkun-front.git
```

### 開発環境へ移動

```sh
cd travelhelperkun-front
```

### dev サーバー起動

```sh
bun run dev
```

## build + preview

```sh
bun run build
bun run preview
```

## lint + format

```sh
bun run check
```

## サンプルページの閲覧方法

サーバーを立ち上げる

```sh
bun run dev
```

### CLI画面にてオプション入力の表示が出るため、下記を選択することでWebページが開く

```sh
h（helpの表示）
o（Web画面への遷移）
```

### ブラウザ（e.g. Chrome）に遷移するため、下記URLを指定

```sh
http://localhost:4173/samples/
```
