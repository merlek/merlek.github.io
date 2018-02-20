﻿export class DataGridUtil {

  public static downloadcsv(data: any, exportFileName: string) {
    const csvData = this.convertToCSV(data);

    const blob = new Blob([csvData], {type: 'text/csv;charset=utf-8;'});

    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, this.createFileName(exportFileName));
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', this.createFileName(exportFileName));
        // link.style = "visibility:hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  private static convertToCSV(objarray: any) {
    const array = typeof objarray !== 'object' ? JSON.parse(objarray) : objarray;

    let str = '';
    let row = '';

    for (const index in objarray[0]) {
      if (objarray[0].hasOwnProperty(index)) {
        // Now convert each value to string and comma-separated
        row += index + ',';
      }
    }
    row = row.slice(0, -1);
    // append Label row with line break
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (const index in array[i]) {
        if (array[i].hasOwnProperty(index)) {
          if (line !== '') {
            line += ',';
          }
          line += JSON.stringify(array[i][index]);
        }
      }
      str += line + '\r\n';
    }
    return str;
  }

  private static createFileName(exportFileName: string): string {
    const date = new Date();
    return (exportFileName +
      date.toLocaleDateString() + '_' +
      date.toLocaleTimeString() + '.csv');
  }

}
