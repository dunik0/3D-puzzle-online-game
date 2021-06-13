const nick = prompt('Enter a nickname')
document.cookie = `username=${encodeURI(nick)}; SameSite=false`;
console.log(document.cookie)

// function goToLobby() {
//     while (document.querySelector('main')) {
//         document.body.firstChild.remove();
//     }
//     document.querySelector('main').innerHTML = `<label>name:</label>
//                                <input type="text" id="name">
//                                <button onclick="createLobby()">Create</button>`
// }

