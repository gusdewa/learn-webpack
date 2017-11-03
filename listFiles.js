/* eslint no-param-reassign: 0 */

const path = require('path');
const fs = require('fs');

const relativeFolderName = 'Views';
const walkSync = function (dir, filelist, extension) {
  const files = fs.readdirSync(dir);
  files.forEach(function (file) {
    if (fs.statSync(`${dir}/${file}`).isDirectory()) {
      filelist = walkSync(`${dir}/${file}`, filelist, extension);
    } else if (file.includes('.') && file.split('.').includes(extension)) {
      const relativeDir = relativeFolderName + dir.split(relativeFolderName)[1];
      filelist[`${relativeDir}/${file.replace('.js', '')}`] = `./${relativeDir}`;
    }
  });
  return filelist;
};

const viewFolder = path.resolve(__dirname, relativeFolderName);
const entriesJs = walkSync(viewFolder, {}, 'js')

module.exports = entriesJs;
