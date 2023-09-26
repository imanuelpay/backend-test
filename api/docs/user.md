# User API Docs

## Register

Endpoint :  POST /register

Request Body :

```json
{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "Test123"
}
```

Response Body Success :

```json
{
  "message": "user registered successfully"
}
```

Response Body Error Validation:

```json
{
  "message": "email must be a valid email"
}
```

Response Body Error User Exist:

```json
{
  "message": "email already exists"
}
```

## Login

Endpoint : POST /login

Request Body :

```json
{
  "email": "johndoe@gmail.com",
  "password": "Test123"
}
```

Response Body Success :

```json
{
  "payload": {
    "accessToken": "jwt_token",
    "refreshToken": "uuid_token"
  }
}
```

Response Body Error :

```json
{
  "errors": "username or password wrong"
}
```

Response Body Error Validation:

```json
{
  "message": "email must be a valid email"
}
```

## Refresh Token

Endpoint : POST /refresh-token

Request Body :

```json
{
  "token": "uuid_token"
}
```

Response Body Success :

```json
{
  "payload": {
    "accessToken": "jwt_token",
    "refreshToken": "uuid_token"
  }
}
```

Response Body Error :

```json
{
  "message": "token invalid"
}
```

Response Body Error Expired Refresh Token :

```json
{
  "message": "refresh token was expired"
}
```

## Get Profile

Endpoint : GET /profile

Headers :

- Authorization : Bearer {token}

Response Body Success:

```json
{
  "payload": {
    "name": "John Doe",
    "email": "johndoe@gmail.com"
  }
}
```

Response Body Error :

```json
{
  "message": "unauthorized"
}
```

Response Body Error Expired Token :

```json
{
  "message": "unauthorized, access token was expired"
}
```

## Update Profile

Endpoint : PUT /profile

Headers :

- Authorization : Bearer {token}

Request Body :

```json
{
  "name": "John",
  // optional
  "email": "new@email.com",
  // optional
  "password": "new password"
  // optional
}
```

Response Body Success :

```json
{
  "message": "profile updated successfully"
}
```

Response Body Error Validation :

```json
{
  "message": "name length must be less than or equal to 100 characters long"
}
```

Response Body Error Expired Token :

```json
{
  "message": "unauthorized, access token was expired"
}
```
