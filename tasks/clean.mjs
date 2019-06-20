import del from 'del';

export default config => () => del(config.src);
