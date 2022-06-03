import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { map, Subject, switchMap } from 'rxjs';
import { Posts_Service } from 'src/app/app-info/typescript-angular-client-generated/typescript-angular-client';
import { ImgurService } from 'src/app/service/imgur.service';

@Component({
  selector: 'app-PatchPost',
  templateUrl: './PatchPost.component.html',
  styleUrls: ['./PatchPost.component.scss']
})
export class PatchPostComponent implements OnInit {

  postSendError: string = '';
  postId: string = '';
  public IsMessageGet:boolean = false;
  sendPostForm = new FormGroup({
    discussContent: new FormControl(''),
    discussPhoto: new FormControl(''),
    tag: new FormControl('標籤 string')
  })
  imgur$ !: Subject<File>
  constructor(private postService: Posts_Service, private ImgurService: ImgurService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getPost();
    this.InitImurgurPipe();
  }
  ngOnDestroy(): void {
    // this.imgur$.unsubscribe();
  }
  getPost() {

    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')
        console.log(id)
        if (id) {
          this.postId = id.toString();
        } else {
          this.router.navigate(['/index']);
        }
        return this.postId;
      })).subscribe();
    console.log(this.postId)

    this.postService.postsIdGet(this.postId).subscribe({
      next: res => {
        this.sendPostForm.setValue({
          discussContent: res.data.discussContent,
          discussPhoto: res.data.discussPhoto,
          tag: res.data.tag
        })
        this.IsMessageGet = true;
      },
      error: err => {
        alert("取得貼文失敗")
        this.router.navigate(['/index']);
      }
    })


}


InitImurgurPipe() {
  this.imgur$ = new Subject();
  this.ImgurService.imurgurPipe(this.imgur$).subscribe(res => {
    if (res.success) {
      this.sendPostForm.patchValue({ discussPhoto: res.data.link })
    } else {
      alert('上傳錯誤')
    }
  })
}

patchPosts() {
  this.postService.postsIdPatch(this.postId, this.sendPostForm.value).subscribe({
    next: (res) => {
      console.log(res)
      this.sendPostForm.setValue({
        discussContent: '',
        discussPhoto: '',
        tag: ''
      })
      alert("修改成功")

        this.router.navigate(['/index']);



    },
    error: (err) => {
      this.postSendError = err.error.message
    }

  })
}
uploadPhoto($event: Event) {
  const element = $event.currentTarget as HTMLInputElement;
  let fileList: FileList | null = element.files;
  console.log(element)
  if (fileList) {
    this.imgur$.next(fileList[0])
  }
}
}
