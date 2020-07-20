const usersElement = document.querySelector('#users');
const followersElement = document.querySelector('#follower');

function createUser(users, parentElement) {
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add('userElement');
        const userImg = document.createElement('img');
        const userLogin = document.createElement('h3');
        const userPage = document.createElement('a');
        const followerButton = document.createElement('button');
        followerButton.addEventListener('click', function () {
            showFollowers();
            getFollowers(user.login);
            getFollowers('');
        })
        followerButton.innerHTML = 'Followers';
        followerButton.target = '_blank';
        userPage.target = '_blank';
        userLogin.innerText = user.login;
        userImg.src = user.avatar_url;
        userPage.href = user.html_url;

        userElement.appendChild(userImg);
        userElement.appendChild(userPage);
        userPage.appendChild(userLogin);
        userElement.appendChild(followerButton);

        parentElement.appendChild(userElement);

    })
}

function getUsers() {
    fetch(`https://api.github.com/users`)
        .then(res => res.json())
        .then(data => {
            createUser(data, usersElement);
        })
        .catch(e => console.log(e))
}

function getFollowers(login) {
    fetch(`https://api.github.com/users/${login}/followers`)
        .then(res => res.json())
        .then(followers => {
            createUser(followers, followersElement)
        })
        .catch(e => console.log(e))
}

function showFollowers() {
    document.getElementById('follower').style.display = 'block';
}

function cancelFollower() {
    document.getElementById('follower').style.display = 'none';
    followersElement.innerHTML = '<img src = "Cancel.png" id = "cancelIcon" onclick="cancelFollower()"></img>'
}

getUsers();
