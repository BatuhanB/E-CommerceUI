import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  dashboardIcon = faGripHorizontal;
  currentRoute:string;
  routes:any =[
    {route:"/admin",name:"Dashboard"},
    {route:"/admin/products",name:"Products"},
    {route:"/admin/orders",name:"Orders"},
    {route:"/admin/customers",name:"Customers"},
    {route:"/",name:"Go To Site"},
  ];

  constructor(private router:Router) { 
    this.currentRoute = router.url; 
  }

  ngOnInit(): void {

  }

  getCurrentRoute(route:string){
    this.currentRoute = route;
  }

}
