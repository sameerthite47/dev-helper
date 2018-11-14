import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Subject } from "rxjs";
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[]}>();

  constructor(
    private http: HttpClient, 
    private router: Router,
    private toastr: ToastrService
  ) { }

  getPosts() {
    this.http.get<Post[]>(environment.apiUrl + '/posts')
      .subscribe((posts:Post[]) => {
        this.posts = posts;
        this.postsUpdated.next({ posts: [...this.posts]});
      })
  }

  getPostsUpdatedListenre() {
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post) {
    this.http.post(environment.apiUrl + '/posts', post)
      .subscribe(newPost => {
        this.toastr.success('Added Successfully!', 'Success');
        this.router.navigate(['admin/post']);
      })
  }

  updatePost(post: Post) {
    this.http.put(environment.apiUrl + '/posts/' + post._id, post)
      .subscribe(newPost => {
        this.toastr.success('Update Successfully!', 'Success');
        this.router.navigate(['admin/post']);
      })
  }

  getPostById(id:string): Observable<Post> {
    return this.http.get<Post>(environment.apiUrl + '/posts/' + id)
  }

  deletePost(id:string): Observable<{message: string}> {
    return this.http.delete<{ message:string }>(environment.apiUrl + '/posts/' + id);
  }

}
