const { test, expect } = require("@playwright/test");
const path = require("path");

// Visual Regression Tests - will fail first time as no baseline images are present and 
// will pass subsequently if UI is unchanged. so you need to verify the images first time and
// then accept them as baseline images.

// Resolve snapshot folder from environment variable, fallback to default
const snapshotDir = process.env.PLAYWRIGHT_SNAPSHOT_DIR || path.join(__dirname, `${__filename}-snapshots`);

test("take screenshot", async ({ page }) => {
  await page.goto("https://www.example.com/");
  const screenshot = await page.screenshot();

  expect(screenshot).toMatchSnapshot(
    path.join(snapshotDir, "home.png")
  );
});

test("responsive screenshot", async ({ page }) => {
  const viewPorts = [
    { width: 320, height: 480 },
    { width: 768, height: 1024 },
    { width: 1920, height: 1080 },
  ];

  for (const viewPort of viewPorts) {
    await page.setViewportSize(viewPort);
    await page.goto("https://www.example.com");
    const screenshot = await page.screenshot();

    expect(screenshot).toMatchSnapshot(
      path.join(snapshotDir, `homepage at ${viewPort.width} x ${viewPort.height}.png`)
    );
  }
});
