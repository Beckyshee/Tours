import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent {
addTour!: FormGroup
constructor(private fb:FormBuilder, ){

  
this.addTour = this.fb.group({
  tourTitle: ['',[Validators.required]],
  destination: ['',[Validators.required]],
  duration: ['',[Validators.required]],
  price: ['',[Validators.required]],
  tourType: ['',[Validators.required]],
  tourImage: ['',[Validators.required]],
  shortDescription: ['',[Validators.required]],
 

})
}

createTour(){
  console.log("sadasdasdasdasd");
  
}
}
