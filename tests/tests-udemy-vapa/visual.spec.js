const {test,expect} = require("@playwright/test")

// Visual Regression Tests - will fail first time as no baseline images are present and 
// will pass subsequently if UI is unchanged. so you need to verify the images first time and
// then accept them as baseline images.

test("take screenshot", async ({ page }) => {
  await page.goto("https://www.example.com/");
  const screenshot = await page.screenshot();
  expect(screenshot).toMatchSnapshot("home.png");
});

// Responsive design test - screenshots at different viewport sizes
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
    expect(screenshot).toMatchSnapshot(`homepage at ${viewPort.width} x ${viewPort.height}.png`);
  }
});
