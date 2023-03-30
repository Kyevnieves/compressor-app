import path from 'path'
const __dirname = path.dirname(new URL(import.meta.url).pathname);
export const dirname = __dirname.substr(1)
