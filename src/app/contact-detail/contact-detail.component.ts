import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { Contact } from '../contact-model';


@Component({
  selector: 'app-contact-detail',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    RouterLink,
  ],

  templateUrl: './contact-detail.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './contact-detail.component.css'
})

export class ContactDetailComponent implements OnInit {
  formGroup!: FormGroup;
  contact!: Contact;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,

  ) { }

  private apiURL = 'api/listeContacts';
  public editMode = false;
  newId: number | null = null;
  idExists = false;

  ngOnInit(): void {
    // à l'ouverture de la page, chargement des données du contact
    const idParam = this.activatedRoute.snapshot.paramMap.get('id'); // va chercher id
    if (idParam) { // si id trouvé, champ id= id trouvé
      this.editMode = true; // html [readonly="editMode"] : ne lit que si id existe
      const id = Number(idParam);
      this.http.get<Contact>(`${this.apiURL}/${id}`).subscribe((contact) => { // au chargement, fetch contact par id
        this.formGroup = this.fb.group({
          id: [contact.id],
          nom: [contact.nom],
          prenom: [contact.prenom],
          email: [contact.email],
          photo: [contact.photo],
          phone: [contact.phone],
          dateNaissance: [contact.dateNaissance],
        });
      })
    } else { // sinon création contact: formulaire vide 
      this.editMode = false; // si pas de id, pas de readonly mais edit
      this.formGroup = this.fb.group({
        id: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        nom: ['', [Validators.required]],
        prenom: ['', [Validators.required]],
        phone: [''],
        dateNaissance: [''],
        email: [''], // si validators.pattern : button reste disabled si champ email vide
        photo: ['assets/avatar-d.webp'],// photo par défaut
      });
    }
  }


  onSubmitContact() {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.editMode) {    // forcer l'id du formulaire à correspondre à celui de l'URL
      this.formGroup.get('id')?.setValue(Number(idParam));
    };
    if (this.formGroup.valid) {
      if (idParam) { // mode modification
        const id = Number(idParam);
        this.http.put<Contact>(`${this.apiURL}/${id}`, this.formGroup.value).subscribe(() => {// update via id les données du formulaire
          this.snackBar.open('Contact mis à jour !', '', { duration: 2000 });
          this.router.navigate(['/contact-list']);
        });
      } else {  // mode création
        this.http.post<Contact>(this.apiURL, this.formGroup.value).subscribe({ //create avec données du formulaire
          next: () => {
            this.snackBar.open('Contact ajouté !', '', { duration: 2000 });
            this.router.navigate(['/contact-list']);
          },
        })
      }
    }
  }

  onFileSelected(event: Event) { // fct change (variable event: Event)
    const input = event.target as HTMLInputElement;
    //event.target est l'élément HTML qui a déclenché l’événement (notre champ <input type="file">).
    // On le type explicitement en HTMLInputElement pour avoir accès à ses propriétés, comme .files.

    if (input.files && input.files[0]) { // si fichier sélectionné, .files[0] est le premier fichier sélectionné (même si l’input ne permet qu’un seul).
      const file = input.files[0];
      const reader = new FileReader();//FileReader est une API du navigateur qui permet de lire un fichier en JavaScript.

      reader.onload = () => { //définit ce qui doit se passer quand le fichier est lu avec succès.
        // Résultat en DataURL (base64)
        const imageUrl = reader.result as string;
        //reader.result contient le contenu du fichier converti (ici, en string: base64 que img src peut utiliser)
        // chaîne de type "data:image/jpeg;base64,...
        this.formGroup.get('photo')?.setValue(imageUrl);// MAJ champ photo avec imageURL
        this.formGroup.get('photo')?.markAsDirty(); // <- rend changement photo comme si form avait été changé
        this.formGroup.markAsDirty();               // <- rend le bouton actif
      };

      reader.readAsDataURL(file); // Convertit le fichier en Data URL (base64), utilisé par le navigateur pour les images inline.
      // reader.readAsDataURL(file): Démarre la lecture du fichier. 
    }
  }

  
}





