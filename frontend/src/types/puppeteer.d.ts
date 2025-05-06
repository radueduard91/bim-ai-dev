// frontend/src/types/puppeteer.d.ts
declare namespace NodeJS {
    interface Global {
      page: import('puppeteer').Page
      browser: import('puppeteer').Browser
    }
  }
  
  // Add Jest globals
  declare const describe: (description: string, specDefinitions: () => void) => void;
  declare const beforeAll: (action: () => void) => void;
  declare const it: (description: string, action: () => void) => void;
  declare const expect: any;