import { Posts_Service } from '../../app-info/typescript-angular-client-generated/typescript-angular-client/api/posts_.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostViewModel } from 'src/app/app-info/typescript-angular-client-generated/typescript-angular-client/model/models';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

public postMeaage:PostViewModel = new PostViewModel();

  constructor(private postService: Posts_Service) { }

  searchForm = new FormGroup({
    timeSort : new FormControl('desc'),
    q : new FormControl('')
  })
  ngOnInit() {
this.getPosts()
  }



getPosts(){
  console.log()
  this.postService.postsGet(this.searchForm.value.timeSort,this.searchForm.value.q).subscribe({
    next:res=>{
      console.log(res)
      this.postMeaage = res;
    },
    error:err=>{
      console.log(err)
    }
  })
}
updateUserUrl(index:number){
  this.postMeaage.data[index].userData.userPhoto = '../../../assets/img/login/MetaWall.svg';
}
}

