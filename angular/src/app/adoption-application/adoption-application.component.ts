import { Component, Input, OnInit } from '@angular/core';
import { AdoptionApplication } from '../models/AdoptionApplication';

@Component({
  selector: 'app-adoption-application',
  templateUrl: './adoption-application.component.html',
  styleUrls: ['./adoption-application.component.css']
})
export class AdoptionApplicationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() application!: AdoptionApplication

}
