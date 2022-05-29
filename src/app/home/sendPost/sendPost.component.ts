import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Posts_Service } from 'src/app/app-info/typescript-angular-client-generated/typescript-angular-client/api/posts_.service';

@Component({
  selector: 'app-sendPost',
  templateUrl: './sendPost.component.html',
  styleUrls: ['./sendPost.component.scss']
})
export class SendPostComponent implements OnInit {

  postSendError:string = ''
  sendPostForm = new FormGroup({
    discussContent: new FormControl(''),
    discussPhoto: new FormControl(''),
    tag: new FormControl('標籤 string')
  })
  constructor(private postService: Posts_Service) { }

  ngOnInit() {
  }
  sendPosts(){
    this.postService.postsPost(this.sendPostForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.sendPostForm.setValue({
          discussContent: '',
          discussPhoto:  '',
          tag: ''
        })
        this.postSendError = '發出成功'
      },
      error:(err)=>{
        this.postSendError =  err.error.message
      }

    })
  }
}
