# Kanban Server

This app has :

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

&nbsp;

Tech Stack used to build this app :

- Node JS
- Express JS framework
- PostgreSQL

&nbsp;

## Global Responses

> These responses are applied globally on all endpoints

_Response (400 - Bad Request)_

```json
{
  "message": "<bad request message>"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "<unauthorized message>"
}
```

_Response (404 - Data Unavailable)_

```json
{
  "message": "Data not found"
}
```

_Response (500 - Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## RESTful endpoints

### POST /register

> Register user

_Request Header_

```json
not needed
```

_Request Body_

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201)_

```json
{
  "id": "integer",
  "email": "string"
}
```

---

### POST /login

> Login user

_Request Header_

```json
not needed
```

_Request Body_

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200)_

```json
{
  "id": "integer",
  "access_token": "string"
}
```

---

### POST /googleLogin

> Login user use Google Sign In (OAuth)

_Request Header_

```json
not needed
```

_Request Body_

```json
{
  "token": "string"
}
```

_Response (200)_

```json
{
  "id": "integer",
  "access_token": "string"
}
```

---

### GET /tasks

> Get all tasks from all user

_Request Header_

```json
{
  "access_token": "string"
}
```

_Request Body_

```json
not needed
```

_Response (200)_

```json
[
  {
    "id": "integer",
    "title": "string",
    "due_date": "date",
    "CategoryId": "integer",
    "UserId": {
      "id": "integer",
      "email": "string"
    }
  },
  {
    "id": "integer",
    "title": "string",
    "due_date": "date",
    "CategoryId": "integer",
    "UserId": {
      "id": "integer",
      "email": "string"
    }
  }
]
```

---

### POST /tasks

> Create Task

_Request Header_

```json
{
  "access_token": "string"
}
```

_Request Body_

```json
{
  "title": "string",
  "due_date": "date",
  "UserId": "integer",
  "CategoryId": "integer"
}
```

_Response (201)_

```json
{
  "id": "integer",
  "title": "string",
  "due_date": "date",
  "UserId": "integer",
  "CategoryId": "integer"
}
```

---

### PUT /tasks/:id

> Update task's title and due_date

_Request Header_

```json
{
  "access_token": "string"
}
```

_Request Body_

```json
{
  "title": "string",
  "due_date": "date"
}
```

_Response (200)_

```json
{
  "id": "integer",
  "title": "string",
  "due_date": "date",
  "UserId": "integer",
  "CategoryId": "integer"
}
```

---

### PATCH /tasks/:id/category

> Update task's category

_Request Header_

```json
{
  "access_token": "string"
}
```

_Request Body_

```json
{
  "CategoryId": "integer"
}
```

_Response (200)_

```json
{
  "id": "integer",
  "title": "string",
  "due_date": "date",
  "UserId": "integer",
  "CategoryId": "integer"
}
```

---

### DELETE /tasks/:id

> Delete task

_Request Header_

```json
{
  "access_token": "string"
}
```

_Request Body_

```json
not needed
```

_Response (200)_

```json
{
  "message": "Task deleted succesfully"
}
```

---

### GET /categories

> Get all category

_Request Header_

```json
{
  "access_token": "string"
}
```

_Request Body_

```json
not needed
```

_Response (200)_

```json
[
  {
    "id": "integer",
    "title": "string",
    "order": "integer"
  },
  {
    "id": "integer",
    "title": "string",
    "order": "integer"
  }
]
```
