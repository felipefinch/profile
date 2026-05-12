
// Common credentials for Github API Access! - Tokens are set to expire after one-day
const owner = 'felipefinch';
const repo = 'pruned';
const resumes_PATH = 'MData/';
// const DAILY_TOKEN = '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';



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

async function getFileCommits() { // TOKEN will expire daily!
  const url = `https://api.github.com/repos/${owner}/${repo}/commits?path=${encodeURIComponent(resumes_PATH)}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github+json',
        // 'Authorization': `Bearer ${DAILY_TOKEN}`, // Remove if not using a token
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const commits = await response.json();
    const listContainer = document.getElementById('myList');
    const headContainer = document.getElementById('history-title');
    headContainer.append(`Commit History for : ../${resumes_PATH} folder!`);

    commits.forEach(commit => {
      console.log(`${commit.sha.substring(0, 7)}: ${commit.commit.message} (${commit.commit.author.date})`);

      const li = document.createElement('li');
      li.textContent = `${commit.commit.message}`; // Assuming data has a 'name' property
      listContainer.appendChild(li);
    });


  } catch (error) {
    console.error('Failed to fetch commits:', error);
  }
}



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

async function listCommitHistory() {
  const url = `https://api.github.com/repos/felipfinch/pruned/commits`;

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
