Para fazer com que o NODE entenda ES Modules(Ecma Script Modules) precisa adicionar "types:modules" no "package.json" e com isso substituímos o require pelo import.
Para diferenciar um modulo que é terceiro e um que é interno do node, é preciso que seja adicionado o prefixo "node:" da importação dos módulos internos.

const http = require('http') => import http from 'node:http'