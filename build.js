const fs = require('fs-extra');
const path = require('path');

const build = async () => {
    try {
        const distDir = path.join(__dirname, 'dist');
        await fs.ensureDir(distDir);

        let htmlContent = await fs.readFile(path.join(__dirname, 'index.html'), 'utf8');
        const cssContent = await fs.readFile(path.join(__dirname, 'style.css'), 'utf8');
        const dataContent = await fs.readFile(path.join(__dirname, 'data.js'), 'utf8');
        const scriptContent = await fs.readFile(path.join(__dirname, 'script.js'), 'utf8');

        // Inline CSS
        htmlContent = htmlContent.replace('<link rel="stylesheet" href="style.css">', `<style>${cssContent}</style>`);

        // Inline JavaScript
        const combinedJs = `${dataContent}
${scriptContent}`;
        htmlContent = htmlContent.replace('<script src="data.js"></script>', '');
        htmlContent = htmlContent.replace('<script src="script.js"></script>', `<script>${combinedJs}</script>`);
        
        await fs.writeFile(path.join(distDir, 'index.html'), htmlContent);
        console.log('Build successful! The serverless HTML file is located in the "dist" directory.');
    } catch (error) {
        console.error('Build failed:', error);
    }
};

build();
