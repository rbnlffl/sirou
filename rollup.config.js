import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import serve from 'rollup-plugin-serve';
import pkg from './package.json';


export default [{
    input: pkg.main,
    output: {
        sourcemap: true,
        file: 'dist/sr.esm.js',
        format: 'es'
    },
    plugins: [
        typescript(),
        babel()
    ]
}, {
    input: pkg.main,
    plugins: [
        eslint(),
        typescript(),
        resolve(),
        commonjs(),
        babel(),
        terser(),
        serve()
    ],
    output: {
        sourcemap: true,
        file: 'dist/sr.umd.js',
        format: 'umd',
        name: 'Sr'
    }
}];
