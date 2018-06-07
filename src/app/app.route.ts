import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessListComponent } from './component/process-list/process-list.component';
import { ProcessCreateComponent } from './component/process-create/process-create.component';
import { ProcessSingleComponent } from './component/process-single/process-single.component';



export const appRoutes: Routes = [
    { path: 'process-list', component: ProcessListComponent },
    { path: 'process-create', component: ProcessCreateComponent },
    { path: 'process-single/:id', component: ProcessSingleComponent },
    { path: '', redirectTo: '/process-list', pathMatch: 'full' }
];
