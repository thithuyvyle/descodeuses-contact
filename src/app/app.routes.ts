import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { DialogComponent } from './dialog/dialog.component';

export const routes: Routes = [
    {path:'', component: DashboardComponent, title:'Home', data:{isMenu: true} },
    {path:'contact-list', component: ContactListComponent, title:'Contact', data:{isMenu: true} },
    {path:'contact-details/:id' , component: ContactDetailComponent, title: 'Contact details'},
    {path:'contact-details', component: ContactDetailComponent, title: 'Contact details'},
    {path:'dialog', component: DialogComponent}
];
