import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';

@Component({
  standalone: true,
  imports: [IndexComponent, RouterModule],
  selector: 'echoo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Echoo.app';
  titleService = inject(Title);

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
