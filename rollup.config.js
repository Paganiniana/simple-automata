import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

let default_options = {
    input: "index.js",
}

// ECMAScript variant
let esm_options = {... default_options}
esm_options.output = {
    file: "./dist/esm/index.js",
    format: "es",
    plugins: [
        getBabelOutputPlugin({
            presets: ['@babel/preset-env']
        }),
        uglify()
    ]
}

// ECMAScript variant
let cjs_options = {... default_options}
cjs_options.output = {
    file: "./dist/cjs/index.js",
    format: "cjs",
    plugins: [
        getBabelOutputPlugin({
            presets: ['@babel/preset-env']
        }),
        uglify()
    ]
}


// Vanilla JS variant (used for CDNS)
let iife_options = {... default_options}
iife_options.output = {
    name: "YOUR_NAME", // TODO: automatically generate?
    file: "./dist/cdn/index.js",
    format: "iife",
    plugins: [
        getBabelOutputPlugin({
            presets: ['@babel/preset-env'],
            allowAllFormats:true,
        }),
        uglify()
    ]
}


export default [esm_options, cjs_options, iife_options];