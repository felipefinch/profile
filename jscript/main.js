

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

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

// function listMDFiles() {
//     (async function () {
//         const owner = "YOUR_GITHUB_USERNAME"; // e.g., "octocat"
//         const repo = "YOUR_REPO_NAME";        // e.g., "my-website"
//         const path = "YOUR_FOLDER_PATH";      // e.g., "assets/images"
//         const branch = "main";                // or "master"

//         const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;

//         try {
//             const response = await fetch(apiUrl);
//             if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
//             const files = await response.json();

//             const list = document.getElementById("file-list");
//             files.forEach(file => {
//                 if (file.type === "file") {
//                     const li = document.createElement("li");
//                     const link = document.createElement("a");
//                     link.href = file.download_url;
//                     link.textContent = file.name;
//                     li.appendChild(link);
//                     list.appendChild(li);
//                 }
//             });
//         } catch (err) {
//             console.error(err);
//             document.getElementById("file-list").textContent = "Error loading file list.";
//         }
//     })();
// }

async function listGitHubFiles() {
  const url = `https://api.github.com/repositories/1230097187/contents/afiles`;

    try {
    const response = await fetch(url);
    const files = await response.json();
    const listElement = document.getElementById('file-list');

    files.forEach(file => {
      // Create a list item and link for each file
      const li = document.createElement('li');
      const a = document.createElement('a');
      
      // Use 'download_url' for raw file access or 'html_url' for the GitHub UI
      a.href = file.download_url.split('/').slice(-2).join('/');
      console.log(a.href);
      a.textContent = file.name;
      
      li.appendChild(a);
      listElement.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching files:', error);
  }
}

listGitHubFiles();
