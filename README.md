# Iodine Backend

## General usage
Currently deployed on Heroku: https://iodine.herokuapp.com

## For Development
## Before start
`npm install` 

## Start API server
`nodemon ./bin/www` or `npm start`

## Request Format
### Get Info
`GET http://localhost:3000/asset/info/<asset-ID>`
### Update Status
`POST http://localhost:3000/asset/update`
```
id: <asset-ID>,
condition: "new condition"
```
### Transfer
* Note that assets cannot be double transferred
`POST http://localhost:3000/asset/transfer`
```
id: <asset-ID>
receiver: <receiver-address>,
```
### Publish
`POST http://localhost:3000/asset/publish`
```
name: "Apple",
condition: "Fresh and juicy",
avail: 0    // 0: available, 1: unavailable, 2: removed
```
