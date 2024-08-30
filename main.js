const fs = require('fs');

function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}
function sumColumn(filePath, columnName) {
    readFile(filePath)
        .then((data) => {
            if (!data) {
                throw new Error('CSV file is empty.');
            }

            const rows = data.split('\n');
            const headers = rows[0].split(',');

            const columnIndex = headers.indexOf(columnName);
            if (columnIndex === -1) {
                throw new Error(`Column '${columnName}' not found in the CSV.`);
            }

            let sum = 0;
            for (let i = 1; i < rows.length; i++) {
                const values = rows[i].split(',');
                if (values.length > columnIndex) {
                    sum += parseFloat(values[columnIndex]);
                }
            }

            console.log(`The Sum of ${columnName} is ${sum}`);
        })
        .catch((err) => {
            console.error(err.message);
        });
}
const [,, filePath, columnName] = process.argv;

if (!filePath || !columnName) {
    console.error('Usage: node sumColumn.js <filePath> <columnName>');
    process.exit(1);
}

sumColumn(filePath, columnName);
