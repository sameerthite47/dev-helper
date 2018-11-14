import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.css']
})
export class AdminPostComponent implements OnInit {

  posts: Post[];
  private postSub: Subscription;

  constructor(
    private postsService:PostService,
    private router: Router,
    private toastr:ToastrService
  ) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.postSub = this.postsService.getPostsUpdatedListenre()
      .subscribe(result => {
        this.posts = result.posts;
      })
  }

  onDelete(id:string) {
    if (confirm('Are you sure you want to delete?')) {
      this.postsService.deletePost(id)
        .subscribe(response => {
          this.postsService.getPosts();
          this.toastr.success(response.message, 'Success');
        })
    }
  }

}
