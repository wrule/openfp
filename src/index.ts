import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

export
function merge(obj1: any, obj2: any) {
  const isObject = (object: any) =>
    Object.prototype.toString.call(object) === '[object Object]';
  if (isObject(obj1) && isObject(obj2)) {
    const result = { ...obj1 };
    Object.entries(obj2).forEach(([key, value]) =>
      result[key] = merge(result[key], value)
    );
    return result;
  }
  return obj2;
}

export
function checkDir(dirPath: string) {
  if (!fs.existsSync(dirPath))
    fs.mkdirSync(dirPath, { recursive: true });
  return dirPath;
}

export
function loadJson(filePath: string) {
  try {
    const jsonText = fs.readFileSync(filePath).toString();
    return JSON.parse(jsonText);
  } catch (e) {
    console.log(e);
  }
  return { };
}

export
function getAllSubDirPath(dirPath: string) {
  return fs.readdirSync(checkDir(dirPath))
    .map((file) => path.join(dirPath, file))
    .filter((file) => fs.statSync(file).isDirectory());
}

export default
async function openfp(browserPath: string) {
  const userPath = checkDir(path.join(browserPath, 'user'));
  const pluginsPath = checkDir(path.join(browserPath, 'plugins'));
  const fingerprintPath = path.join(browserPath, 'fingerprint.json');
  const launchOptionsPath = path.join(browserPath, 'launchOptions.json');
  const pluginsDirs = getAllSubDirPath(pluginsPath).join(',');

  const launchOptions = merge({
    headless: false,
    defaultViewport: null,
    args: [
      '--disable-infobars',
      '--no-default-browser-check',
      `--load-extension=${pluginsDirs}`,
      `--disable-extensions-except=${pluginsDirs}`,
    ],
    ignoreDefaultArgs: [
      '--enable-automation',
      '--enable-blink-features=IdleDetection',
    ],
    userDataDir: userPath,
  }, loadJson(launchOptionsPath));

  const browser = await puppeteer.launch(launchOptions);

  // 浏览器关闭监测
  const timer = setInterval(async () => {
    const pages = await browser.pages();
    if (pages.length < 1) {
      clearInterval(timer);
      await browser.close();
      process.exit(0);
    }
  }, 100);

  return browser;
}
