import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  dashboardIcon = faGripHorizontal;

  constructor() { }

  ngOnInit(): void {
  }

}
