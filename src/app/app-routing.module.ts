import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'about-me', loadChildren: './about-me/about-me.module#AboutMePageModule' },
  { path: 'my-cake', loadChildren: './my-cake/my-cake.module#MyCakePageModule' },
  { path: 'my-gift-ideas', loadChildren: './my-gift-ideas/my-gift-ideas.module#MyGiftIdeasPageModule' },
  { path: 'confirm', loadChildren: './confirm/confirm.module#ConfirmPageModule' },
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
