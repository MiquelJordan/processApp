import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Process } from '../../models/process.model';
import { DataSnapshot } from '@firebase/database';
import * as firebase from 'firebase';
import { StepService } from '../step/step.service';

@Injectable()
export class ProcessService {

  allProcess: Process[] = [];
  allProcessSubject = new Subject<Process[]>();


  emitAllProcess() {
    this.allProcessSubject.next(this.allProcess);
  };

  saveAllProcess() {
    firebase.database().ref('/allProcess').set(this.allProcess);
  };

  getAllProcess() {
    firebase.database().ref('/allProcess')
      .on('value', (data: DataSnapshot) => {
        this.allProcess = data.val() ? data.val() : [];
        this.emitAllProcess();
      }
      );
  };

  getProcess(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/allProcess/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  };

  createNewProcess(newProcess: Process) {
    this.allProcess.push(newProcess);
    this.saveAllProcess();
    this.emitAllProcess();
  }

  removeProcess(process: Process) {
    const processIndexToRemove = this.allProcess.findIndex(
      (processEl) => {
        if (processEl === process) {
          return true;
        }
      }
    );
    if (process.steps[processIndexToRemove].photo) {

      const storageRef = firebase.storage().refFromURL(process.steps[processIndexToRemove].photo);
      storageRef.delete().then(
        () => {
          console.log('Process removed');
        },
        (error) => {
          console.log('Could not remove process! : ' + error);
        }
      );
    }

    this.allProcess.splice(processIndexToRemove, 1);
    this.saveAllProcess();
    this.emitAllProcess();
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