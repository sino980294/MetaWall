import { Users_Service } from './../../app-info/typescript-angular-client-generated/typescript-angular-client/api/users_.service';
import { followerModel, PostDatapostsViewModel, UserInfo } from './../../app-info/typescript-angular-client-generated/typescript-angular-client/model/models';
import { Posts_Service } from '../../app-info/typescript-angular-client-generated/typescript-angular-client/api/posts_.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostViewModel, comment } from 'src/app/app-info/typescript-angular-client-generated/typescript-angular-client/model/models';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { JwtTokenServiceService } from 'src/app/service/jwtTolenService.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  followList:followerModel[] = []
 public user_id:string = ""
  public postMeaage: PostViewModel = new PostViewModel();
  public SearchPsotSetTimeOut!: ReturnType<typeof setTimeout>;
  public faThumbsUp = faThumbsUp;
  public faEllipsisVertical = faEllipsisVertical;
  public Ilike = false;
  public userInfo !: UserInfo;
  public selectedUserInfo!:UserInfo
  constructor(private postService: Posts_Service, private JwtTokenService: JwtTokenServiceService,
    private router: Router,private ActivatedRoute : ActivatedRoute,private Users_Service:Users_Service
  ) { }

  searchForm = new FormGroup({
    timeSort: new FormControl('desc'),
    q: new FormControl(''),
    queryUser:new FormControl('')
  })

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    console.log(this.user_id)
    this.getName()
    this.getUserParam()
    this.getPosts()
  }
  getFollowList(){
    this.Users_Service.usersFollowGet().subscribe(res=>{

      this.followList = res.data.following;
      console.log(this.followList, res.data.followers)
    })
  }
getUserParam(){
  this.ActivatedRoute.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id')
      console.log(id)
      if (id) {
        this.user_id = id.toString();
      }
      return this.user_id;
    }))
    .subscribe();
    if(this.user_id != ""){
      this.getFollowList()
this.Users_Service.usersAdminGetUserIdGet(this.user_id).subscribe(res=>{
  console.log(res)
  this.selectedUserInfo = res.data;
})
      this.searchForm.patchValue({queryUser:this.user_id})
    }
}

  getSearchPosts() {
    clearTimeout(this.SearchPsotSetTimeOut)
    this.SearchPsotSetTimeOut = setTimeout(() => {
      this.getPosts();
    }, 1000);
  }
  getPosts() {

    this.postService.postsGet(this.searchForm.value.timeSort, this.searchForm.value.q,this.searchForm.value.queryUser).subscribe({
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
  updateUserUrl(UserInfo: UserInfo) {
    UserInfo.userPhoto = './assets/img/login/MetaWall.svg';
  }
  updateMyUserUrl() {
    this.userInfo.userPhoto = './assets/img/login/MetaWall.svg';
  }
  likeThis(posts: PostDatapostsViewModel) {
    this.postService.postsIdLikesPatch(posts._id).subscribe(res => {
      posts.likes = res.data.likes
      console.log(posts.likes)
    })
  }
  getName() {
    this.userInfo = this.JwtTokenService.getUserInfo() ?? new UserInfo()
  }
  sendComment(posts: PostDatapostsViewModel) {

    this.postService.postsIdCommentPost(posts.id, {
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
    this.postService.postsIdDelete(id).subscribe({
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
    this.router.navigate(['/patchPost', { 'id': id }])
  }

  Islike(likes: UserInfo[]) {
    return likes.some(x => x._id == this.userInfo.id)

  }
  routeToUserPost(id:string){
    this.router.navigate(['/index', { 'id': id }]) .then(() => {
      window.location.reload();
    });
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
  checkFollow(id:string){
    if(this.followList.find(x=>x.userData._id == id)){
      return true
    }else{
      return false
    }
  }
}


