export const TAMANHO = 6;

export class SudokuBinario {
  constructor(grade = Array.from({ length: TAMANHO }, () => Array(TAMANHO).fill(null))) {
    if (!Array.isArray(grade) || grade.length !== TAMANHO || grade.some((l) => !Array.isArray(l) || l.length !== TAMANHO)) throw new Error('O tabuleiro deve ser 6x6.');
    if (grade.flat().some((v) => v !== null && v !== 0 && v !== 1)) throw new Error('Valor deve ser 0, 1 ou vazio.');
    this.grade = grade.map((l) => [...l]);
    this.pistas = grade.map((l) => l.map((v) => v !== null));
  }
  jogar(linha, coluna, valor) {
    if (!this.#ok(linha, coluna)) throw new Error('Coordenada fora do tabuleiro.');
    if (valor !== 0 && valor !== 1 && valor !== null) throw new Error('Valor deve ser 0 ou 1.');
    if (this.pistas[linha][coluna]) throw new Error('Célula é uma pista imutável.');
    if (this.grade[linha][coluna] !== null) throw new Error('Célula já preenchida.');
    const anterior = this.grade[linha][coluna]; this.grade[linha][coluna] = valor;
    if (this.violacoes().length) { this.grade[linha][coluna] = anterior; throw new Error('Jogada viola as regras.'); }
  }
  valor(linha, coluna) { if (!this.#ok(linha, coluna)) throw new Error('Coordenada fora do tabuleiro.'); return this.grade[linha][coluna]; }
  #ok(l, c) { return Number.isInteger(l) && Number.isInteger(c) && l >= 0 && l < TAMANHO && c >= 0 && c < TAMANHO; }
  violacoes() {
    const faixas = [['linha', this.grade], ['coluna', Array.from({ length: TAMANHO }, (_, c) => this.grade.map((l) => l[c]))]];
    const falhas = [];
    for (const [tipo, grupos] of faixas) grupos.forEach((faixa, indice) => {
      const zeros = faixa.filter((v) => v === 0).length, uns = faixa.filter((v) => v === 1).length;
      if (zeros > 3 || uns > 3) falhas.push({ regra: 'balanco', tipo, indice });
      if (faixa.some((v, i) => i < 4 && v !== null && v === faixa[i + 1] && v === faixa[i + 2])) falhas.push({ regra: 'trio', tipo, indice });
      if (!faixa.includes(null) && grupos.some((outra, j) => j < indice && !outra.includes(null) && outra.every((v, i) => v === faixa[i]))) falhas.push({ regra: 'repeticao', tipo, indice });
    }); return falhas;
  }
  completo() { return this.grade.every((l) => l.every((v) => v !== null)); }
  valido() { return this.violacoes().length === 0; }
  resolvido() { return this.completo() && this.valido(); }
}
