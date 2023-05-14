import {dirname} from 'path';
import {fileURLToPath} from 'url';

// __dirname no está disponible en módulos ES, por lo que necesitamos usar este truco para obtenerlo de la URL del módulo actual (app.js) y luego usarlo para construir la ruta a la carpeta pública (que es un hijo de la carpeta src) desde donde serviremos archivos estáticos (HTML, CSS, JS)
const _dirname = dirname(fileURLToPath(import.meta.url));
// reemplazar "utils" por "public/html" para obtener la ruta a la carpeta pública (public/html)
const __dirname = _dirname.replace("utils", "");

// exportar __dirname para poder usarlo en app.js
export {__dirname};
