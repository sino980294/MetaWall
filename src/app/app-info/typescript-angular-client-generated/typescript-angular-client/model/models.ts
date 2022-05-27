export class userSignUpSearchModel{
  "userName": string
      "email": string
      "password": string
      "userPhoto": string
      "gender": string
}

export class UserSignUpViewModel{
    "status":string
    "data": {
      "token": string,
      "userName": string
    }
}

export class PostViewModel{
  "status":boolean
  "data":{
  "comments": []
  "discussContent": string
  "discussPhoto": string
  "id": string
  "likes": Number
  "tag": string
  "userData": {
              "_id": string
              "userName": string
              "userPhoto": string
              "email": string
            }
  "createAt": string
  "_id":string
}[]
}
