import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import * as myGlobals from '../../shared/globals';
@Component({
  selector: 'app-organisationchart',
  templateUrl: './organisationchart.component.html',
  styleUrls: ['./organisationchart.component.css']
})
export class OrganisationchartComponent implements OnInit {
  gobalnode:any
  nodes: any = [
  
  ];
  children:any=[]
  allemploye:any;
  empchild1:any=[]

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.getsingle()
  }
  getsingle(){
    
        
    this.apiService.getMethod3("/employee/getorgchart").subscribe(
    data => {
      this.allemploye= data.response.data.data

      for(let i=0;i<this.allemploye.length;i++){
        
        
        let empchildren=  {
          name:this.allemploye[i]?.employee?.name,
          cssClass: 'ngx-org-ceo',
          image: 'assets/node.svg',
          title: this.allemploye[i]?.employee?.type,
          childs:this.empchild1
        }
      if(this.allemploye[i].childran){
      for(let j=0;j<this.allemploye[i].childran.length;j++){

         let subchild1= {
            name:this.allemploye[i]?.childran[j]?.employee?.name,
            cssClass: 'ngx-org-ceo',
            image: 'assets/node.svg',
            title: this.allemploye[i]?.childran[j]?.employee?.type,
            }
            this.empchild1.push(subchild1)
       }
      }
        this.children.push(empchildren)
      
      }

      this.gobalnode= {
        name: 'LGF',
        cssClass: 'ngx-org-ceo',
        childs: this.children
      }
      this.nodes.push(this.gobalnode)
      console.log("aaa",this.gobalnode)
  
      }
    )}

}
