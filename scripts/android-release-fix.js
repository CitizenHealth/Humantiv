const fs = require('fs');

try {
  const curDir = __dirname;
  const rootDir = process.cwd();

  const file = `${rootDir}/node_modules/react-native/react.gradle`;
  const dataFix = fs.readFileSync(`${curDir}/android-release-gradle-fix`, 'utf8');
  const data = fs.readFileSync(file, 'utf8');

  const doLast = 'doLast \{';
  if (data.indexOf(doLast) !== -1) {
    throw 'Already fixed.';
  }

  const result = data.replace(/\/\/ Set up inputs and outputs so gradle can cache the result/g, dataFix);
  fs.writeFileSync(file, result, 'utf8');
  console.log('Android Gradle Fixed!');
} catch (error) {
  console.error(error);
}