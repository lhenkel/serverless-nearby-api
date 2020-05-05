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

  const locations = await myGeoTableManager.queryRadius({
    RadiusInMeter: 5000,
    CenterPoint: {
      latitude: latitude,
      longitude: longitude
    }
  });
  return locations;
});
