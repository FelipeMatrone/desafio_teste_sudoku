import test from 'node:test';import assert from 'node:assert/strict';import {SudokuBinario,TAMANHO} from '../src/sudoku-binario.js';
test('cria grade binária 6x6',()=>{const s=new SudokuBinario();assert.equal(s.grade.length,TAMANHO);assert.equal(s.grade[0].length,TAMANHO);});
test('aceita jogada 0 ou 1',()=>{const s=new SudokuBinario();s.jogar(0,0,0);s.jogar(0,1,1);assert.deepEqual(s.grade[0].slice(0,2),[0,1]);});
test('recusa outro valor, coordenada inválida e célula preenchida',()=>{const s=new SudokuBinario();assert.throws(()=>s.jogar(0,0,2));assert.throws(()=>s.jogar(6,0,0));s.jogar(0,0,0);assert.throws(()=>s.jogar(0,0,1));});
test('recusa três valores iguais seguidos na linha',()=>{const s=new SudokuBinario([[0,0,null,null,null,null],...Array.from({length:5},()=>Array(6).fill(null))]);assert.throws(()=>s.jogar(0,2,0),/viola/i);});
test('recusa três valores iguais seguidos na coluna',()=>{const s=new SudokuBinario([[1,null,null,null,null,null],[1,null,null,null,null,null],...Array.from({length:4},()=>Array(6).fill(null))]);assert.throws(()=>s.jogar(2,0,1),/viola/i);});
test('recusa mais de três valores iguais em uma faixa',()=>{const s=new SudokuBinario([[0,0,0,null,null,null],...Array.from({length:5},()=>Array(6).fill(null))]);assert.throws(()=>s.jogar(0,3,0));});
test('identifica tabuleiro completo',()=>{const linhas=[[0,1,0,1,0,1],[1,0,1,0,1,0],[0,1,0,1,0,1],[1,0,1,0,1,0],[0,1,0,1,0,1],[1,0,1,0,1,0]];assert.equal(new SudokuBinario(linhas).completo(),true);});
