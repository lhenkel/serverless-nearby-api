//import * as uuid from "uuid";
import handler from "./libs/handler-lib";

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });
const ddb = new AWS.DynamoDB();
const ddbGeo = require('dynamodb-geo');

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const config = new ddbGeo.GeoDataManagerConfiguration(ddb, process.env.tableName);
  config.hashKeyLength = 5;
  const myGeoTableManager = new ddbGeo.GeoDataManager(config);

  const latitude = parseFloat(data.lat);
  const longitude = parseFloat(data.lng);
  myGeoTableManager.queryRadius({
    RadiusInMeter: 1000,
    CenterPoint: {
      latitude: latitude,
      longitude: longitude
    }
  })
    .then((locations) => {
      console.log('Locations found: ', locations.length);
      console.log(locations);
      return locations;
    });
  /*
  const params = {
    TableName: process.env.tableName,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'noteId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };
  */

  //await dynamoDb.put(params);
  //return false;
  //return params.Item;
});
