# ファルコンコンサルティング LP — プロジェクト概要

## サイト概要
- **URL**: https://jmperial.github.io/falcon-consulting/
- **構成**: `index.html` 1ファイルのみ（CSS・HTML・JS全てインライン、約2750行）
- **ホスティング**: GitHub Pages (`jmperial/falcon-consulting`)
- **本番ブランチ**: `main`（GitHub Pagesが配信）
- **開発方針**: 通常は `main` に直接push。AI作業用の作業ブランチを切る場合あり

## サイト内容
ファルコンコンサルティングの営業LP。生成AI×業務改革をテーマにしたダーク系ターミナルUIデザイン。

## ファイル構成
| ファイル | 役割 |
|---|---|
| `index.html` | 本体（HTML・CSS・JS全てここに集約） |
| `screenshot-test.js` | Playwrightで7機種のフルページPNGを生成 |
| `package.json` | `npm run screenshot` / `npm run open` |
| `README.md` | タイトルのみ |
| `.gitignore` | `screenshots/` / `node_modules/` |

## セクション構成
| ID | 内容 | テーマ |
|---|---|---|
| s1 | ヒーロー（DOS風ターミナル） | 黒背景・蛍光グリーン |
| s2 | 課題（ERROR/FIX カード） | アンバー |
| s3 | 支援内容3つ | シアン |
| s4 | 料金（削減時間×単価、ピンクサイクリングメッセージ） | パープル |
| s5 | 導入フロー（モーダルにデバイス風スライド、5000ms間隔） | ネイビー |
| s6 | 実績・クレデンシャル（Warpターミナル風） | ディープパープル |
| s7 | お問い合わせフォーム（Claude Code風UI） | パープル |

## 主要な実装ポイント

### アニメーション
- 各セクションはスクロールで `IntersectionObserver` がトリガー
- `[data-cmd]`要素が画面に入るとタイピングアニメーション開始
- セクションが完全に画面外に出るとリセット・再アニメーション
- **s6のみ**: プロフィールボタン（コンサルタント詳細を見る）は永続表示
- キャンセル状態でもタイピングが止まらないバグは修正済み（commit `6104941`）

### s6スクロールエフェクト
- 下スクロール時にグラデーション消滅
- ボタン色が蛍光グリーン → ピンク → イエローに変化

### s7（お問い合わせ）ドラマ演出
起動時にランダムで1つのルートが選ばれる（`prompts` 配列から等確率で1つ、各20%）：
1. **normal**: 普通にフォーム生成
2. **fail**: エラー→エージェントが修正→完了
3. **game**: ミニゲーム経由でフォームへ（2エントリ=40%）
4. **ransom**: ランサムウェア攻撃→`falcon.exe`→Claude Code緊急対応→フォーム

**game選択時の内訳**（`runRandomGame` 関数）:
- **pacman** (25%): パックマン → サボり検知 → フォーム
- **invader** (30%): Space Invaders + 同僚Agentが援護射撃 → フォーム
- **dq** (45%): ドラクエバトル（メタルスライム）→ 宝箱 → フォーム

> Mario ミニゲームは Space Invaders に置き換え済み（commit `0a7e79e`）。
> 部長Agent / メタルキング は削除済み（commit `3f8c8b9`）。

### キャッチコピー（コンサルタント詳細モーダル）
3パターンがランダムで再生：
- **A**: タイピング（1文字ずつ）
- **B**: フロートリビール（ふわっと浮き上がり）
- **C**: ハードインパクト（スライスワイプ→スラム→シェイク）

### s7 Claude Codeパネル背景
`#invader-canvas` で薄いインベーダーのドット絵アニメを透明度0.25で描画。

## フォント
- 英字・コード: **JetBrains Mono**（Google Fonts）
- UI全般: **Meiryo UI**
- ヒーロー日本語行 / ロゴ装飾: **Noto Serif JP Bold**（Google Fonts, italic + `skewX(-6deg)`）

## カラーパレット
| 用途 | カラー |
|---|---|
| 蛍光グリーン | `#33ff00` |
| 蛍光イエロー | `#ffff00` |
| シアン | `#67e8f9` |
| ピンク | `#ff69b4` |
| パープル | `#c084fc` |
| エラー赤 | `#ff3333` |
| 背景 | `#0a0a0a` |

## Gitタグ（ロールバック用）
| タグ | 内容 |
|---|---|
| `pre-font-anim` | フォントアニメ前 |
| `pre-catchcopy-line-anim` | キャッチコピータイピング版 |
| `catchcopy-float-reveal` | キャッチコピーフロート版 |
| `hero-size-v1` | ヒーロー文字サイズ調整前 |

## スクリーンショット自動テスト
```bash
npm install
npx playwright install chromium
npm run screenshot   # 7機種のフルページPNG → screenshots/
# iPhone SE / iPhone 15 / iPhone 15 Pro Max / Pixel 10 Pro XL
# iPad Mini / iPad Pro 11 / MacBook Air 13
npm run open         # open screenshots/
```
- 実行前に `screenshots/` の既存PNGは全削除される
- 対象URLは本番 (`https://jmperial.github.io/falcon-consulting/`)

## モバイルレスポンシブの注意
過去の commit は日本語の**行折り返し**修正が多い。テキスト編集時は375px幅で確認すること。
- `white-space:nowrap` を使っている箇所は、文言を短くするか句読点を削って改行を防いでいる
- 既存の語順・読点を不用意に変えない（例: commit `fdfd7a9` `7844c24` `f6d3d63` `5879b17` `6a8016e` `3ae43d6`）

## 作業上の注意
- **`index.html` 1ファイルのみ編集**（他ファイルは原則触らない）
- PRは作らず `main` に直接pushするのが従来ルール
  - ただしAIエージェント経由の作業ブランチ（`claude/...`）に push する指示がある場合はそれに従う
- `screenshots/` / `node_modules/` は `.gitignore` 済み
- 破壊的なgit操作（force push / reset --hard 等）はユーザー明示承認なしで実行しない
