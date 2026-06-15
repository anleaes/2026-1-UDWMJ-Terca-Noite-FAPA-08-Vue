const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.vue')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('src/views');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Process only if it has <main class="dashboard-area"> AND <AppHeader
    if (!content.includes('dashboard-area') || !content.includes('<AppHeader')) {
        return;
    }
    
    // Remove <AppHeader ... />
    content = content.replace(/<AppHeader.*?\/>\s*/g, '');
    
    // Remove <AppFooter />
    content = content.replace(/<AppFooter\s*\/>\s*/g, '');
    
    // Remove <main class="dashboard-area">
    content = content.replace(/<main class="dashboard-area">\s*/g, '');
    
    // Remove <div class="container"> (exactly that, not container dashboard-container)
    content = content.replace(/<div class="container">\s*/g, '');
    
    // Remove the closing tags </div></main> that match the ones we opened
    // Since we removed <div class="container"> and <main class="dashboard-area">,
    // we should remove exactly one </div> and one </main> near the end.
    content = content.replace(/<\/div>\s*<\/main>\s*(?=<AppFooter\s*\/>|<\/div>\s*<\/template>|<\/template>)/g, '');
    
    // Alternatively, if AppFooter is already removed, we just remove the </div> </main>
    // Let's do it safely:
    content = content.replace(/<\/div>[\s\n]*<\/main>/, '');

    // Sometimes the outer <div> wrapper in template might be empty or redundant but we can keep it
    
    // Remove imports
    content = content.replace(/import AppHeader.*?\n/g, '');
    content = content.replace(/import AppFooter.*?\n/g, '');
    
    fs.writeFileSync(file, content);
    console.log('Processed', file);
});
