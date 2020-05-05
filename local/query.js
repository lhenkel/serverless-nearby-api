'use strict'

// Run 'node query' to see how many Starbucks are within 1km (0.6 miles) of a location in NYC.

const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-2' })

const ddb = new AWS.DynamoDB()
const ddbGeo = require('dynamodb-geo')

const config = new ddbGeo.GeoDataManagerConfiguration(ddb, 'dev-nearby')
config.hashKeyLength = 5

const myGeoTableManager = new ddbGeo.GeoDataManager(config)
/*
    "lat": 61.21759217,
      "lng": -149.8935557
*/
myGeoTableManager.queryRadius({
  RadiusInMeter: 5000,
  CenterPoint: {
    latitude: 61.21759217,
    longitude: -149.8935557
  }
})
  .then((locations) => {
    console.log('Locations found: ', locations.length)
    console.log(locations)
  })