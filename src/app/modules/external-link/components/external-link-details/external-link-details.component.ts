import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ExternalLinkService } from '../../external-link.service';
import { Subject, takeUntil } from 'rxjs';
import { ExternalLink } from '../../models/external-link.model';

@Component({
  selector: 'external-link-details',
  templateUrl: './external-link-details.component.html',
  styleUrls: ['./external-link-details.component.scss']
})
export class ExternalLinkDetailsComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  externalLinks: ExternalLink[] = [];
  @Input() projectId?: number;

  constructor(private externalLinkService: ExternalLinkService){}

  ngOnInit(): void {
    if(this.projectId){
      this.externalLinkService.getExternalLinks(this.projectId).pipe(takeUntil(this.unsubscribe$))
      .subscribe(externalLinks => {
      this.externalLinks = externalLinks.filter(link => link.url);
      })
    }
   
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
