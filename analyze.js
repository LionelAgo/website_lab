const puppeteer = require('puppeteer');

(async () => {
  try {
    // Launch Chrome with minimal required flags
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: [
        '--remote-debugging-port=9222',
        '--disable-features=SitePerProcess,IsolateOrigins',
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
    
    const page = await browser.newPage();
    await page.goto('file:///c:/Users/lagostin/Desktop/git_lab/website_lab_main/index.html');

    // Device simulation
    const devices = [
      { name: 'Mobile', width: 320, height: 480, isMobile: true },
      { name: 'Tablet', width: 768, height: 1024, isMobile: true },
      { name: 'Desktop', width: 1024, height: 768, isMobile: false }
    ];

    for (const device of devices) {
      await page.emulate({
        viewport: { width: device.width, height: device.height },
        userAgent: device.isMobile ? 'Mobile' : 'Desktop'
      });
      
      console.log(`\\n${device.name} (${device.width}x${device.height}) rendering:`);
      const metrics = await page.metrics();
      console.log(`FPS: ${metrics['FramesPerSecond']?.toFixed(2) || 'N/A'}`);
      console.log(`Layout shifts: ${metrics['LayoutShift']?.toFixed(3) || 'N/A'}`);
    }

    // Performance analysis
    const performance = await page.evaluate(() => {
      return {
        resourceTiming: performance.getEntriesByType('resource'),
        navigationTiming: performance.timing
      };
    });
    
    console.log('\\nResource loading:', JSON.stringify(performance.resourceTiming, null, 2));
    console.log('\\nNavigation timing:', JSON.stringify(performance.navigationTiming, null, 2));

    // Accessibility audit
    const accessibility = await page.accessibility.snapshot();
    console.log('\\nAccessibility tree:', JSON.stringify(accessibility, null, 2));

    await browser.close();
  } catch (error) {
    console.error('Script failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
})();