import { JwtTokenServiceService } from 'src/app/service/jwtTolenService.service';
import { Users_Service } from './../../app-info/typescript-angular-client-generated/typescript-angular-client/api/users_.service';
import { comment, followerModel, PostViewModel, UserInfo } from './../../app-info/typescript-angular-client-generated/typescript-angular-client/model/models';
import { Posts_Service } from 'src/app/app-info/typescript-angular-client-generated/typescript-angular-client/api/posts_.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { PostDatapostsViewModel } from 'src/app/app-info/typescript-angular-client-generated/typescript-angular-client/model/models';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-userPost',
  templateUrl: './userPost.component.html',
  styleUrls: ['./userPost.component.scss']
})
export class UserPostComponent implements OnInit {
  UserId:string = ''
  postList!:PostDatapostsViewModel[]
  followList:followerModel[] = []
  public postMeaage: PostViewModel = new PostViewModel();
  public SearchPsotSetTimeOut!: ReturnType<typeof setTimeout>;
  public faThumbsUp = faThumbsUp;
  public faEllipsisVertical = faEllipsisVertical;
  public Ilike = false;
  public userInfo !: UserInfo;
  constructor(private ActivatedRoute:ActivatedRoute,private Router:Router,
    private Posts_Service:Posts_Service,private Users_Service:Users_Service,
    private JwtTokenServiceService:JwtTokenServiceService) { }
    searchForm = new FormGroup({
      timeSort: new FormControl('desc'),
      q: new FormControl('')
    })
  ngOnInit() {
    this.getUserPostList()
    this.getFollowList()
    this.getName()
  }
getUserInfo(){

}


  getUserPostList(){
    this.ActivatedRoute.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')
        console.log(id)
        if (id) {
          this.UserId = id.toString();
        } else {
          this.Router.navigate(['/index']);
        }
        return this.UserId;
      }))
      .subscribe();
      this.Posts_Service.postsUserIdGet(this.UserId).subscribe({
        next:res=>{
          console.log(res)
          this.postMeaage.data ={
            posts:res.posts,
            postsLength:res.posts.length
          }
          console.log(this.postMeaage
            )
        },
        error:err=>{
        }
      })

  }
  getFollowList(){
    this.Users_Service.usersFollowGet().subscribe(res=>{

      this.followList = res.data.following;
      console.log(this.followList, res.data.followers)
    })
  }
  checkFollow(id:string){
    if(this.followList.find(x=>x.userData._id == id)){
      return true
    }else{
      return false
    }
  }
  updateUserUrl(UserInfo: UserInfo) {
    UserInfo.userPhoto = './assets/img/login/MetaWall.svg';
  }
  follow(UserInfo:UserInfo){
    if(this.checkFollow(UserInfo._id)){

      this.Users_Service.usersIdFollowDelete(UserInfo._id).subscribe({
        next:res=>{
          this.followList = this.followList.filter(x=>x.userData._id != UserInfo._id)
        }
      })
    }else{
      this.Users_Service.usersIdFollowPost(UserInfo._id).subscribe({
        next:res=>{
          this.followList.push({
            "userData": {...UserInfo,createAt:new Date()},
            "_id":'',
            "createdAt": new Date()

          })
        }
      })
    }

  }

  getSearchPosts() {
    clearTimeout(this.SearchPsotSetTimeOut)
    this.SearchPsotSetTimeOut = setTimeout(() => {
      this.getPosts();
    }, 1000);
  }
  getPosts() {
    this.Posts_Service.postsGet(this.searchForm.value.timeSort, this.searchForm.value.q).subscribe({
      next: res => {

        this.postMeaage = res;
        this.postMeaage.data.posts.map(x => x.userCommentInput = "")
        console.log(this.postMeaage)
      },
      error: err => {
        console.log(err)
      }
    })
  }
  likeThis(posts: PostDatapostsViewModel) {
    this.Posts_Service.postsIdLikesPatch(posts._id).subscribe(res => {
      posts.likes = res.data.likes
      console.log(posts.likes)
    })
  }
  sendComment(posts: PostDatapostsViewModel) {

    this.Posts_Service.postsIdCommentPost(posts.id, {
      "comment": posts.userCommentInput
    }).subscribe({
      next: (res) => {
        posts.userCommentInput = ""
        let comments = new comment();
        let resComment = res.data.comments;
        comments.createAt = resComment.createAt
        comments.comment = resComment.comment
        comments.commentUser = this.userInfo
        posts.comments.push(comments)
      },
      error: (err) => {
        alert(err.message)
      }
    })
  }
  deleteMessage(id: string) {
    this.Posts_Service.postsIdDelete(id).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          alert('刪除成功')
          this.postMeaage.data.posts = this.postMeaage.data.posts.filter(x => x._id != id)
        }
        else
          alert('刪除失敗')
      },
      error: err => {
        alert('刪除失敗')
      }
    })
  }
  EditMessage(id: string) {
    console.log('transfer to postid' + id)
    this.Router.navigate(['/patchPost', { 'id': id }])
  }
  routeToUserPost(id:string){
    this.Router.navigate(['/userPost', { 'id': id }])  .then(() => {
      window.location.reload();
    });;
  }
  Islike(likes: UserInfo[]) {
    return likes.some(x => x._id == this.userInfo.id)

  }
  updateMyUserUrl() {
    this.userInfo.userPhoto = './assets/img/login/MetaWall.svg';
  }
  getName() {
    this.userInfo = this.JwtTokenServiceService.getUserInfo() ?? new UserInfo()
  }
}
