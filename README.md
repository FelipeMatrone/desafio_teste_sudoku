# Desafio de Teste — Sudoku Binário 6 × 6

Modelo testável de Sudoku binário (Takuzu) e casos de teste com o executor nativo do Node. O tabuleiro usa `0`, `1` e `null` para célula vazia.

## Como executar

Requer Node.js 18 ou superior, sem dependências externas.

```bash
npm test
```

## Regras especificadas

- A grade possui seis linhas e seis colunas.
- Cada faixa pode conter no máximo três `0` e três `1`.
- Três valores iguais consecutivos em uma linha ou coluna são proibidos.
- Linhas ou colunas completas não podem ser repetidas.
- Valores recebidos no construtor são pistas: não podem ser alterados pelo jogador.
- Uma jogada inválida restaura a célula ao estado anterior. `completo`, `valido` e `resolvido` diferenciam preenchimento de solução correta.

## Organização da suíte

| Arquivo | Cenários verificados |
| --- | --- |
| `test/sudoku.test.js` | dimensão, valores, limites, balanço, trio e preenchimento |
| `test/regras-avancadas.test.js` | pistas, repetição, atomicidade e solução válida |

## Colaborador

- Felipe Matrone — implementação e casos de teste.
