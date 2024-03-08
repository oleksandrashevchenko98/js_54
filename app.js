require('dotenv').config()

const { dbConnect } = require('./config/db')

const logger = (logType, ...args) => {
    const allowedTypes = {
        local: ['Emergency', 'Alert', 'Critical', 'Error', 'Warning', 'Notice', 'Informational', 'Debug'],
        development: ['Emergency', 'Alert', 'Critical', 'Error', 'Warning', 'Notice'],
        production: ['Emergency', 'Alert', 'Critical', 'Error'],
    };

    if (!Object.keys(allowedTypes).includes(process.env.NODE_ENV)) {
        console.error('Invalid NODE_ENV value');
        return;
    }

    if (!allowedTypes[process.env.NODE_ENV].includes(logType)) {
        console.error(`Invalid logType for NODE_ENV ${process.env.NODE_ENV}`);
        return;
    }
    switch (logType) {
        case 'Emergency':
        case 'Alert':
        case 'Critical':
        case 'Error':
            console.error(`[${logType}] [${process.env.NODE_ENV}]`, ...args);
            break;
        case 'Warning':
        case 'Notice':
        case 'Informational':
        case 'Debug':
            console.log(`[${logType}] [${process.env.NODE_ENV}]`, ...args);
            break;
        default:
            console.error(`Unsupported logType: ${logType}`);
    }
};

logger('Debug', { a: 1, b: 2 });

try {
    fnCal();
    // Error
} catch (err) {
    logger('Error', err.name);
}

let sigintCount = 0;
process.on("SIGINT", () => {
    sigintCount++;
    console.log(`Just Received SIGINT.`);
    if (sigintCount >= 2) {
        console.log('Exiting the process...');
        setTimeout(() => {
            sigintCount = 0;
            console.log('Resetting SIGINT count.');
        }, 3000);
        process.exit(0);
    }
});
setInterval(() => { }, 2000);