const req = require.context('../src/Components/', true, /.stories.tsx$/);
import { configure } from '@storybook/react';

configure(() => {
  req.keys().forEach(filename => req(filename));
}, module);