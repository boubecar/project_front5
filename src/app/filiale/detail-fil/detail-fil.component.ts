import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-detail-fil',
  templateUrl: './detail-fil.component.html',
  styleUrls: ['./detail-fil.component.css']
})
export class DetailFilComponent implements OnInit {

  constructor(public localService:LocalService) {
  
  }

  ngOnInit(): void {
  }


}
