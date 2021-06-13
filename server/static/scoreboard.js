async function getGameData() {
    const lobbyID = getCookie('lobbyid')
    let response = await fetch('/lobby?id=' + lobbyID, {
        method: "POST"
    })
    response = await response.json()
    console.log(response)
    if (response == 'lobby does not exist') {
        document.querySelector('h1').innerHTML = 'Lobby does not exist'
    } else if (!document.querySelector('#no2')) {
        let players
        if (response.player1Time && response.player2Time) {
            if (response.player1Time < response.player2Time) {
                players = { winner: response.player1, loser: response.player1, winnerTime: response.player1Time, loserTime: response.player2Time }
            } else {
                players = { winner: response.player1, loser: response.player1, winnerTime: response.player1Time, loserTime: response.player2Time }
            }

        } else if (response.player1Time) {
            players = { winner: response.player1, winnerTime: response.player1Time }
        } else if (response.player2Time) {
            players = { winner: response.player2, winnerTime: response.player2Time }
        }

        document.querySelector('#scoreboard').innerHTML = `<tr id="no1"><td>#1</td><td>${players.winner}</td><td>${msToTime(players.winnerTime)}</td></tr>`
        if (players.loser) {
            document.querySelector('#scoreboard').innerHTML += `<tr id="no2"><td>#2</td><td>${players.loser}</td><td>${msToTime(players.loserTime)}</td></tr>`
        }


    } else {
        clearInterval(interval)
    }
}

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60)

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100 && milliseconds >= 10) ? "0" + milliseconds : milliseconds
    milliseconds = (milliseconds < 10) ? "00" + milliseconds : milliseconds

    return minutes + ":" + seconds + "." + milliseconds;
}

getGameData()
let interval = setInterval(() => {
    getGameData()
}, 1000);