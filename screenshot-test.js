const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const URL = 'https://jmperial.github.io/falcon-consulting/';

const DEVICES = [
  // iPhone SE
  { name: 'iPhone-SE-2nd',           width: 375,  height: 667,  dpr: 2 },
  { name: 'iPhone-SE-3rd',           width: 375,  height: 667,  dpr: 2 },
  // iPhone 15シリーズ
  { name: 'iPhone-15',               width: 393,  height: 852,  dpr: 3 },
  { name: 'iPhone-15-Pro',           width: 393,  height: 852,  dpr: 3 },
  { name: 'iPhone-15-ProMax',        width: 430,  height: 932,  dpr: 3 },
  // iPhone 16シリーズ
  { name: 'iPhone-16',               width: 393,  height: 852,  dpr: 3 },
  { name: 'iPhone-16-Pro',           width: 402,  height: 874,  dpr: 3 },
  { name: 'iPhone-16-ProMax',        width: 440,  height: 956,  dpr: 3 },
  // iPhone 17シリーズ（予測値）
  { name: 'iPhone-17',               width: 393,  height: 852,  dpr: 3 },
  { name: 'iPhone-17-Pro',           width: 402,  height: 874,  dpr: 3 },
  { name: 'iPhone-17-ProMax',        width: 440,  height: 956,  dpr: 3 },
  // Android
  { name: 'Pixel-10-Pro-XL',         width: 412,  height: 924,  dpr: 3.5 },
  // iPad最新世代（iPad Pro 13インチ M4）
  { name: 'iPad-Pro-13-M4',          width: 1032, height: 1376, dpr: 2 },
  // Mac
  { name: 'MacBook-Air-13',          width: 1280, height: 800,  dpr: 2 },
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

    // フルページのみ
    await page.screenshot({
      path: path.join(outDir, `${device.name}.png`),
      fullPage: true,
    });

    await ctx.close();
    console.log(`   ✅ 保存完了`);
  }

  await browser.close();

  const total = fs.readdirSync(outDir).length;
  console.log(`\n✨ 完了！${total} 枚 → screenshots/ フォルダ`);
  console.log(`   open screenshots/  で確認できます`);
})();
