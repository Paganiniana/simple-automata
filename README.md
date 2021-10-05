# Simple Automata

*Simple Automata* is a library for creating simple cellular automata anywhere you can run JavaScript. It supports a two dimensional environment where each block (or "cell") is an automata. Going from top to bottom, each row is generated based on the state of the previous row. Using this library, you have a choice of 256 different rules and various starting conditions. 

## Installation

This library should run anywhere you can run JavaScript. More specifically, if you can use a JS Canvas, you can use this library. You can imbed it directly in a page or install it via NPM.

*Direct Injection (CDN)*

```
<script src = "https://cdn.jsdelivr.net/npm/simple-automata@latest/dist/cdn/index.js"/>
```

*NPM*

```
npm install --save simple-automata
```

## Usage

To create an automata, just specify the *id* of the element you want it to appear in, the type of start condition, the rule you want to use, and any necessary options. Note: an instance of the *Automata* class will fill to fit the size of its container. Therefore, you should style the container's CSS appropriately.

```
// in an NPM environment ...
import Automata from 'simple-automata';

// ... then when you have it available

let auto = new Automata(
    my_container_id, 
    rule_type, 
    rule_num,
    options
)
```

## Options

As stated above, the *Automata* class gives you many options. The most important ones have to do with the starting condition. All options objects require a height and a width, like so.

```
let auto = new Automata(
    'test-id', 
    'simple', 
    30, 
    {
        width: 50,
        height: 50,
})
```

However, if you decide to live on the wild side and opt for a 'random' starting condition, like so, you have to include a *density* property in your options object.

```
let auto = new Automata(
    'test-id', 
    'random', 
    30, 
    {
        width: 50,
        height: 50,
        density: 0.5,
})
```