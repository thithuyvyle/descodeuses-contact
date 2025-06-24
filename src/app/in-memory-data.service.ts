import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from './contact-model';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{ // InMemoryDbService +++
  createDb() { // function obligatoire de InMemoryDbService
    const listeContacts: Contact[] = [
      { id: 42, nom: "Alain", prenom: "Pierre", email: "alain.p@example.com", photo: "assets/avatar-1.webp", phone: null, dateNaissance: null },
      { id: 29, nom: "Marc", prenom: "Odile", email: "marc.o@example.com", photo: "assets/avatar-2.webp", phone: null, dateNaissance: null },
      { id: 33, nom: "Marchand", prenom: "Annie", email: "marchand.a@example.com", photo: "assets/avatar-3.webp", phone: null, dateNaissance: null},
      { id: 24, nom: "Fred", prenom: "Robert", email: "fred.r@example.com", photo: "assets/avatar-4.webp", phone: null, dateNaissance: null },
      { id: 57, nom: "Papin", prenom: "Melodie", email: "papin.m@example.com", photo: "assets/avatar-5.webp", phone: null, dateNaissance: null },
      { id: 16, nom: "Marc", prenom: "Yannick", email: "marc.y@example.com", photo: "assets/avatar-6.webp", phone: null, dateNaissance: null},
    ];
    return {listeContacts}; // retour {variable} obligatoire
  }

 
}
