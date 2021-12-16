import bar from './bar';
import column from './column';
import acrossGeogs from './acrossGeogs';
import { Spec } from 'vega';

export const specs: Record<string, Spec> = { bar, column, acrossGeogs };
