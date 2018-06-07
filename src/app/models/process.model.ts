import { Step } from './step.model'

export class Process {


    constructor(public processId: string, public steps: Step[]) {
    }
}
