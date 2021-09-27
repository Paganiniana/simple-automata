class Automata {
    /**
     * 
     * @param {string} target_id 
     * @param {string} seed specifies the type of seed this automata will use – 'simple', 'random', 'interval'
     * @param {object} options {width, height, density?, increment?, starting_row? }
     */
    constructor(target_id, seed, rule, options) {
        // get target element and create canvas
        let target_container = document.getElementById(target_id)
        target_container.innerHTML = '' // clear contents
        let target_elem = document.createElement('canvas')
        target_container.appendChild(target_elem)

        let starting_row
        switch (seed) {
            case 'random':
                // confirm density exists in options
                if (options.hasOwnProperty('density') && typeof options.density == 'number') {
                    starting_row = this.getRandomRow(options.width, options.density)
                } else {
                    throw new Error('To create a random seed, the number options.density must also be provided');
                }
                break;
            case 'simple':
                starting_row = this.getSimpleRow(options.width)
                break;
            case 'interval':
                // TODO
                break;
            default:
                // handle case where 
                throw new Error('')
        }

        // create game and board
        this.game = new Game(options.width, options.height, starting_row, rule)
        this.board = new Board(this.game, target_elem)
    }

    getRandomRow(width, density) {
        if (density > 1 || density < 0) {
            throw new Error('The value density must be a decimal value d such that 0 < d < 1')
        }
        let row = Array(width).fill(0);
        for (let i = 0; i < row.length; i ++) {
            if (Math.random() < density) {
                row[i] = 1
            }
        }
        return row;
    }

    getSimpleRow(width) {
        let row = Array(width).fill(0)
        row[Math.floor(width / 2)] = 1
        return row
    }
}