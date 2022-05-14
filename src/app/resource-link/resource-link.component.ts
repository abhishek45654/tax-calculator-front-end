import { Component, OnInit } from '@angular/core';
import { default as sourceLink } from '../../assets/sourceLink.json';
import { Resource } from '../model/resources';


@Component({
  selector: 'app-resource-link',
  templateUrl: './resource-link.component.html',
  styleUrls: ['./resource-link.component.css']
})
export class ResourceLinkComponent implements OnInit {

  constructor() { }

  links=sourceLink;

  ngOnInit(): void {
  }

}
