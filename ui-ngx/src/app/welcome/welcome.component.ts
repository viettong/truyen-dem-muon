import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelloWorldBean, WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  name = ''
  welcomeMessageFromService : string | undefined;
  //ActivatedRouter
  constructor(private router : ActivatedRoute,
    private welcomeDataService : WelcomeDataService) { 
    this.router.params.subscribe(val => {
      this.name = this.router.snapshot.params['name'];
    });
  }

  ngOnInit(): void {
    // console.log(this.router.snapshot.params['name']);
    this.name = this.router.snapshot.params['name'];
  }
  getWelcomeMessageWithParameter(){
    // console.log(this.welcomeDataService.executeHelloWorldBean());
    this.welcomeDataService.executeHelloWorldServiceWithParameterName(this.name).subscribe(
      respone => this.handleSuccessRespone(respone)
    );
  }
  handleSuccessRespone(respone : HelloWorldBean){
    console.log(respone.message)
    this.welcomeMessageFromService = respone.message;
  }

}
