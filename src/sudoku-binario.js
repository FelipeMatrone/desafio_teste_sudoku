export const TAMANHO=6;
export class SudokuBinario {
  constructor(grade = Array.from({length:TAMANHO},()=>Array(TAMANHO).fill(null))) { if(grade.length!==TAMANHO||grade.some(l=>l.length!==TAMANHO)) throw new Error('O tabuleiro deve ser 6x6.'); this.grade=grade.map(l=>[...l]); }
  jogar(linha,coluna,valor){ if(![0,1].includes(valor)) throw new Error('Valor deve ser 0 ou 1.'); if(!this.#ok(linha,coluna)) throw new Error('Coordenada fora do tabuleiro.'); if(this.grade[linha][coluna]!==null) throw new Error('Célula já preenchida.'); this.grade[linha][coluna]=valor; if(this.violacoes().length){this.grade[linha][coluna]=null;throw new Error('Jogada viola as regras.');} }
  #ok(l,c){return Number.isInteger(l)&&Number.isInteger(c)&&l>=0&&l<TAMANHO&&c>=0&&c<TAMANHO;}
  violacoes(){ const linhas=this.grade, colunas=Array.from({length:TAMANHO},(_,c)=>linhas.map(l=>l[c])); const falhas=[]; for(const [tipo,faixas] of [['linha',linhas],['coluna',colunas]]) faixas.forEach((faixa,indice)=>{const preenchidos=faixa.filter(v=>v!==null);if(preenchidos.filter(v=>v===0).length>3||preenchidos.filter(v=>v===1).length>3)falhas.push({regra:'balanco',tipo,indice});for(let i=0;i<4;i++)if(faixa[i]!==null&&faixa[i]===faixa[i+1]&&faixa[i]===faixa[i+2])falhas.push({regra:'trio',tipo,indice});}); return falhas; }
  completo(){return this.grade.every(l=>l.every(v=>v!==null));}
}
