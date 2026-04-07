# ファルコンコンサルティング LP — プロジェクト概要

## サイト概要
- **URL**: https://jmperial.github.io/falcon-consulting/
- **構成**: `index.html` 1ファイルのみ（CSS・HTML・JS全てインライン）
- **ホスティング**: GitHub Pages (`jmperial/falcon-consulting`)
- **開発ブランチ**: `claude/update-font-meiryo-ui-ygZHy`（mainにpush）

## サイト内容
ファルコンコンサルティングの営業LP。生成AI×業務改革をテーマにしたダーク系ターミナルUIデザイン。

## セクション構成
| ID | 内容 | テーマ |
|---|---|---|
| s1 | ヒーロー（DOS風ターミナル） | 黒背景・蛍光グリーン |
| s2 | 課題（ERROR/FIX カード） | アンバー |
| s3 | 支援内容3つ | シアン |
| s4 | 料金（削減時間×単価） | パープル |
| s5 | 導入フロー | ネイビー |
| s6 | 実績・クレデンシャル（Warpターミナル風） | ディープパープル |
| s7 | お問い合わせフォーム（Claude Code風UI） | パープル |

## 主要な実装ポイント

### アニメーション
- 各セクションはスクロールでIntersectionObserverがトリガー
- `[data-cmd]`要素が画面に入るとタイピングアニメーション開始
- セクションが完全に画面外に出るとリセット・再アニメーション
- **s6のみ**: プロフィールボタン（コンサルタント詳細を見る）は永続表示

### s6スクロールエフェクト
- 下スクロール時にグラデーション消滅
- ボタン色が蛍光グリーン→ピンク→イエローに変化

### s7（お問い合わせ）ドラマ演出
ランダムで5つのルートが選ばれる：
1. **normal** (20%): 普通にフォーム生成
2. **fail** (20%): エラー→エージェントが修正
3. **game/pacman** (10%): パックマン→サボり検知→フォーム
4. **game/mario** (20%): マリオ+同僚Agent→部長Agentに怒られる→フォーム
5. **game/dq** (30%): ドラクエバトル（メタルスライム/キングメタル）→宝箱→フォーム
6. **ransom** (20%): ランサムウェア攻撃→falcon.exe→Claude Code緊急対応→フォーム

### キャッチコピー（コンサルタント詳細モーダル）
3パターンがランダムで再生：
- **A**: タイピング（1文字ずつ）
- **B**: フロートリビール（ふわっと浮き上がり）
- **C**: ハードインパクト（スライスワイプ→スラム→シェイク）

## フォント
- 英字・コード: JetBrains Mono（Google Fonts）
- UI全般: Meiryo UI
- ヒーロー日本語行: Noto Serif JP Bold（Google Fonts）

## カラーパレット
| 用途 | カラー |
|---|---|
| 蛍光グリーン | `#33ff00` |
| 蛍光イエロー | `#ffff00` |
| シアン | `#67e8f9` |
| ピンク | `#ff69b4` |
| パープル | `#c084fc` |
| エラー赤 | `#ff3333` |

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
npm run screenshot   # 6機種のフルページPNG → screenshots/
open screenshots/
```

## 作業上の注意
- **index.html 1ファイルのみ編集**（他ファイルは触らない）
- pushは `git push origin main`
- PRは作らない（mainに直接push）
- node_modules/・screenshots/ は .gitignore 済み
