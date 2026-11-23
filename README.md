# Desafio — Teste de Sudoku Binário

Sudoku binário 6 × 6. Os testes especificam valores permitidos (`0` e `1`), limites,
células imutáveis após preenchimento, balanço de três zeros/três uns e proibição de
três valores iguais consecutivos em linhas e colunas.

```bash
npm test
```

## Especificação e casos de teste

O tabuleiro possui seis linhas e seis colunas. Cada linha e coluna deve conter três
zeros e três uns, sem três valores iguais consecutivos. A suíte testa essas regras,
além de validação de coordenadas, valores permitidos e conclusão do tabuleiro.

## Colaborador

- Felipe Matrone — implementação e casos de teste.
