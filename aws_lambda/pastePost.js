const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

exports.handler = async (event) => {
    const sanitizedPaste = errorCheck(event.paste)

    let uniqueId, doesIdExist, attempts = 0;
    do {
        uniqueId = generateUniqueId();
        doesIdExist = await checkDBForId(uniqueId);
        if (attempts++ > 10) {
            return {
                statusCode: 507,
                body: 'Could not get an unused ID after 10 attempts.'
            }
        }
    } while (doesIdExist);
    
    try {
        await createDynamoDBEntry(uniqueId);
        await storePasteToS3(uniqueId, sanitizedPaste);
    }
    catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }

    return {
        statusCode: 200,
        body: {
            id: '/' + uniqueId,
            text: sanitizedPaste
        },
    };    
};


function errorCheck(input) {
     return input;
 }

function generateUniqueId() {
	const uuidv4 = require('uuid/v4');
	const valid =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const id = uuidv4();
	let uniqueId = '';
	for (let i = 0; i < id.length; i++) {
		if (valid.includes(id.charAt(i))) {
			uniqueId = uniqueId.concat(id.charAt(i));
		}
		if (uniqueId.length >= 5) {
			return uniqueId;
		}
	}
}

async function checkDBForId(id) {
	const params = {
		TableName: 'paste',
		KeyConditionExpression: '#id = :uid',
		ExpressionAttributeNames: {
			'#id': 'id'
		},
		ExpressionAttributeValues: {
			':uid': id
		}
	};
	return new Promise(function(resolve, reject) {
		dynamo.query(params, function(err, data) {
			if (err) {
				reject(err);
			} else if (data.Items.length > 0) {
					resolve(true);
				} else {
					resolve(false);
				}
		});
	});
}

async function createDynamoDBEntry (id) {
    const params = {
        TableName: 'paste',
        Item: {
            "id": id,
            "expiry": Math.floor(Date.now()/1000) + 172800
        }
    };
    return new Promise(function(resolve, reject) {
        dynamo.put(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

async function storePasteToS3 (id, paste) {
    const params = {
        Bucket: 'pasted',
        Key: id,
        Body: paste, 
        ContentType: 'text/plain',
        ACL: "public-read"
    };
    return new Promise(function(resolve, reject) {
        s3.putObject(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}
