import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Process } from '../../models/process.model';
import { ProcessService } from '../../service/process/process.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-process-create',
  templateUrl: './process-create.component.html',
  styleUrls: ['./process-create.component.css']
})
export class ProcessCreateComponent implements OnInit {

  processForm: FormGroup;
  steps: FormArray;
  step;
  stepindexUpload
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private processService: ProcessService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.processForm = this.formBuilder.group({
      steps: this.formBuilder.array([this.createStep()]),
      processId: ['', Validators.required],
    });
  }
  createStep(): FormGroup {
    return this.formBuilder.group({
      text: '',
      background: '',
      photo: '',
    });
  };
  addStep(): void {
    this.steps = this.processForm.get('steps') as FormArray;
    this.steps.push(this.createStep());


    console.log(this.step, 'step')

  };

  onSaveProcess() {

    const processId = this.processForm.get('processId').value;
    const steps = this.processForm.get('steps').value;
    const newProcess = new Process(processId, steps);
    this.processService.createNewProcess(newProcess);
    this.router.navigate(['/process-list']);



  };

  onUploadFile(file: File) {

    this.fileIsUploading = true;
    this.processService.uploadFile(file, ).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        // this.step = this.processForm.controls['photo'];
        // this.step = url


        let stepControl = <FormArray>this.processForm.controls['steps'];
        stepControl.at(this.stepindexUpload).patchValue({ 'photo': url })

        // let step = this.processForm.get('steps');
        // let step1 = (step).at(this.stepindexUpload)
        // step1.patchValue({ photo: url });


        // let stepControl = (<FormArray>this.processForm.controls['steps']).at(this.stepindexUpload) as FormArray;
        // stepControl.setValue({photo: url})

        console.log(this.fileUrl, "laaaaaaaaaaaa")
      }

    );
  };

  detectFiles(event, i) {

    console.log('---> i', i);
    this.onUploadFile(event.target.files[0]);
    this.stepindexUpload = i;
  }
  onBack() {
    this.router.navigate(['/process-list']);
  }
}

