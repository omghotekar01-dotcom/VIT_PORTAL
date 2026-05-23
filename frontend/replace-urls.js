const fs = require('fs');
const path = require('path');
const oldUrlRegex = /https:\/\/scontent-bom5-2\.cdninstagram\.com[^\"\'\`\s]*/g;
const newUrl = '/vit-logo.jpg';

function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInFiles(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (oldUrlRegex.test(content)) {
                content = content.replace(oldUrlRegex, newUrl);
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated: ' + fullPath);
            }
        }
    }
}
replaceInFiles('./src');
console.log('Image URLs replaced.');
