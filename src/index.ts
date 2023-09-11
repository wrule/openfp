import fs from 'fs';

export
function checkDir(dirPath: string) {
  if (!fs.existsSync(dirPath))
    fs.mkdirSync(dirPath, { recursive: true });
  return dirPath;
}

export default
function openfp(browserPath: string) {

}
