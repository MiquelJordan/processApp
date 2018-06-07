import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Step } from '../../models/step.model';
import { DataSnapshot } from '@firebase/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  steps: Step[] = [];
  stepsSubject = new Subject<Step[]>();

  emitSteps() {
    this.stepsSubject.next(this.steps);
  };

  saveSteps() {
    firebase.database().ref('/steps').set(this.steps);
  };

  getSteps() {
    firebase.database().ref('/steps')
      .on('value', (data: DataSnapshot) => {
        this.steps = data.val() ? data.val() : [];
        this.emitSteps();
      }
      );
  };

  getStep(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/steps/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  };

  createNewStep(newStep: Step) {
    this.steps.push(newStep);
    this.saveSteps();
    this.emitSteps();
  }

  removeProcess(step: Step) {
    if (step.photo) {
      const storageRef = firebase.storage().refFromURL(step.photo);
      storageRef.delete().then(
        () => {
          console.log('Step removed');
        },
        (error) => {
          console.log('Could not remove process! : ' + error);
        }
      );
    }
    const stepIndexToRemove = this.steps.findIndex(
      (stepEl) => {
        if (stepEl === step) {
          return true;
        }
      }
    );
    this.steps.splice(stepIndexToRemove, 1);
    this.saveSteps();
    this.emitSteps();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            console.log(upload)
            upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              console.log('File available at', downloadURL);
              resolve(downloadURL);
            }

            );
          }
        );
      }
    )
  }
}
