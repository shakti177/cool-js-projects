const generateMaze = async () => {
    let stack = []
    stack.push(cells[0])

    while (stack.length > 0) {

        let pt = stack[stack.length - 1]

        //choose a wall and release it
        let index = pt.y * colLen + pt.x

        // to show tracing of making
        cells[index].status = "gen"
        cells[index].fillColor()

        if (animFlag) {
            await delay(10)
        }
        cells[index].status = null
        cells[index].removeGen()

        // generate array with 4 random(0,4) wall choices
        let arr = []
        while (arr.length < 4) {
            let temp = rand(0, 4)
            if (arr.indexOf(temp) == -1) {
                arr.push(temp)
            }
        }

        // choose one valid wall from arr 
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i] == 0) {
                // for top
                let tempIndex = (pt.y - 1) * colLen + pt.x
                if (pt.y - 1 >= 0 && cells[tempIndex].genVisited == false && pt.border.top) {
                    cells[index].releaseWall("u")
                    cells[tempIndex].releaseWall("d")

                    cells[index].border.top = false
                    cells[index].genVisited = true
                    cells[tempIndex].genVisited = true

                    stack.push(cells[tempIndex])

                    break
                }
            }
            if (arr[i] == 1) {
                // for left
                tempIndex = pt.y * colLen + pt.x - 1
                if (pt.x - 1 >= 0 && cells[tempIndex].genVisited == false && pt.border.left) {
                    cells[index].releaseWall("l")
                    cells[tempIndex].releaseWall("r")

                    cells[index].border.left = false
                    cells[index].genVisited = true
                    cells[tempIndex].genVisited = true

                    stack.push(cells[tempIndex])
                    break
                }
            }
            if (arr[i] == 2) {
                // for bottom
                tempIndex = (pt.y + 1) * colLen + pt.x
                if (pt.y + 1 < rowLen && cells[tempIndex].genVisited == false && pt.border.bottom) {
                    cells[index].releaseWall("d")
                    cells[tempIndex].releaseWall("u")

                    cells[index].border.bottom = false
                    cells[index].genVisited = true
                    cells[tempIndex].genVisited = true

                    stack.push(cells[tempIndex])
                    break
                }
            }
            if (arr[i] == 3) {
                // for right
                tempIndex = pt.y * colLen + pt.x + 1
                if (pt.x + 1 < colLen && cells[tempIndex].genVisited == false && pt.border.right) {
                    cells[index].releaseWall("r")
                    cells[tempIndex].releaseWall("l")

                    cells[index].border.right = false
                    cells[index].genVisited = true
                    cells[tempIndex].genVisited = true

                    stack.push(cells[tempIndex])
                    break
                }
            }
        }

        // if no new cell trace back
        if (stack[stack.length - 1] == pt) {
            stack.pop()
        }

    }
}

const placeFood = () => {
    for (let j = 0; j < rowLen; ++j) {
        for (let i = 0; i < colLen; ++i) {
            let index = j * colLen + i
            if (food.x == i && food.y == j) {
                cells[index].status = "food"
                cells[index].fillColor()
            }

            if (i == player.x && j == player.y) {
                cells[index].status = "player"
                cells[index].fillColor()
            }
        }
    }

}