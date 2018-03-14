# Iodine Backend

## Start API server
`nodemon ./bin/www`

## Request Format
### Get Info
`GET http://localhost:3000/asset/info/<asset-ID>`
### Update Status
`POST http://localhost:3000/asset/update`
```
id: <asset-ID>,
status: "new status"
```
### Transfer
`POST http://localhost:3000/asset/transfer`
```
id: <asset-ID>
receiver: <receiver-address>,
```
### Publish
`POST http://localhost:3000/asset/publish`
```
name: "Apple",
status: "Fresh and juicy",
avail: true
```
