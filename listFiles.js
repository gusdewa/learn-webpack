const path = require('path');
const fs = require('fs');

const relativeFolderName = 'Views';

var walkSync = function (dir, filelist, extension) {
  var fs = fs || require('fs'),
    files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function (file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file + '/', filelist, extension);
    } else {
      if(file.includes('.') && file.split('.').includes(extension)) {
        const relativeDir = relativeFolderName + dir.split(relativeFolderName)[1];
        filelist[`${relativeDir}${file}`] =  `./${relativeDir}`;
      }
    }
  });
  return filelist;
};

const viewFolder = path.resolve(__dirname, relativeFolderName);

module.exports = {
  entriesJs: walkSync(viewFolder, {}, 'js'),
  entriesCss: walkSync(viewFolder, {}, 'css'),
};
