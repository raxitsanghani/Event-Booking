const { Parser } = require('json2csv');

const exportToCsv = (data, fields) => {
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);
    return csv;
};

module.exports = exportToCsv;
