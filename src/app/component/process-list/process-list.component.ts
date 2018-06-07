import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProcessService } from '../../service/process/process.service';
import { Process } from '../../models/process.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FilterPipe } from '../../pipe/shearch/shearch-process.pipe'

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css'],
  providers: [FilterPipe]
})
export class ProcessListComponent implements OnInit, OnDestroy {

  allProcess: Process[];
  allProcessSubscription: Subscription;

  constructor(private processService: ProcessService, private router: Router) { }

  ngOnInit() {

    this.processService.getAllProcess();
    this.allProcessSubscription = this.processService.allProcessSubject.subscribe(
      (allProcess: Process[]) => {
        this.allProcess = allProcess;
        console.log(this.allProcess)
      }

    );
    this.processService.emitAllProcess();
    console.log(this.allProcess)



  }

  onNewProcess() {
    this.router.navigate(['/process-create']);
  }

  onDeleteProcess(process: Process) {
    this.processService.removeProcess(process);
  }

  onViewProcess(id: number) {
    this.router.navigate(['/process-single', id]);
  }

  ngOnDestroy() {
    this.allProcessSubscription.unsubscribe();
  }
}