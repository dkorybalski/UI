import {Component, OnDestroy, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {DiplomaWithProject} from '../../models/diploma.model'

@Component({
  selector: 'diploma-details',
  templateUrl: './diploma-details.component.html',
  styleUrls: ['./diploma-details.component.scss']
})
export class DiplomaDetailsComponent implements OnInit, OnDestroy {
  diplomaWithProject!: DiplomaWithProject

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.diplomaWithProject = history.state.diploma
  }

  navigateBack(): void {
    this.router.navigate([{outlets: {modal: null}}])
  }

  ngOnDestroy(): void {

  }
}
