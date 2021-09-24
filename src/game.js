
/**
 * @
 */
class Game {
    ents = []

    /**
     * 
     * @param {number} w 
     * @param {number} h 
     * @param {Array} start a place to start from, must be of length w
     * @param {number} ruleset 8-bit number format, such that 0 <= rules <= 255
     */
    constructor(w, h, start, ruleset) {
        // check length of start
        if (start.length != w) {
            throw new Error(`Incompatible seed: the array 'start' must be of the same length as the width, ${w}. You provided an array of length ${start.length}`)
        }

        // ensure ruleset is valid
        if (typeof ruleset != 'number' || (ruleset < 0 || ruleset > 255)) {
            throw new Error("Incompatible ruleset. The ruleset must be an integer r, such that 0 <= r <= 255")
        }

        // ensure width and height values

        if (typeof w != 'number' || w < 0) {
            throw new Error(`Incompatible width ${w}. Width must be a number w, such that 0 < w.`)
        }
        if (typeof h != 'number' || h < 0) {
            throw new Error(`Incompatible height ${h}. Width must be a number h, such that 0 < h.`)
        }

        
        // set instance variables
        this.w = w
        this.h = h

        // store ruleset as a string of binary
        this.ruleset = (ruleset).toString(2).padStart(8, '0')
        
        // create the starting point
        this.ents.push(start)

        // generate the entities
        this.generate()
    }

    generate() {
        // creates a new row according to this.ruleset for the length of this.h
        for (let i=0; i < this.h; i ++) {
            this.generateNextRow()
        }
    }

    generateNextRow() {
        let last_r = this.ents[this.ents.length -1]
        let new_r = new Array(this.w).fill(0)
        for (let i = 0; i < this.w; i++) {
            let parent_left
            let parent_mid
            let parent_right
            if (i==0) { // handle left edge
                parent_left = last_r[last_r.length - 1]
                parent_mid = last_r[i]
                parent_right = last_r[i + 1]
            } else if (i== (this.w - 1)) { // handle right edge
                parent_left = last_r[i - 1]
                parent_mid = last_r[i]
                parent_right = last_r[0]
            } else { // everything in between
                parent_left = last_r[i - 1]
                parent_mid = last_r[i]
                parent_right = last_r[i + 1]
            }
            // get rule to apply
            let ri = parseInt(`${parent_left}${parent_mid}${parent_right}`, 2)
            let new_ent = this.ruleset[7 - ri] // the ruleset is read right to left
            // push ent to new row
            new_r[i] = parseInt(new_ent)

        }
        // create new row
        this.ents.push(new_r)
    }

    getRow(n) {
        return this.ents[n]
    }

    getWidth() {
        return this.w
    }

    getHeight() {
        return this.h
    }
}