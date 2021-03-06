# Todo

## Sign up for API Key

Require field: 

```username```
```password```
```email```

Generate:

```_id```
```_time```
```API Key```: give to user

Example:

```json
{
    username: "allen",
    password: "123456",
    email: "allen@example.com"
}
```

## Router 

```/authenticate```: authenticate user's information
```/user```: register a user

## API Key

To use the API service, you have to use your API key to authenticate, then you'll get a token. The token will be expired in a day, and only your ip is aviliable.
If failed to request the API server, you should resign a token.

## weather.users

`weather.user.username`: save the username

`weather.user.key`: save user's API key

`weather.user.id`: save user's id

`weather.user.<UserID>`: save user's devices' meta and user's information

`weather.device.id`: save user's devices id

`weather.device.<deviceID>`: save device's meta

`weather.device.<deviceID>.field`: device's fields

`weather.device.id`: save all devices' id

`weather.device.userID`: save the devices' owner

## `weather.<id>`

```
{
    username: "admin",
    password: "123456",
    key: "1234567890",
    address: "",
    location: "Neihu"
}
```

## 發送 email

當註冊、新增裝置時要發送電子郵件確認

## Add new Device

```weather.device.<id>```： devices' unique id
```weather.device.user```: devices' owner

Example: 

```json
{
    "name": "Test",
    "location": "NHSH"
}
```

```javascript
{
    location: "",
    createTime: "",
    user: "",
    deviceID: ""
}
```

## God Mode

use the user in `config.json` can modify all device and users.