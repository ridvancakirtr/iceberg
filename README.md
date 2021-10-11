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

| ACTION          | METHOD | URL                         |
| Get Me          | GET    | /api/v1/auth/me             |
| Login User      | POST   | /api/v1/auth/login          |
| Logout User     | POST   | /api/v1/auth/logout         |
| Update Password | PUT    | /api/v1/auth/updatepassword |
| Update Details  | PUT    | /api/v1/auth/updatedetails  |
