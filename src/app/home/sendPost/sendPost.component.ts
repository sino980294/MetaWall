import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Posts_Service } from 'src/app/app-info/typescript-angular-client-generated/typescript-angular-client/api/posts_.service';
import { ImgurService } from 'src/app/service/imgur.service';

@Component({
  selector: 'app-sendPost',
  templateUrl: './sendPost.component.html',
  styleUrls: ['./sendPost.component.scss']
})
export class SendPostComponent implements OnInit ,OnDestroy{

  postSendError:string = ''
  sendPostForm = new FormGroup({
    discussContent: new FormControl(''),
    discussPhoto: new FormControl(''),
    tag: new FormControl('標籤 string')
  })
  imgur$ !:Subject<File>
  constructor(private postService: Posts_Service,private ImgurService:ImgurService) { }

  ngOnInit() {
    this.InitImurgurPipe()
  }
  ngOnDestroy(): void {
    this.imgur$.unsubscribe();
  }
  InitImurgurPipe(){
    this.imgur$ = new Subject();
    this.ImgurService.imurgurPipe(this.imgur$).subscribe(res=>{
      if(res.success){
        this.sendPostForm.patchValue({discussPhoto:res.data.link})
      }else{
        alert('上傳錯誤')
      }
    })
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
  uploadPhoto($event:Event){
    const element = $event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    console.log(element)
    if (fileList) {
      this.imgur$.next(fileList[0])
    }
  }

}
