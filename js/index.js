document.addEventListener("DOMContentLoaded", () => {

// document variable setup 
const form = document.querySelector('form')
const formText = document.getElementById('search')
const userList = document.getElementById('user-list')
const reposList = document.getElementById('repos-list')

// variable tests:
console.log(form, userList, reposList, formText)


// listen for submit click 
form.addEventListener('submit', e => {
    e.preventDefault();

    // event trigger test 
    // console.log('i got got')

    const input = e.target[0].value
    fetchUsers(input)


});

// functions 

// takes input from form and fetches those users from API
function fetchUsers(users) {
    fetch(`https://api.github.com/search/users?q=${users}`, {
        method: 'GET',
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
    })
    .then((resp) => resp.json())
    .then((json) => addToDOM(json))
}

// takes response from fetch and adds to DOM
function addToDOM(obj) {
    // console.log(array.items)
    const returnArray = obj.items
    console.log(returnArray)
    for (const key in returnArray) {

        //grabbing each username, id, image 
        const username = returnArray[key].login;
        const userID = returnArray[key].id;
        const avaURL = returnArray[key].avatar_url

        //creating elements 
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = avaURL;
        img.id = username;
        const h2 = document.createElement('h2');
        h2.className = '1';
        h2.id = username;
        li.addEventListener('click', e => {
            const targetUsername = e.target.id
            fetch(`https://api.github.com/users/${targetUsername}/repos`, {
                method: 'GET',
                headers: {
                    Accept: "application/vnd.github.v3+json"
                }
            })
            .then((resp) => resp.json())
            .then((json) => {
                const newUL = document.createElement('ul')
                for (const key in json) {
                    const url = json[key].html_url             
                    const newLI = document.createElement('li')
                    newLI.innerText = url
                    newUL.appendChild(newLI)}
                li.append(newUL)
        
            })}
        )
        const p2 = document.createElement('p');
        p2.className = '2';
        h2.append(`username: ${username}\n`);
        p2.append(img);
        li.append(h2);
        li.append(p2);
        li.id = username;
        userList.appendChild(li)
    }
    
    function addRepo(e) {
        console.log(e)
    }
}



})