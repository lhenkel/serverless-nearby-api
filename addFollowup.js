var AWS = require('aws-sdk');
var sqs = new AWS.SQS({
    region: 'us-east-2'
});

exports.main = function (event, context, callback) {
    var accountId = context.invokedFunctionArn.split(":")[4];
    var queueUrl = 'https://sqs.us-east-2.amazonaws.com/' + accountId + '/dev-actions';

    // response and status of HTTP endpoint
    var responseBody = {
        message: ''
    };

    // SQS message parameters
    var params = {
        MessageBody: event.body,
        QueueUrl: queueUrl
    };

    sqs.sendMessage(params, function (err, data) {
        var responseCode = 200;
        if (err) {
            console.log('error:', "failed to send message" + err);
            responseCode = 500;
        } else {
            console.log('data:', data.MessageId);
            //responseBody.message = 'Sent to ' + queueUrl;
            responseBody.message = 'Sent to Queue';
            responseBody.messageId = data.MessageId;
        }
        var response = {
            statusCode: responseCode,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(responseBody)
        };

        callback(null, response);
    });
};