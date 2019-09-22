const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
    let errors = [], successes = [];
    
    for (let idx in event.Records) {
        const record = event.Records[idx];
        if (record.eventName === 'REMOVE') {
            const id = record.dynamodb.Keys.id.S;
            if (!id) {
                console.log('no id');
                errors.push(record);
            } else {
                try {
                    await deletePasteFromS3(id);
                    successes.push(id);
                }
                catch (err) {
                    errors.push(err);
                }
            }
        }
    }
    
    return {
        statusCode: 200,
        body: { errors, successes }
    };
};

async function deletePasteFromS3 (id) {
    const params = {
        Bucket: 'pasted',
        Key: id,
    };
    return new Promise(function(resolve, reject) {
        s3.deleteObject(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}
