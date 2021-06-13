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

function getCookie(cookieName) {
    const name = cookieName + '='
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let c = cookieArray[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}
init()
