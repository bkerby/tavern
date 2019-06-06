import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [{
    path: '',
    component: HomePage,
    children: [
        { path: '', redirectTo: 'bars', pathMatch: 'full' },
        { path: 'legal', loadChildren: '../legal/legal.module#LegalPageModule' },
        { path: 'account', loadChildren: '../account/account.module#AccountPageModule' },
        { path: 'tab/:id', loadChildren: '../tab/tab.module#TabPageModule' },
        { path: 'menu/:id', loadChildren: '../menu/menu.module#MenuPageModule' },
        { path: 'bars', loadChildren: '../bars/bars.module#BarsPageModule' }
    ]
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
