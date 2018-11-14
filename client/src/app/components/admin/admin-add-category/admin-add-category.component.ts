import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html',
  styleUrls: ['./admin-add-category.component.css']
})
export class AdminAddCategoryComponent implements OnInit {

  category: Category = {
    name:'',
    description:'',
    imageUrl:''
  }

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  onAdd(form) {
    if (!form.valid) {
      console.log("Invalid form");
      return;
    }
    this.categoryService.addCategory(form.value);
  }

}
