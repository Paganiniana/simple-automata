class Automata {
    /**
     * 
     * @param {string} target_id 
     * @param {object} options {width, height, start_row, rule}
     */
    constructor(target_id, options) {
        // get target element and create canvas
        let target_container = document.getElementById(target_id)
        target_container.innerHTML = '' // clear contents
        let target_elem = document.createElement('canvas')
        target_container.appendChild(target_elem)

        // create game and board
        this.game = new Game(options.width, options.height, options.start_row, options.rule)
        this.board = new Board(this.game, target_elem)
    }
}