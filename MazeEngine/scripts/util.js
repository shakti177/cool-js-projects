const rand = (min = 0, max = 1) => {
    return Math.floor((Math.random() * (max - min)) + min)
}

const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const btnToggle = (e) => {
    let btns = document.getElementsByTagName("button")
    let inps = document.getElementsByTagName("input")
    for (let i = 0; i < btns.length; ++i) {
        if (e == 0) {
            btns[i].disabled = true
        } else {
            btns[i].disabled = false
        }
    }
    for (let i = 0; i < inps.length; ++i) {
        if (e == 0) {
            inps[i].disabled = true
        } else {
            inps[i].disabled = false
        }
    }
}

const isPlayerAtFood = () => {
    return (player.x == food.x && player.y == food.y)
}