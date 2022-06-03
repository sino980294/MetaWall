

export class userSignUpSearchModel  {
  "userName": string
  "email": string
  "password": string
  "userPhoto": string
  "gender": string
}
export class sendCommentSearchModel {
  "comment": string
}

export class UserSignUpViewModel {
  "status": string
  "data": {
    "token": string,
    "userName": string
  }
}

export class PostViewModel {
  "status": boolean
  "data": PostDataViewModel
}
export class PostDataViewModel{
  "posts": PostDatapostsViewModel[]
  "postsLength": number
}
export class  PostDatapostsViewModel{
  "comments": comment[]
    "discussContent": string
    "discussPhoto": string
    "id": string
    "likes": UserInfo[]
    "tag": string
    "userData": UserInfo
    "createAt": Date
    "_id": string
    "isLike":boolean
    "userCommentInput":string
}
export class UserInfo {
  "exp": number
  "iat": number
  "id": string
  "userName": string
  "userPhoto": string
  "_id":string
  "IsCarrier":boolean
}

export class commentsViewModel{
  "status": string
  "data": {
    "comments": comments
  }
}
export class comment{
  "comment": string
  "commentUser": UserInfo
  "post":string
  "_id": string
  "createAt": Date
  "__v": number
  }
  export class comments{
    "comment": string
    "commentUser": string
    "post":string
    "_id": string
    "createAt": Date
    "__v": number
    }
// }
// export class comments{
//   comment: "aaa"
// commentUser:
// createAt: "2022-05-27T16:12:46.348Z"
// email: "Sena@gmail.com"
// userName: "Sena"
// userPhoto: ""
// _id: "6290f87ed5f22368e79e666e"
// [[Prototype]]: Object
// createAt: "2022-05-28T16:06:11.025Z"
// post: "628f48f0e623dbaab05758f5"
// _id: "629248737468fe3bb19dcf9f"
// }
