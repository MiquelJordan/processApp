import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router, RouterModule } from '@angular/router'


import { AppComponent } from './app.component';
import { ProcessListComponent } from './component/process-list/process-list.component';
import { ProcessCreateComponent } from './component/process-create/process-create.component';
import { ProcessService } from './service/process/process.service';
import { appRoutes } from './app.route';
import { ProcessSingleComponent } from './component/process-single/process-single.component'
import { StepService } from './service/step/step.service';
import { MaterialModule } from './material.module';
import { FilterPipe } from './pipe/shearch/shearch-process.pipe';



@NgModule({
  declarations: [
    AppComponent,
    ProcessListComponent,
    ProcessCreateComponent,
    ProcessSingleComponent,
    FilterPipe,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,

  ],
  providers: [
    ProcessService,
    StepService,
  ],
  exports: [
    MaterialModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
