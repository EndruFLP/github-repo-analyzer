import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'docs', 'screenshots');
const baseUrl = process.env.SCREENSHOT_URL ?? 'http://localhost:5173';

async function main() {
	await mkdir(outDir, { recursive: true });

	const browser = await chromium.launch();
	const page = await browser.newPage({
		viewport: { width: 720, height: 900 },
		deviceScaleFactor: 2,
	});

	await page.goto(baseUrl, { waitUntil: 'networkidle' });
	await page.screenshot({
		path: path.join(outDir, '01-home.png'),
		fullPage: true,
	});

	await page.locator('.search__input').fill('facebook/react');
	await page.locator('.search__button').click();
	await page.locator('.overview__title').waitFor({ timeout: 15000 });
	await page.waitForTimeout(400);

	await page.screenshot({
		path: path.join(outDir, '02-results.png'),
		fullPage: true,
	});

	await browser.close();
	console.log('Screenshots saved to docs/screenshots/');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});