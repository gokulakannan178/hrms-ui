import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.component.html',
  styleUrls: ['./view-news.component.css']
})
export class ViewNewsComponent implements OnInit {
  user:any
  newstitle:any
  constructor(public apiService: ApiService,router: Router,) { }

  ngOnInit(): void {
    this.user=JSON.parse(sessionStorage.getItem('userObj'))
    this.getnews()
  }

getnews(){
  let body={
    status:["Published"],
    "dataAccess":{
    "isAccess":true,
    "userName":this.user.userName
    }
  }
  this.apiService.postMethod("/news/filter?pageno=no",body).subscribe(data =>{
    this.newstitle= data.response.data.News
  })
}
fullnews(data){
  sessionStorage.setItem('getnews',JSON.stringify(data))
  console.log("getnews",data)
}

}
