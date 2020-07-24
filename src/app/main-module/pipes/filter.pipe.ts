import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any, value: string, field: string): any {
    if (!items) {
      return;
    }
    if (items.filteredData.length === 0 || !value) {
      return items;
    }

    return items.filteredData.filter((i) => {
      const t = Object.assign({}, i);
      if (!isNaN(t[field])) {
        t[field] += '';
      }
      if (field === 'category') {
        t[field] = t['catName'];
      }
      return t[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }
}
