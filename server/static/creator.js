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
    // while (document.body.firstChild) {
    //     document.body.firstChild.remove();
    // }
    // document.body.main.innerHTML = `<div id="you"></div>
    // <img src="/assets/vs.jpg" alt="" srcset="">
    // <div id="oponent"></div>`



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