import fs from 'fs';
import path from 'path';

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
function openfp(browserPath: string) {
  checkDir(browserPath);
  const userPath = checkDir(path.join(browserPath, 'user'));
  const pluginsPath = checkDir(path.join(browserPath, 'plugins'));
  const fingerprintPath = path.join(browserPath, 'fingerprint.json');
  const launchOptionsPath = path.join(browserPath, 'launchOptions.json');
  const pluginsDirs = getAllSubDirPath(pluginsPath).join(',');
}
