import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { 
    path: 'debts', 
    title: 'Карточки должника',
    loadChildren: () => import('./debts/debts.module').then(m => m.DebtsModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'paydocs', 
    title: 'Платежные документы',
    loadChildren: () => import('./paydocs/paydocs.module').then(m => m.PaydocsModule),
    canActivate: [AuthGuard]
  },
  { 
    path: "", 
    title: 'Экотек',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
