const overview = document.querySelector(".overview"); 
const username = "Kesh-b"; 
const repolist = document.querySelector(".repo-list");

const profileData = async function (){
    const request = await fetch(`https://api.github.com/users/${username}`);
    const data = await request.json();
    console.log(data);
    displayData(data);
};
console.log(profileData);
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
console.log(reposData);

const repoDisplay = function (repos) {
    for (let repo of repos){
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repolist.append(repoItem); 
    }
};