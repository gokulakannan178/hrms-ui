import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { $ } from 'protractor';
declare var $:any;

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {

    show = false;
    buttonName = 'Create link'; 
    hide: any;
  
    toggle() {
    this.show = !this.show
  
    if(this.show) {
    this.buttonName = 'Disable link'
    console.log(this.show)
    }
    else {
    this.buttonName = 'Create link'
    }
    }

    show1 = false;
    
    hide1: any;
  
    toggle1() {
    this.show1 = !this.show1
  
    if(this.show1) {
   
    console.log(this.show1)
    }
    else {
   
    }
    }

  arraybox
  arrayboxx:any=[]
  public Naina: FormGroup;
  closeResult = '';
  public Submitted: boolean;
  addcard:any;
  cardarray:any=[];
  public agroEcologicalZonesModalForms: FormGroup;

  public modalHeaderText:string ='Invite to board';
  public modalButtonText: string = 'Send Invitation';
  constructor() { }

  ngOnInit(): void {
    this.arrayboxx=[
        
    ]
    this.Naina = new FormGroup({
        'name': new FormControl("", Validators.required)
      });    
  
}
addcardModal(){
    this.cardarray.push(this.addcard)
for(let i=0;i<this.cardarray.length;i++)
{
    console.log(this.cardarray[i]);
$(".log_div").append(` <div class="col-md-4" style="background: #cdcaca;padding: 20px; height: 19em;overflow-x: auto;overflow-y: auto;margin-left:5px" class="col-md-4">
<h4>${this.cardarray[i]}</h4>
<div style="background: white;  padding: 10px;margin-bottom: -1pc;">
    <h4>Kids Magic Mobile App</h4>
    <button>24 Nov 2021 - 30- Nov 2021</button>
    <div><span>18</span><span>9/10</span></div>
    <div class="name">AK

    </div>
</div><br>
<div style="background: white;
padding: 10px;margin-bottom: 8px;">
    <h4>Kids Magic Mobile App</h4>
    <button>24 Nov 2021 - 30- Nov 2021</button>
    <div><span>18</span><span>9/10</span></div>
    <div class="name">AK

    </div>
</div>
<div style="background: white;
padding: 10px;margin-bottom: 9px">
    <h4>Kids Magic Mobile App</h4>
    <button>24 Nov 2021 - 30- Nov 2021</button>
    <div><span>18</span><span>9/10</span></div>
    <div class="name">AK

    </div>
</div>
<div style="background: white;
padding: 10px;margin-bottom: -1pc;">
    <h4>Kids Magic Mobile App</h4>
    <button>24 Nov 2021 - 30- Nov 2021</button>
    <div><span>18</span><span>9/10</span></div>
    <div class="name">AK

    </div>
</div>
</div>  `)
}
}

get fr() {
    return this.Naina.controls;
  }
public addSoilType(type) {}

  fordiv(){
    alert("DDDD")
      this.arraybox=` <div class="col-lg-4 col-sm-6 col-md-4 col-xl-3">
      <div class="card">
          <div class="card-body">
              <div class="dropdown dropdown-action profile-action">
                  <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                  <div class="dropdown-menu dropdown-menu-right">
                      <a class="dropdown-item" href="#" data-toggle="modal" data-target="#edit_project"><i class="fa fa-pencil m-r-5"></i> Edit</a>
                      <a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_project"><i class="fa fa-trash-o m-r-5"></i> Delete</a>
                  </div>
              </div>
              <h4 class="project-title"><a href="#">Harit Maha City Compost</a></h4>
              <small class="block text-ellipsis m-b-15">
                  <span class="text-xs">1</span> <span class="text-muted"> Open Tasks, </span>
                  <span class="text-xs">9</span> <span class="text-muted"> Tasks Completed, </span>
                  <span class="text-xs">0</span> <span class="text-muted"> Bugs</span>
              </small>
              <p class="text-muted">Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. When an unknown printer took a galley of type and
                  scrambled it...
              </p>
              <div class="pro-deadline m-b-15">
                  <div class="sub-title">
                      Deadline:
                  </div>
                  <div class="text-muted">
                      17 Apr 2021
                  </div>
              </div>
              <div class="project-members m-b-15">
                  <div>Project Leader :</div>
                  <ul class="team-members">
                      <li>
                          <a href="#" data-toggle="tooltip" title="Jeffery Lalor"><img alt="" src="assets/img/profiles/avatar-16.jpg"></a>
                      </li>
                  </ul>
              </div>
              <div class="project-members m-b-15">
                  <div>Team :</div>
                  <ul class="team-members">
                      <li>
                          <a href="#" data-toggle="tooltip" title="John Doe"><img alt="" src="assets/img/profiles/avatar-02.jpg"></a>
                      </li>
                      <li>
                          <a href="#" data-toggle="tooltip" title="Richard Miles"><img alt="" src="assets/img/profiles/avatar-09.jpg"></a>
                      </li>
                      <li>
                          <a href="#" data-toggle="tooltip" title="John Smith"><img alt="" src="assets/img/profiles/avatar-10.jpg"></a>
                      </li>
                      <li>
                          <a href="#" data-toggle="tooltip" title="Mike Litorus"><img alt="" src="assets/img/profiles/avatar-05.jpg"></a>
                      </li>
                      <li class="dropdown avatar-dropdown">
                          <a href="#" class="all-users dropdown-toggle" data-toggle="dropdown" aria-expanded="false">+15</a>
                          <div class="dropdown-menu dropdown-menu-right">
                              <div class="avatar-group">
                                  <a class="avatar avatar-xs" href="#">
                                      <img alt="" src="assets/img/profiles/avatar-02.jpg">
                                  </a>
                                  <a class="avatar avatar-xs" href="#">
                                      <img alt="" src="assets/img/profiles/avatar-09.jpg">
                                  </a>
                                  <a class="avatar avatar-xs" href="#">
                                      <img alt="" src="assets/img/profiles/avatar-10.jpg">
                                  </a>
                                  <a class="avatar avatar-xs" href="#">
                                      <img alt="" src="assets/img/profiles/avatar-05.jpg">
                                  </a>
                                  <a class="avatar avatar-xs" href="#">
                                      <img alt="" src="assets/img/profiles/avatar-11.jpg">
                                  </a>
                                  <a class="avatar avatar-xs" href="#">
                                      <img alt="" src="assets/img/profiles/avatar-12.jpg">
                                  </a>
                                  <a class="avatar avatar-xs" href="#">
                                      <img alt="" src="assets/img/profiles/avatar-13.jpg">
                                  </a>
                                  <a class="avatar avatar-xs" href="#">
                                      <img alt="" src="assets/img/profiles/avatar-01.jpg">
                                  </a>
                                  <a class="avatar avatar-xs" href="#">
                                      <img alt="" src="assets/img/profiles/avatar-16.jpg">
                                  </a>
                              </div>
                              <div class="avatar-pagination">
                                  <ul class="pagination">
                                      <li class="page-item">
                                          <a class="page-link" href="#" aria-label="Previous">
                                              <span aria-hidden="true">«</span>
                                              <span class="sr-only">Previous</span>
                                          </a>
                                      </li>
                                      <li class="page-item"><a class="page-link" href="#">1</a></li>
                                      <li class="page-item"><a class="page-link" href="#">2</a></li>
                                      <li class="page-item">
                                          <a class="page-link" href="#" aria-label="Next">
                                              <span aria-hidden="true">»</span>
                                          <span class="sr-only">Next</span>
                                          </a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </li>
                  </ul>
              </div>
              <p class="m-b-5">Progress <span class="text-success float-right">40%</span></p>
              <div class="progress progress-xs mb-0">
                  <div class="progress-bar bg-warning" role="progressbar" data-toggle="tooltip" title="40%" style="width: 40%"></div>
              </div>
          </div>
      </div>
  </div>` 
  
  this.arrayboxx.push(this.arraybox)
  }
  public openNewModal(){
    this.modalButtonText = 'Send Invitation';
    this.modalHeaderText ='Invite to Board';
    this.Naina.get("name").setValue('');

}




}
