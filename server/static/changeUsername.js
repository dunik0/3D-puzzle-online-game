function changeUsername() {
    const nick = prompt('Enter a nickname')
    document.cookie = `username=${encodeURI(nick)}; SameSite=false`;
    console.log(document.cookie)
}