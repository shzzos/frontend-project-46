#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import gendiff from '../formatters/index.js';

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the current version')
  .option('-f, --format <type>', 'output format', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const param = program.opts().format;
    const result = gendiff(filepath1, filepath2, param);
    console.log(result);
  });

program.parse(process.argv);
