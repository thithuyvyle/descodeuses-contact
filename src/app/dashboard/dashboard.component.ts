import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-dashboard',
  imports: [
    MatButtonModule,
    MatInputModule,

  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  listeNumbers: any[] = [];
  operateurs: any[] = ["÷", "x", "-", "+",];
  resultat: any = "";
  number1: number = 0;
  number2: number = 0;

  ngOnInit(): void {
    this.onCreateNumber();
  }

  onCreateNumber() {
    for (let i = 9; i >= 0; i--) {
      this.listeNumbers.push(i);
    }
  }

  onCalculate() {
   /* if (this.operateurs[] == "x") {
        this.resultat= this.number1 * this.number2;
  }*/

}

}