export default class Game {
    constructor() {
        this.startTime = new Date().getTime();
    }
    checkIfDone(elements) {
        let countDoneColumns = 0;
        elements[0].allElements.forEach((el, index) => {
            let countElements = 0
            for (let x in elements) {
                if (elements[x].allElements[index].backgroundColor) {
                    if (el.backgroundColor == elements[x].allElements[index].backgroundColor) {
                        countElements++
                    }
                } else {
                    countElements++
                }
            }

            if (countElements == 3) {
                countDoneColumns++
            }
        })

        if (countDoneColumns == 6) {
            this.end()
        }
    }
    async end() {
        const endTime = new Date().getTime();
        const time = endTime - this.startTime;
        const lobbyID = this.getCookie('lobbyid')
        await fetch('/end', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                lobby: lobbyID,
                nick: this.getCookie('username'),
                time: time
            })
        })
        location.href = '/scoreboard?id=' + lobbyID
    }
    getCookie(cookieName) {
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
}