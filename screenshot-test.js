const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const URL = 'https://jmperial.github.io/falcon-consulting/';

const DEVICES = [
  { name: 'iPhone-SE',          width: 375,  height: 667,  dpr: 2 },
  { name: 'iPhone-15',          width: 393,  height: 852,  dpr: 3 },
  { name: 'iPhone-15-ProMax',   width: 430,  height: 932,  dpr: 3 },
  { name: 'iPad-Mini',          width: 768,  height: 1024, dpr: 2 },
  { name: 'iPad-Pro-11',        width: 834,  height: 1194, dpr: 2 },
  { name: 'MacBook-Air-13',     width: 1280, height: 800,  dpr: 2 },
];

// Sections to capture (scroll positions as % of page height)
const SECTIONS = [
  { name: '01-hero',        scroll: 0.00 },
  { name: '02-problem',     scroll: 0.14 },
  { name: '03-services',    scroll: 0.28 },
  { name: '04-pricing',     scroll: 0.42 },
  { name: '05-flow',        scroll: 0.56 },
  { name: '06-credentials', scroll: 0.70 },
  { name: '07-contact',     scroll: 0.85 },
];

const outDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// Clear old screenshots
fs.readdirSync(outDir).forEach(f => fs.unlinkSync(path.join(outDir, f)));

(async () => {
  console.log('🚀 Playwright スクリーンショット取得開始...\n');
  const browser = await chromium.launch();

  for (const device of DEVICES) {
    console.log(`📱 ${device.name} (${device.width}x${device.height})`);
    const ctx = await browser.newContext({
      viewport: { width: device.width, height: device.height },
      deviceScaleFactor: device.dpr,
    });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // アニメーション待機

    // フルページスクリーンショット
    await page.screenshot({
      path: path.join(outDir, `${device.name}--full.png`),
      fullPage: true,
    });

    // セクションごと
    const pageH = await page.evaluate(() => document.body.scrollHeight);
    for (const sec of SECTIONS) {
      const scrollY = Math.floor(pageH * sec.scroll);
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(1200); // アニメーション待機
      await page.screenshot({
        path: path.join(outDir, `${device.name}--${sec.name}.png`),
      });
    }

    await ctx.close();
    console.log(`   ✅ ${SECTIONS.length + 1} 枚保存完了`);
  }

  await browser.close();

  const total = fs.readdirSync(outDir).length;
  console.log(`\n✨ 完了！${total} 枚 → screenshots/ フォルダ`);
  console.log(`   open screenshots/  で確認できます`);
})();
