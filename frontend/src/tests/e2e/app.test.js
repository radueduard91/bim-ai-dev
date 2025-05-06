// frontend/src/tests/e2e/app.test.js
/**
 * @jest-environment puppeteer
 */

describe('App E2E', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:3000');
    });
  
    it('should load the application successfully', async () => {
      await expect(page).toMatch('BIM AI POC');
      
      // Check that control panel buttons are present
      await expect(page).toMatch('Select File');
      await expect(page).toMatch('Upload');
      await expect(page).toMatch('Generate Definitions');
      await expect(page).toMatch('Harmonise Attributes');
      await expect(page).toMatch('Generate Diagram');
    });
  
    it('should show error when trying to generate definitions without data', async () => {
      // Click the generate definitions button without uploading a file
      await page.click('text=Generate Definitions');
      
      // A confirmation dialog should appear
      await page.waitForSelector('text=Generate Attribute Definitions?');
      
      // Confirm the action
      const confirmButtons = await page.$x("//button[contains(., 'Generate Definitions')]");
      await confirmButtons[1].click();
      
      // Check for error notification
      await page.waitForSelector('text=Please upload data first', { timeout: 5000 });
    });
  });