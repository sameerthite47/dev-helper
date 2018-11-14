import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminCategoryComponent } from './components/admin/admin-category/admin-category.component';
import { AdminAddCategoryComponent } from './components/admin/admin-add-category/admin-add-category.component';
import { AdminEditCategoryComponent } from './components/admin/admin-edit-category/admin-edit-category.component';
import { CategoryComponent } from './components/category/category.component';
import { AuthGuard } from './services/auth.guard';
import { AdminPostComponent } from './components/admin/admin-post/admin-post.component';
import { AdminAddPostComponent } from './components/admin/admin-add-post/admin-add-post.component';
import { AdminEditPostComponent } from './components/admin/admin-edit-post/admin-edit-post.component';

const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'category', component:CategoryComponent },
  { path:'login', component:LoginComponent },
  { path:'admin/dashboard', component:DashboardComponent, canActivate:[AuthGuard] },
  { path:'admin/category', component:AdminCategoryComponent, canActivate:[AuthGuard] },
  { path:'admin/add-category', component:AdminAddCategoryComponent, canActivate:[AuthGuard] },
  { path:'admin/edit-category/:id', component:AdminEditCategoryComponent, canActivate:[AuthGuard] },
  { path:'admin/post', component:AdminPostComponent, canActivate:[AuthGuard] },
  { path:'admin/add-post', component:AdminAddPostComponent, canActivate:[AuthGuard] },
  { path:'admin/edit-post/:id', component:AdminEditPostComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
