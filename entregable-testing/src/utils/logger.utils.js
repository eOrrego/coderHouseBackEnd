import winston from 'winston';

// Definir los niveles de prioridad de los mensajes de log (de menor a mayor prioridad)
const levels = {
    debug: 0,
    http: 1,
    info: 2,
    warn: 3,
    error: 4,
    fatal: 5
};

// Definir los colores de los mensajes de log para cada nivel de prioridad (de menor a mayor prioridad)
const colors = {
    debug: 'blue',
    http: 'green',
    info: 'cyan',
    warn: 'yellow',
    error: 'red',
    fatal: 'magenta'
};

// Definir el formato de los mensajes de log
// const format = winston.format.combine(
//     winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
//     winston.format.printf(
//         (info) => `${info.timestamp} ${info.level}: ${info.message}`
//     )
// );

// Crear el logger de desarrollo
const developmentLogger = winston.createLogger({
    //level: 'debug',
    levels,
    //format,
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                //winston.format.colorize({ all: true }),
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

// Crear el logger de producción
const productionLogger = winston.createLogger({
    //level: 'info',
    levels,
    //format,
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                //winston.format.colorize({ all: true }),
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: 'logs/combined.log'
        })
    ]
});

// Exportar el logger correspondiente según el entorno de ejecución (development o production)
export const logger = (env) => {
    if (env === 'development') {
        return developmentLogger;
    }
    return productionLogger;
}