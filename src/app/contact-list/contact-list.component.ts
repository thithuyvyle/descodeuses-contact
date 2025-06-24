import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../contact-model';


@Component({
  selector: 'app-contact-list',
  imports: [
    MatListModule,
    RouterLink,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})

export class ContactListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,   // Service pour ouvrir un dialog
    private http: HttpClient,
  ) { }

  private apiURL = 'api/listeContacts'; //'api/array ds in memory data'
  nombreContact = 0;
  textRecherche: string = "";
  listeContact:any[]= [];
  listeContactFiltre: any = [];
  contact!: Contact;
  

  ngOnInit(): void {
    this.http.get<Contact[]>(this.apiURL).subscribe((data) => {
      this.listeContact = data;
      this.onSearch(); // faire le filtrage une fois les données chargées
      this.nombreContact = this.listeContactFiltre.length;
    });
  }

  // filtrer par input lettre
  onSearch() {
    console.log(this.textRecherche); // optionnel
    /* Methode 1: par filter
    this.listeContactFiltre = this.listeContact.filter(item =>
      item.nom.toLowerCase().startsWith(this.textRecherche.toLowerCase()) || 
      item.prenom.toLowerCase().startsWith(this.textRecherche.toLowerCase())
    );   
    */
    // méthode 2:
    this.listeContactFiltre = [];  //   => remet le tableau à zéro qd on retape ds le clavier
    this.listeContact.forEach(item => {
      if ( // startsWith() est sensible à la casse (minuscule, majuscule)
        item.nom.toLowerCase().startsWith(this.textRecherche.toLowerCase()) ||
        item.prenom.toLowerCase().startsWith(this.textRecherche.toLowerCase())
      ) {
        this.listeContactFiltre.push(item);
        this.nombreContact=this.listeContactFiltre.length;
      }
    })// filtrer par ordre alphabétique
    //localeCompare() method compares two strings in the current locale,
    //renvoie tri par ordre: -1 (si a avant b), 1 (a après b), or 0 (égal).
    this.listeContactFiltre.sort((a: any, b: any) => {
      const nomCompare = a.nom.localeCompare(b.nom);
      if (nomCompare !== 0) {
        return nomCompare;
      }
      // Si les noms sont identiques, on compare les prénoms:
      return a.prenom.localeCompare(b.prenom);
    });
  }


  /*  
   méthode 3: boucle 3   
   this.listeContactFiltre = [];
   for(let i=0; i<this.listeContact.length; i++) { // for(let contactFiltre of this.listContact)
      let contactFiltre= this.listeContact[i];
      if(
        contactFiltre.nom.toLowerCase().startsWith(this.textRecherche.toLowerCase()) ||
        contactFiltre.prenom.toLowerCase().startsWith(this.textRecherche.toLowerCase())
        ) {
        this.listeContactFiltre.push(contactFiltre);
        }
   }
  }
  */

  //Supprimer contact
  onRemove(id: number) {
    this.http.delete<Contact>(this.apiURL + '/' + id).subscribe(() => { // delete dans api serveur
      const index = this.listeContact.findIndex(contact => contact.id == id); // findIndex dans tableau par 
      if (index > -1) { // vérifier que l'élément a bien été trouvé dans le tableau avant d’essayer de le supprimer avec splice
        //splice(-1, 1); // Supprime le dernier élément du tableau par erreur !
        this.listeContact.splice(index, 1); // index: position ds tableau , count ==> delete interface client
        this.onSearch();
        this.nombreContact = this.listeContactFiltre.length;
      }
    })
  }

  /*   ou  
    this.listeContact = this.listeContact.filter(contact => contact.id !== id);// keep all contacts with id different than the selected one
    this.onSearch(); // puis re-afficher la liste filtrée avec la fct
    */

  // ouvrir Dialog
  openDialog(contact: any): void {
    const dialogRef = this.dialog.open(DialogComponent, { // comme snackbar ".open" ouvre le composant
      width: '350px',
      data: { contact } // envoie le contact sélectionné au dialog
    });

    dialogRef.afterClosed().subscribe((result) => { //"afterClosed()" : évènement après fermeture dialog
      if (result === "confirm") { // cf dialog.TS si user confirm => appelle onRemove()
        this.onRemove(contact.id);
      }
    })
  }


}
