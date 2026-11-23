# Desafio de Teste — Sudoku Binário 6 × 6

Casos de teste em JavaScript para um Sudoku binário, também conhecido como Takuzu ou Binairo. O desafio propõe validar uma grade de seis linhas por seis colunas; este repositório inclui um modelo pequeno e determinístico para que as regras possam ser exercitadas automaticamente, sem interface gráfica ou dependências externas.

## Colaborador

| Nome | Participação |
| --- | --- |
| Felipe de Almeida Matrone | Implementação do modelo, cenários de teste e documentação. |

## Como executar

O projeto requer Node.js 18 ou superior. A suíte usa apenas `node:test` e `node:assert/strict`, já incluídos no Node.

```bash
npm test
```

Resultado esperado: **12 testes aprovados**, sem falhas, erros ou dependências para instalar.

## Especificação modelada

### Grade e valores

O tabuleiro possui seis linhas e seis colunas, totalizando 36 células. Cada posição pode ter `0`, `1` ou `null` (vazia). As coordenadas são informadas como `(linha, coluna)` e devem estar entre `0` e `5`.

```text
0 1 . . . .
. . . . . .
. . . . . .
. . . . . .
. . . . . .
. . . . . .
```

O construtor pode receber uma grade inicial. Todo valor diferente de `null` nessa grade é considerado uma **pista** e fica imutável durante a partida.

### Regras verificadas

| Regra | Como é aplicada |
| --- | --- |
| Balanço | Nenhuma linha ou coluna pode conter mais de três `0` ou mais de três `1`. |
| Trio | Três valores iguais consecutivos são proibidos em linhas e colunas. |
| Repetição | Duas linhas completas ou duas colunas completas não podem ser iguais. |
| Coordenadas | Índices fora do intervalo ou não inteiros são recusados. |
| Valores | Valores diferentes de `0`, `1` ou `null` são recusados. |
| Estado atômico | Uma jogada que viola uma regra é desfeita; a célula mantém o valor anterior. |

A regra de repetição é avaliada somente em faixas completas. Duas linhas parcialmente preenchidas iguais ainda podem terminar de maneiras diferentes, portanto não caracterizam erro.

### Estados finais

O modelo separa três conceitos que parecem parecidos, mas não são equivalentes:

| Método | Significado |
| --- | --- |
| `completo()` | todas as 36 células foram preenchidas, independentemente de as regras estarem corretas; |
| `valido()` | nenhuma violação de balanço, trio ou repetição foi encontrada; |
| `resolvido()` | o tabuleiro está completo **e** válido. |

Assim, uma grade cheia com linhas repetidas é `completo()`, mas não é `resolvido()`.

## Modelo testado

O arquivo [`src/sudoku-binario.js`](src/sudoku-binario.js) exporta a constante `TAMANHO` e a classe `SudokuBinario`.

| Membro | Responsabilidade |
| --- | --- |
| `new SudokuBinario(grade?)` | Cria uma grade vazia ou carrega uma grade 6 × 6 com pistas. |
| `jogar(linha, coluna, valor)` | Aplica uma jogada após validar coordenadas, pista, célula e regras. |
| `valor(linha, coluna)` | Consulta uma célula validando os limites. |
| `violacoes()` | Retorna uma lista de objetos com regra, tipo de faixa e índice que falhou. |
| `completo()`, `valido()`, `resolvido()` | Consultam o estado geral da solução. |

Uma violação é representada, por exemplo, por:

```js
{ regra: 'trio', tipo: 'linha', indice: 0 }
```

O dado de retorno permite que os testes confiram exatamente qual regra foi quebrada, em vez de apenas procurar uma mensagem genérica de erro.

## Organização e cobertura dos testes

| Arquivo | Casos | Cenários verificados |
| --- | ---: | --- |
| [`test/sudoku.test.js`](test/sudoku.test.js) | 7 | criação da grade, valores permitidos, coordenadas, célula preenchida, trio, balanço e preenchimento completo |
| [`test/regras-avancadas.test.js`](test/regras-avancadas.test.js) | 5 | pistas imutáveis, repetição de linhas e colunas, atomicidade e diferença entre completo e resolvido |
| **Total** | **12** | regras funcionais, recusas e preservação de estado |

### Exemplos de casos cobertos

- Uma sequência `0 0 0` em uma linha ou coluna é recusada por violar a regra do trio.
- Tentar colocar um quarto `0` ou um quarto `1` em uma faixa é recusado pelo balanço.
- Uma célula fornecida como pista no construtor não pode ser alterada por `jogar`.
- Ao tentar uma jogada inválida, a célula permanece vazia; a tentativa não deixa alteração parcial na grade.
- Linhas repetidas são identificadas apenas quando ambas estão completas.
- Um tabuleiro totalmente preenchido, mas com linhas repetidas, demonstra a diferença entre estar completo e estar resolvido.

## Decisões de escopo

O objetivo desta entrega é testar as regras do tabuleiro. Por isso, não fazem parte do escopo uma interface visual, geração de puzzles, cronômetro, placar ou solucionador automático. Essas funcionalidades podem ser adicionadas em outro ciclo, mas não são necessárias para validar as regras implementadas.

## Estrutura do projeto

```text
desafio_teste_sudoku/
├── src/
│   └── sudoku-binario.js
├── test/
│   ├── sudoku.test.js
│   └── regras-avancadas.test.js
├── package.json
└── README.md
```
