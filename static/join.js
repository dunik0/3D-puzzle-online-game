async function init() {
    const lobbyID = getCookie('lobbyid')
    let response = await fetch('/join', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ lobby: lobbyID, nick: getCookie('username') })
    })
    response = await response.text()
    window.location = "/lobby?id=" + lobbyID;
}
init()
