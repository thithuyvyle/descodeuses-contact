import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})

export class DialogComponent {

  constructor(
    //public dialog: MatDialog
    @Inject(MAT_DIALOG_DATA) public data: any, // MAT_DIALOG_DATA: permet de recevoir les données envoyées par open()
    private dialogRef: MatDialogRef<DialogComponent> // MatDialogRef: permet de fermer le dialog et renvoyer une valeur.
  ) {}

  confirmDelete(): void {
  this.dialogRef.close('confirm'); // Ferme le dialog et renvoie "confirm" : cf contact-list.TS
}

}
