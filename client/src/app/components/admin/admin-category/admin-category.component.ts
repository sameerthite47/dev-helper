import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  categories: Category[] = [];
  private catSub: Subscription;
  
  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.categoryService.getCategory();
    this.catSub = this.categoryService.getCategoryUpdatedListenre()
      .subscribe(result => {
        this.categories = result.categories;
      });
  }

  onDelete(id:string) {
    if (confirm('Are you sure you want to delete?')) {
      this.categoryService.deleteCategory(id)
        .subscribe(response => {
          this.categoryService.getCategory();
          this.toastr.success(response.message, 'Success');
        })
    }
  }

}
