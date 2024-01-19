import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-newsview',
  templateUrl: './newsview.component.html',
  styleUrls: ['./newsview.component.css']
})
export class NewsviewComponent implements OnInit {
  getNews:any
  constructor(public apiService: ApiService,router: Router,) { }

  ngOnInit(): void {
    this.getnewsdata()
  }

  getnewsdata(){
    this.getNews=JSON.parse(sessionStorage.getItem('getnews'))
    console.log("news",this.getNews)
  }

}
