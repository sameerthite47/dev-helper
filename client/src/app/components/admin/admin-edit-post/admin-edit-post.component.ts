import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { CategoryService } from 'src/app/services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-edit-post',
  templateUrl: './admin-edit-post.component.html',
  styleUrls: ['./admin-edit-post.component.css']
})
export class AdminEditPostComponent implements OnInit {

  id:string;
  categories: Category[];
  private catSub: Subscription;
  post: Post = {
    title:"",
    body:"",
    description:"",
    imageUrl:"",
    isActive:null,
    category:""
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private postsService: PostService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.categoryService.getCategory();
    this.catSub = this.categoryService.getCategoryUpdatedListenre()
      .subscribe(result => {
        this.categories = result.categories;
    });

    this.postsService.getPostById(this.id)
      .subscribe(post => {
        this.post = post;
        this.id = post._id;
      })
  }

  onUpdate(form) {
    if (!form.valid) {
      return;
    }
    form.value._id = this.id;
    this.postsService.updatePost(form.value);
  }

}
