import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterProcess',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], process): any {
        // console.log('process', process);

        return process
            ? items.filter(item => item.processId.indexOf(process) !== -1)
            : items;
    }
}

