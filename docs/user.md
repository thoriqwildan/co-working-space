# User Spec

## Login User

Endpoint : POST /auth/login

Request Body :

```json
{
    "email": "test@example.com",
    "password": "test"
}
```

Response Body (success) :

```json
{
    "message":"Login Successfully",
    "token": "generated-token",
    "user": {
        "id": 1,
        "name": "test",
        "email": "test@example.com",
        "role": "user"
    }
}
```

Response Body (error):

```json
{
    "message": "Invalid email or password"
}
```



## Logout User

Endpoint : POST /auth/logout

Response Body (success):

```json
{
    "message": "Logout Successfully"
}
```



## Forgot Password

Endpoint : POST /auth/forgot-password

Request Body:

```json
{
    "email": "test@example.com"
}
```

Response Body (success):

```json
{
    "message": "Password reset link sent to email"
}
```



## Reset Password

Endpoint : POST /auth/reset-password

Headers:

- Set-Cookie : access_token=generated_token

Request Body:

```json
{
    "new_password": "testnew",
    "confirm_new_password": "testnew"
}
```

Response Body (success):

```json
{
    "message": "Password reset Successfully"
}
```



# User Management

## Get current User Profile

Endpoint : GET /users/me

Response Body:

```json
{
    "id": 1,
    "name": "test",
    "email": "test@example.com",
    "role": "user",
    "avatar": "https://example.com/avatar.jpg",
    "created_at": "2024-02-01T12:00:00Z"
}
```



## Update User Profile

Endpoint : PATCH /users/me

Request Body:

```json
{
    "name": "test new",
}
```

Response Body (success):

```json
{
    "message": "Profile updated successfully",
    "user": {
        "id": 1,
        "name": "test new",
        "email": "test@example.com",
        "avatar": "https://example.com/avatar.jpg"
    }
}
```



## Change Password

Endpoint : PATCH /users/change-password

Request Body:

```json
{
    "current_password": "test",
    "new_password": "testpassword",
    "confirm_new_password": "testpassword"
}
```

Response Body (success):

```json
{
    "message": "Password changed successfully"
}
```



## Upload Profile Picture

Endpoint : POST /users/me/avatar

Request Body:

- file JPG, PNG, or JPEG

Response Body (success):

```json
{
    "message": "Avatar changed successfully"
}
```



# Admin User Management (role: admin)

## Get All users

Endpoint : GET /admin/users

Response Body (success):

```json
{
    "users": [
        {
            "id": 1,
            "name": "test",
            "email": "test@example.com",
            "role": "user",
            "created_at": "2024-02-01T12:00:00Z"
        },
        {
            "id": 1,
            "name": "test",
            "email": "test@example.com",
            "role": "user",
            "created_at": "2024-02-01T12:00:00Z"
        },
    ]
}
```



## Delete User

Endpoint : DELETE /admin/users/:id

Response Body (success):

```json
{
    "message": "User deleted successfully"
}
```



## Assign Role to User

Endpoint : PATCH /admin/users/:id/role

Request Body:

```json
{
    "role": "admin"
}
```

Response Body (success):

```json
{
    "message": "User role updated successfully",
    "users": {
        "id": 1,
        "name": "test",
        "email": "test@example.com",
        "role": "admin"
    }
}
```


