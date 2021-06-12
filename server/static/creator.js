

function createLobby() {
    const name = document.querySelector('#name').value;
    console.log(name)
    fetch('/createLobby', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name })
    })
}
