const overview = document.querySelector(".overview"); 
const username = "Kesh-b"; 
const repolist = document.querySelector(".repo-list");
const reposElement = document.querySelector(".repos");
const RepoIndividual = document.querySelector(".repo-data");

const profileData = async function (){
    const request = await fetch(`https://api.github.com/users/${username}`);
    const data = await request.json();
    displayData(data);
};
profileData();

const displayData = function (data) {
        const div= document.createElement("div");
        div.classList.add("user-info");
        div.innerHTML = `
        <figure>
         <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
         <p><strong>Name:</strong> ${data.name}</p>
         <p><strong>Bio:</strong> ${data.bio}</p>
         <p><strong>Location:</strong> ${data.location}</p>
         <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> `; 
        overview.append(div); 
        reposData();
    };

const reposData = async function ()  {
    const requestRepo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const dataRepo = await requestRepo.json();
    repoDisplay(dataRepo);
};

const repoDisplay = function (repos) {
    for (let repo of repos){
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repolist.append(repoItem); 
    }
};

repolist.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        let repoName  = e.target.innerText;
        specificRepoPull(repoName);
        }
    });

    const specificRepoPull = async function(repoName){
        const requestRepoSingle = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        const repoInfo = await requestRepoSingle.json();
        console.log(repoInfo);

        const fetchLanguages = await fetch(repoInfo.languages_url);
        const languageData = await fetchLanguages.json();

        const language = [];
        for (const lang in languageData) {
            language.push(lang); 
        }
        
        specificRepo(repoInfo, language);
    };
    
    const specificRepo = function(repoInfo, language) {
        RepoIndividual.innerHTML = "";
        RepoIndividual.classList.remove("hide");
        reposElement.classList.add("hide")
        const div = document.createElement ("div")
             div.innerHTML = 
                `<h3>Name: ${repoInfo.name}</h3>
                <p>Description: ${repoInfo.discription}</p>
                <p>Default Branch: ${repoInfo.default_branch}</p>
                <p>Languages: ${language.join(", ")}</p>
                <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

                RepoIndividual.append(div);
                
    };
