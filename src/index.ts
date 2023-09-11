import fs from 'fs';
import path from 'path';

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

export default
function openfp(browserPath: string) {
  checkDir(browserPath);
  const userPath = checkDir(path.join(browserPath, 'user'));
  const pluginsPath = checkDir(path.join(browserPath, 'plugins'));
  const fingerprintPath = path.join(browserPath, 'fingerprint.json');
  const launchOptionsPath = path.join(browserPath, 'launchOptions.json');
}
