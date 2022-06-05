import { PostDatapostsViewModel, UserInfo } from './../../app-info/typescript-angular-client-generated/typescript-angular-client/model/models';
import { Posts_Service } from '../../app-info/typescript-angular-client-generated/typescript-angular-client/api/posts_.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostViewModel, comment } from 'src/app/app-info/typescript-angular-client-generated/typescript-angular-client/model/models';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { JwtTokenServiceService } from 'src/app/service/jwtTolenService.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  @Input() user_id !:string;
  public postMeaage: PostViewModel = new PostViewModel();
  public SearchPsotSetTimeOut!: ReturnType<typeof setTimeout>;
  public faThumbsUp = faThumbsUp;
  public faEllipsisVertical = faEllipsisVertical;
  public Ilike = false;
  public userInfo !: UserInfo;

  constructor(private postService: Posts_Service, private JwtTokenService: JwtTokenServiceService,
    private router: Router
  ) { }

  searchForm = new FormGroup({
    timeSort: new FormControl('desc'),
    q: new FormControl('')
  })

  ngOnInit() {
    console.log(this.user_id)
    this.getName()
    this.getPosts()
  }


  getSearchPosts() {
    clearTimeout(this.SearchPsotSetTimeOut)
    this.SearchPsotSetTimeOut = setTimeout(() => {
      this.getPosts();
    }, 1000);
  }
  getPosts() {
    this.postService.postsGet(this.searchForm.value.timeSort, this.searchForm.value.q).subscribe({
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
    this.router.navigate(['/userPost', { 'id': id }])
  }
}


