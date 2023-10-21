import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {

  filename: string = 'soporte.txt';

  constructor() {
    // let fileContent = fs.readFileSync(this.filename, 'utf-8');
    // console.log(fileContent);
  }

}
