import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchooIconsModule } from '@echoo/echoo-icons';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'echoo-github-button',
  standalone: true,
  imports: [CommonModule, EchooIconsModule, HttpClientModule, NzIconModule],
  templateUrl: './github-button.component.html',
  styleUrls: ['./github-button.component.css'],
  providers: [HttpClient],
})
export class GithubButtonComponent implements OnInit {
  @Input() user!: string;
  @Input() repo!: string;

  private h = inject(HttpClient);

  startsCount = 0;

  get url() {
    return `https://github.com/${this.user}/${this.repo}`;
  }

  get stargazersUrl() {
    return `${this.url}/stargazers`;
  }

  get apiUrl() {
    return `https://api.github.com/repos/${this.user}/${this.repo}`;
  }

  ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.h.get(this.apiUrl).subscribe((data: any) => {
      this.startsCount = data.stargazers_count;
    });
  }
}
