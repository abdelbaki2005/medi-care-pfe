{
      "name": "sign up",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "multipart/form-data",
            "type": "text"
          }
        ],
        "body": {
          "mode": "formdata",
          "formdata": [
            {
              "key": "email",
              "value": "fettah@gmail.com",
              "type": "text"
            },
            {
              "key": "password",
              "value": "123456",
              "type": "text"
            },
            {
              "key": "fullName",
              "value": "abdelfetah safi",
              "type": "text"
            },
            {
              "key": "userType",
              "value": "doctor",
              "type": "text"
            },
            {
              "key": "speciality",
              "value": "alii",
              "type": "text"
            }
          ]
        },
        "url": {
          "raw": "https://medi-care-vg2a.onrender.com/api/auth/signup",
          "host": [
            "localhost"
          ],
          "port": "3000",
          "path": [
            "api",
            "auth",
            "signup"
          ]
        }
      },
      "response": []
    },
    If the user is Doctor, he must send his certificate, the certificate is a file value that will also be sent with these data and must be either a pdf or photo [jpg, png], when the doctor upload it, it must go to the admin dashboard exactly to the verification overview in the file of the doctor to approve or dennyed him. this is a signUp. the infromations of the user must all go to the end point mentioned in the uri.
    