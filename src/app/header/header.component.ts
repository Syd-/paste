import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  id: string;
  router: Router;

  constructor(private routr: Router,
    private location: Location,) {
      this.router = routr;
    }

  ngOnInit() {
    this.id = this.location.path().substring(1);
  }

}
