const fs = require('fs');
const path = require('path');

const pairs = [
  { from: path.join(__dirname, '..', 'src', 'app', 'Group.png'), to: path.join(__dirname, '..', 'public', 'Group.png') }
];

pairs.forEach(({ from, to }) => {
  try {
    if (!fs.existsSync(from)) {
      console.warn(`Source not found: ${from}`);
      return;
    }
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
    console.log(`Copied ${from} => ${to}`);
  } catch (err) {
    console.error(`Failed to copy ${from} => ${to}:`, err);
  }
});
