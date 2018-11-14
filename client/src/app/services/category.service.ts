import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[] = [];
  private categoryUpdated = new Subject<{categories: Category[]}>();

  constructor(
    private http: HttpClient, 
    private router: Router,
    private toastr: ToastrService
  ) { }

  getCategory() {
    this.http.get<Category[]>(environment.apiUrl + '/categories')
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.categoryUpdated.next({ categories: [...this.categories]});
      })
  }

  getCategoryUpdatedListenre() {
    return this.categoryUpdated.asObservable();
  }

  addCategory(category: Category) {
    this.http.post(environment.apiUrl + '/categories', category)
      .subscribe(newCategory => {
        this.toastr.success('Added Successfully!', 'Success');
        this.router.navigate(['admin/category']);
      })
  }

  updateCategory(category: Category) {
    this.http.put(environment.apiUrl + '/categories/' + category._id, category)
      .subscribe(newCategory => {
        this.toastr.success('Update Successfully!', 'Success');
        this.router.navigate(['admin/category']);
      })
  }

  getCategoryById(id:string): Observable<Category> {
    return this.http.get<Category>(environment.apiUrl + '/categories/' + id);
  }

  deleteCategory(id:string): Observable<{message: string}> {
    return this.http.delete<{ message:string }>(environment.apiUrl + '/categories/' + id);
  }

}
