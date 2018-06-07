import { Component, OnInit } from '@angular/core';
import { Process } from '../../models/process.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessService } from '../../service/process/process.service';
import { Step } from '../../models/step.model';

@Component({
  selector: 'app-process-single',
  templateUrl: './process-single.component.html',
  styleUrls: ['./process-single.component.css']
})
export class ProcessSingleComponent implements OnInit {

  process: Process;


  constructor(private route: ActivatedRoute, private processService: ProcessService,
    private router: Router) { }

  ngOnInit() {
    // this.process = new Process('', []);
    const id = this.route.snapshot.params['id'];
    this.processService.getProcess(+id).then(
      (process: Process) => {
        console.log(`${process.processId}, avec ${process.steps.length} de step`)
        this.process = process;


      });
  }

  onBack() {
    this.router.navigate(['/process-list']);
  }
}