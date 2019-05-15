# Language-Learning App Back-End

### Git Workflow

Master  <--  Testing  <-->  Development  <--  Review  <-->  Personal Branch

V. 0.1
-> No Sessions
-> No mixed answers


TO-DO
- Write endpoints documentation
  --- Inputs
  --- JSON output
- Convert all helpers to output arrays by default. 
  --- Ensure uniform responses

EXAMPLE ENDPOINT DOCUMENTATION
# api/ <a name="registrationAndLoginEndpoints"></a>

---

#### POST `api/login`

##### Required (unless marked optional):

**Header**: default
**URL Params**: none
**Body**:
email_address: string  OR  username: string
password: string

##### Example Request:

```
Header: default
URL Params: none
Body:
{
    email_address: 'billie@gmail.com',
    password: '123'
}
```

##### Example Response:

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "user_id": 1,
        "username": "billie",
        "email_address": "billie@gmail.com",
        "password": "$2a$08$WEnTr1tMP06.N762rn74rOl.ZHV1o7Sm04.fj5mxdInZJ.R0QH7Sy",
        "created_at": "2019-04-18 03:43:33",
    }
}
```

---

USERS
`/api/users`

SESSIONS
`/api/sessions`

VOCAB
`/api/vocab`

ANSWERS
`/api/answers`