import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'

@Component({
  selector: 'diploma',
  templateUrl: './diploma.component.html',
  styleUrls: ['./diploma.component.scss'],
})
export class DiplomaComponent implements OnInit, OnDestroy {


  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }
}
