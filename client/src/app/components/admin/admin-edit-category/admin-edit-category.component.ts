import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-edit-category',
  templateUrl: './admin-edit-category.component.html',
  styleUrls: ['./admin-edit-category.component.css']
})
export class AdminEditCategoryComponent implements OnInit {

  id:string;

  category: Category = {
    name:'',
    description:'',
    imageUrl:''
  }

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.categoryService.getCategoryById(this.id)
      .subscribe(category => {
        this.category = category;
        this.id = category._id;
      })
  }

  onUpdate(form) {
    if (!form.valid) {
      return;
    }
    form.value._id = this.id;
    this.categoryService.updateCategory(form.value);
  }

}
