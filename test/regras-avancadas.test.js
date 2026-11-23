import test from 'node:test';
import assert from 'node:assert/strict';
import { SudokuBinario } from '../src/sudoku-binario.js';

const vazia = () => Array.from({ length: 6 }, () => Array(6).fill(null));
test('preserva pistas recebidas na construção', () => { const g = vazia(); g[0][0] = 1; const s = new SudokuBinario(g); assert.throws(() => s.jogar(0, 0, 0), /pista/i); assert.equal(s.valor(0, 0), 1); });
test('detecta linhas repetidas somente quando completas', () => { const g = [[0,1,0,1,0,1], [0,1,0,1,0,1], ...vazia().slice(2)]; const s = new SudokuBinario(g); assert.deepEqual(s.violacoes(), [{ regra: 'repeticao', tipo: 'linha', indice: 1 }]); });
test('detecta colunas repetidas completas', () => { const g = vazia(); for (let i = 0; i < 6; i++) { g[i][0] = i % 2; g[i][1] = i % 2; } const s = new SudokuBinario(g); assert.ok(s.violacoes().some((v) => v.regra === 'repeticao' && v.tipo === 'coluna')); });
test('jogada inválida não modifica a grade', () => { const s = new SudokuBinario(); s.jogar(0, 0, 0); s.jogar(0, 1, 0); assert.throws(() => s.jogar(0, 2, 0)); assert.equal(s.valor(0, 2), null); });
test('distingue tabuleiro completo de resolvido', () => { const g = Array.from({ length: 6 }, () => [0,1,0,1,0,1]); const s = new SudokuBinario(g); assert.equal(s.completo(), true); assert.equal(s.resolvido(), false); });
