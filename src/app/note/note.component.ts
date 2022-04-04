import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  constructor() { }
  public counts = ["Recieved","In Progress","Ready for Billing",
  "Billed","Order Closed"];
  public orderStatus = "In Progress"

  ngOnInit(): void {
  }
/* progress bar 
var progress = setInterval(function() {
	var $bar = $('.bar');

   	if ($bar.width()==400) {
        clearInterval(progress);
      	$bar.width(0);
    } else {
        $bar.width($bar.width()+40);
    }
    $bar.text($bar.width()/4 + "%");
  
}, 800);
/**********************/
}
