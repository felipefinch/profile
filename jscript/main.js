
function grabMDFile(nameOfFile) {
    console.log("What is name of MD file? " + nameOfFile);

    fetch(nameOfFile) // ex. README.MD - Must be in the same repo for GitHub Pages
        .then(response => {
            if (!response.ok) throw new Error("Markdown file not found");
            return response.text();
        })
        .then(md => {
            document.getElementById('content').innerHTML = marked.parse(md);
        })
        .catch(err => {
            document.getElementById('content').textContent = "Error loading content.";
            console.error(err);
        });

    return null;
}

// listFiles.js
const fs = require('fs');
const path = require('path');

/**
 * List all files in a given directory (non-recursive)
 * @param {string} dirPath - Path to the directory
 */
function listMDFiles(dirPath) {
    try {
        if (!fs.existsSync(dirPath)) {
            console.error("Directory does not exist:", dirPath);
            return;
        }

        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            const fullPath = path.join(dirPath, file);
            const stats = fs.statSync(fullPath);
            if (stats.isFile()) {
                console.log("File:", file);
            } else if (stats.isDirectory()) {
                console.log("Directory:", file);
            }
        });
    } catch (err) {
        console.error("Error reading directory:", err.message);
    }
}

// Example usage:
// listFiles("./"); // Current directory
