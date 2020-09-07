import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  { path: 'verify', component: VerifyComponent },
  { path: '', component: VerifyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
