import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';

@Component({
  standalone: true,
  imports: [IndexComponent, RouterModule],
  selector: 'echoo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Echoo.app';
}
