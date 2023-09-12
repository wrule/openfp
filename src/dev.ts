#!/usr/bin/env node
import path from 'path';
import openfp from '.';

function dev() {
  openfp(path.resolve(process.cwd(), process.argv[2]));
}

dev();
