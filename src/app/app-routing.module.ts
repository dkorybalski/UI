import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './modules/user/user.guard';
import { CoordinatorGuard } from './modules/user/coordinator.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./modules/project/project.module').then(m => m.ProjectModule),
    canActivate: [UserGuard]
  },
  {
    path: 'projects',
    loadChildren: () => import('./modules/project/project.module').then(m => m.ProjectModule),
    canActivate: [UserGuard],
    outlet: 'modal',
  },
  {
    path: 'grades',
    loadChildren: () => import('./modules/grade/grade.module').then(m => m.GradeModule),
    canActivate: [UserGuard]
  },
  {
    path: 'external-links',
    loadChildren: () => import('./modules/external-link/external-link.module').then(m => m.ExternalLinkModule),
    canActivate: [UserGuard]
  },
  {
    path: 'data-feed',
    loadChildren: () => import('./modules/data-feed/data-feed.module').then(m => m.DataFeedModule),
    canActivate: [CoordinatorGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
