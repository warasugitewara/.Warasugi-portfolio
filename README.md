# .Warasugi Portfolio - React Edition

🌐 **Live Site**: https://wc.f5.si  
🔗 **GitHub**: https://github.com/warasugitewara

## 概要

次世代の自己紹介サイト。React + TypeScript + Framer Motion による高速・美しい・インタラクティブなポートフォリオサイト。

**テーマ**: Serial Experiments Lain / Ghost in the Shell インスパイアのサイバーパンク美学  
**パフォーマンス**: Vite による超高速ビルド・チャンク分割・自動最適化

## 機能

✨ **マルチ言語対応**
- 日本語 (デフォルト)
- English
- العربية
- localStorage で言語設定を永続化

🎨 **サイバーパンク UI**
- ネオン配色 (Neon Green #00ff00, Magenta #ff00ff)
- グリッチアニメーション
- スキャンライン効果
- スムーズなスクロール (scroll-snap)

⚡ **パフォーマンス最適化**
- コード分割 (vendor / i18n chunks)
- Terser による圧縮
- CSS-in-JS 効率化
- Lighthouse スコア目標: 90+

📱 **レスポンシブ設計**
- Mobile: 480px 以下
- Tablet: 481px - 768px
- Desktop: 769px+
- RTL 対応 (Arabic)

🔗 **GitHub 連携**
- ヘッダー右上に GitHub リンク
- プロフィール自動リンク
- ホバーエフェクト付き

## 技術スタック

```json
{
  "フロント": "React 19 + TypeScript",
  "アニメーション": "Framer Motion",
  "多言語": "i18next + react-i18next",
  "ビルド": "Vite 7",
  "デプロイ": "GitHub Pages",
  "カスタムドメイン": "wc.f5.si"
}
```

## セットアップ

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # dist/ へ出力
npm run preview  # プレビュー
```

## デプロイメント

GitHub Pages への自動デプロイ:
1. main ブランチに push
2. GitHub Actions が自動ビルド → デプロイ
3. wc.f5.si で公開

DNS 設定:
```
A records:
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

---

**Made with ❤️ from Hokkaido 🇯🇵**
