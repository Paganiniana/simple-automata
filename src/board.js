class Board {
    canvas_width
    canvas_height
    ent_color = "rgba(0, 0, 0, 1)"

    /**
     * 
     * @param {Game} game 
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(game, canvas) { // TODO: Add options for variably sized display
        // store game and canvas
        this.game = game
        this.canvas = canvas
        this.canvas_height = canvas.height // duplicating effort?
        this.canvas_width = canvas.width // duplicating effort?

        // set resize listener
        this.setResizeListener()
        this.setCanvasSize()

        // start rendering 
        this.refresh()
    }

    /**
     * @description sets the width of the canvas to the width of its containing element
     */
    setCanvasSize() {
        let container_rect = this.canvas.parentElement.getBoundingClientRect()
        this.canvas.width = container_rect.width
        this.canvas.height = container_rect.height
        this.canvas_height = this.canvas.height 
        this.canvas_width = this.canvas.width
    }

    /**
     * @description used once, listens for changes to the viewport width and repaints the canvas ONLY if it has changed sizes
     */
    setResizeListener() {
        document.addEventListener('resize', () => {
            this.setCanvasSize()
            // only refresh if the canvas has changed size
            if (this.canvas_height !== this.canvas.height || this.canvas_width != this.canvas.width) {
                // replace instance variables
                this.canvas_width = this.canvas.width
                this.canvas_height = this.canvas.height

                // refresh
                this.refresh()
            }
        })
    }


    // TODO
    // /**
    //  * @description Replaces instance variable game and repaints — should only be used for changes in width/height, not changes in 
    //  */
    // replaceGame(g) {
    //     this.game = g
    //     this.refresh()
    // }

    /**
     * @description Uses this.canvas_width and this.canvas_height to paint Game onto the canvas when (1) the game is updated or (2) the canvas changes width
     */
    refresh() {
        // setup context & color
        let ctx = this.canvas.getContext('2d')
        ctx.fillStyle = this.ent_color
        // get block size
        let block_width = this.canvas_width / this.game.getWidth()

        // y iterator
        for (let y = 0; y < this.game.getHeight(); y ++) {
            let row = this.game.getRow(y)
            for (let i =0; i < row.length; i ++) {
                if (row[i]) {
                    console.log(`Printing row ${y}, block ${i}`)
                    let canvas_x = (i * block_width)
                    let canvas_y = (y * block_width)
                    ctx.fillRect(canvas_x, canvas_y, block_width, block_width)
                    // debugger
                }
            }
        }

    }
}