import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditUserProfileComponent } from './components/edit-user-profile/edit-user-profile.component';

const routes: Routes = [
  { path: '', component: UserProfileComponent },
  { path: 'edit-user-profile', component: EditUserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
