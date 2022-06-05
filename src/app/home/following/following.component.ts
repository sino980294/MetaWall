import { followerModel } from './../../app-info/typescript-angular-client-generated/typescript-angular-client/model/models';
import { ActivatedRoute, Router } from '@angular/router';
import { Posts_Service } from 'src/app/app-info/typescript-angular-client-generated/typescript-angular-client/api/posts_.service';
import { Users_Service } from './../../app-info/typescript-angular-client-generated/typescript-angular-client/api/users_.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {

  public UserId = ''
  public followList !: followerModel[]
  constructor( private Users_Service:Users_Service,private Posts_Service:Posts_Service,
    private ActivatedRoute:ActivatedRoute,private Router:Router) { }

  ngOnInit() {
    this.getFollowingList();
  }
  getFollowingList(){
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
      })).subscribe(id=>{

      });
      this.Users_Service.usersFollowGet().subscribe({
        next:res=>{
          console.log(res)
          this.followList = res.data.following;
          console.log(this.followList)
        },
        error:err=>{

        }
      })
  }
  routeToUserPost(id:string){
    this.Router.navigate(['/userPost', { 'id': id }])
  }
  updatephotoUrl(follower:followerModel){
    follower.userData.userPhoto = './assets/img/login/MetaWall.svg'
  }
}
