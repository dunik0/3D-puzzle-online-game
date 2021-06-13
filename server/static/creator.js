async function createLobby() {
    const name = document.querySelector('#name').value;
    console.log(name)

    const nick = getCookie('username');
    let response = await fetch('/createLobby', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, player1: nick })
    })
    response = await response.text()
    console.log(response)
    document.cookie = `lobbyid=${encodeURIComponent(response)}; SameSite=false`;
    console.log(document.cookie)
    window.location = `/lobby?id=` + response
}