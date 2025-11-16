import type { PrismTheme } from 'prism-react-renderer';

const lightCodeTheme: PrismTheme = {
  plain: {
    color: '#1D1E1E',
    backgroundColor: '#DEE4E9',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#717374',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#A1A2A3',
      },
    },
    {
      types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol', 'deleted'],
      style: {
        color: '#4970A8',
      },
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
      style: {
        color: '#1675D1',
      },
    },
    {
      types: ['operator', 'entity', 'url', 'variable'],
      style: {
        color: '#1D1E1E',
      },
    },
    {
      types: ['atrule', 'attr-value', 'keyword'],
      style: {
        color: '#1F53C0',
      },
    },
    {
      types: ['function', 'class-name'],
      style: {
        color: '#50C2F6',
      },
    },
    {
      types: ['regex', 'important'],
      style: {
        color: '#50C2F6',
      },
    },
  ],
};

const darkCodeTheme: PrismTheme = {
  plain: {
    color: '#DEE4E9',
    backgroundColor: '#1D1E1E',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#717374',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#A1A2A3',
      },
    },
    {
      types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol', 'deleted'],
      style: {
        color: '#4970A8',
      },
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
      style: {
        color: '#50C2F6',
      },
    },
    {
      types: ['operator', 'entity', 'url', 'variable'],
      style: {
        color: '#DEE4E9',
      },
    },
    {
      types: ['atrule', 'attr-value', 'keyword'],
      style: {
        color: '#1675D1',
      },
    },
    {
      types: ['function', 'class-name'],
      style: {
        color: '#50C2F6',
      },
    },
    {
      types: ['regex', 'important'],
      style: {
        color: '#50C2F6',
      },
    },
  ],
};

export { lightCodeTheme, darkCodeTheme };
