class Automata {
    /**
     * 
     * @param {string} target_id 
     * @param {object} options {width, height, start_row, rule}
     */
    constructor(target_id, options) {
        // get target element
        let target_container = document.getElementById(target_id)

        // create game and board
        let game = new Game(options.width, options.height, options.start_row, options.rule)
        let board = new Board(game, target_container)
    }
}