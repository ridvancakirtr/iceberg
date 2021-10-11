# ICEBERG DIGITAL

API was developed for iceberg digital. Javascript NodeJS,MongoDB backend technologies were used in the background.

API organized around REST and GET,PUT,POST HTTP method used. POST and GET methods must be json.


The properties of the variables used are listed below.


| Variable      | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `name`        | type: String - required: true - maxlength: 50                |
| `surname`     | type: String - required: true - maxlength: 50                |
| `email`       | type: String - required: true - maxlength: 50                |
| `phone`       | type: String - required: true                                |
| `gender`      | enum: ['MALE', 'FEMALE']                                     |
| `password`    | type: String - required: true - minlength: 6 - maxlength: 50 |
| `dateTime`    | type: Date                                                   |
| `appointmentAddress`    | type: String - maxlength: 6                        |
| `realEstateAddress`     | type: String - maxlength: 6                        |
| `distance`              | type: String                                       |
| `timeLeaveOffice`       | type: Date                                         |
| `timeArrivalOffice`     | type: Date                                         |


## Authentication

| ACTION          | METHOD | URL                         | EXAMPLE JSON |
| --------------- | ------ | --------------------------- | ----         |
| Get Me          | GET    | /api/v1/auth/me             ||
| Login User      | POST   | /api/v1/auth/login          | ``` { "email": "iceberg@gmail.com", "password": "123456" } ``` |
| Logout User     | POST   | /api/v1/auth/logout         ||
| Update Password | PUT    | /api/v1/auth/updatepassword | ``` {"currentPassword": "123456","newPassword": "123456"} ``` |
| Update Details  | PUT    | /api/v1/auth/updatedetails  | ``` {"email": "iceberg@gmail.com","name": "Marry","surname": "Done","gender":"MALE"} ``` |

## Users

| ACTION               | METHOD | URL                         | EXAMPLE JSON |
| -------------------- | ------ | --------------------------- | ------------ |
| Create User          | POST   | /api/v1/users/              | ``` {"name": "Jhon","surname": "Doe","email": "iceberg@gmail.com","gender": "MALE","password":"123456"} ``` |
| Get All Users        | GET    | /api/v1/users/              |  |
| Get Single Users     | GET    | /api/v1/users/:userId       |  |
| Update  Single Users | PUT    | /api/v1/users/:userId       | ``` {"name": "Jhon","surname": "Doe","email": "iceberg@gmail.com","gender": "MALE","password":"123456"} ``` |
| Delete  Single Users | DEL    | /api/v1/users/:userId        |  |

## Appointments

| ACTION                 | METHOD | URL                         | EXAMPLE JSON |
| --------------------   | ------ | --------------------------- | ------------ |
| Create Appointments    | POST   | /api/v1/appointments/       | ``` {"customer": {"name": "John","surname": "Doe",            "phone": "5469189000","email":"customer1@gmail.com","gender": "MALE"},"appointment": {"dateTime": "2016-05-18T16:00:00Z","appointmentAddress": "OX495NU",            "realEstateAddress": "CM27PJ"} } ``` |
| Get All Appointments   | GET    | --------------------------- | ------------ |
| Get Single Appointment | GET    | --------------------------- | ------------ |
| Get User Appointment   | GET    | --------------------------- | ------------ |
| Update Appointment     | PUT    | --------------------------- | ------------ |
| Delete Appointment     | DEL    | --------------------------- | ------------ |

