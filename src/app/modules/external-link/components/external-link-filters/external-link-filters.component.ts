import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Supervisor } from 'src/app/modules/user/models/supervisor.model';
import { ExternalLinkService } from '../../external-link.service';
import { UserService } from 'src/app/modules/user/user.service';

@Component({
  selector: 'external-link-filters',
  templateUrl: './external-link-filters.component.html',
  styleUrls: ['./external-link-filters.component.scss']
})
export class ExternalLinkFiltersComponent implements OnInit {
  supervisors$!: Observable<Supervisor[]>
  searchValue: string = '';
  supervisorIndexNumber: string | undefined;

  constructor(private externalLinkService: ExternalLinkService, private userService: UserService){}

  ngOnInit(): void {
    this.supervisors$ = this.userService.supervisors$;
  }

  onFiltersChange(){
    this.externalLinkService.updateFilters({
      searchValue: this.searchValue,
      supervisorIndexNumber: this.supervisorIndexNumber
    })
  }

  resetFilters(){
    this.searchValue = '';
    this.supervisorIndexNumber = undefined;
    this.onFiltersChange()
  }

  isAnyFilterActive(): boolean {
    return (this.searchValue !== '' || this.supervisorIndexNumber !== undefined)
  }
}
