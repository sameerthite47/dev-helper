import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-admin-add-post',
  templateUrl: './admin-add-post.component.html',
  styleUrls: ['./admin-add-post.component.css']
})
export class AdminAddPostComponent implements OnInit {

  categories: Category[];
  private catSub: Subscription;
  post: Post = {
    title:"",
    body:"",
    description:"",
    imageUrl:"",
    isActive:true
  }

  constructor(
    private categoryService:CategoryService,
    private postService:PostService
  ) { }

  ngOnInit() {
    this.categoryService.getCategory();
    this.catSub = this.categoryService.getCategoryUpdatedListenre()
      .subscribe(result => {
        console.log(result.categories);
        this.categories = result.categories;
      });
  }

  onAdd(form) {
    if (!form.valid) {
      console.log("Invalid form");
      return;
    }
    this.postService.addPost(form.value);
  }

}
