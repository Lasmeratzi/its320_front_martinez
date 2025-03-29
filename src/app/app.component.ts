//import { Component } from '@angular/core';
//import { RouterModule, RouterOutlet } from '@angular/router';
//import { HomeComponent } from './home/home.component';
//import { AboutComponent } from './about/about.component';
//import { ProjectsComponent } from './projects/projects.component';
//import { ContactComponent } from './contact/contact.component';
//import { HeaderComponent } from './header/header.component';

//@Component({
 // selector: 'app-root',
 // standalone: true,
 // imports: [RouterModule, RouterOutlet, HomeComponent, AboutComponent, ProjectsComponent, ContactComponent, HeaderComponent],
 // templateUrl: './app.component.html',
 // styleUrls: ['./app.component.css']
//})
//export class AppComponent {
  //title = 'portfolio';
//}
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DisplayquotesComponent } from './displayquotes/displayquotes.component';

@Component({
  selector: 'app-root',
  imports: [ DisplayquotesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'its320Martz';
}