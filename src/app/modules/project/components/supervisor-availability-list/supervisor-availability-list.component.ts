import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SupervisorAvailability } from '../../models/supervisor-availability.model';

@Component({
  selector: 'supervisor-availability-list',
  templateUrl: './supervisor-availability-list.component.html',
  styleUrls: ['./supervisor-availability-list.component.scss']
})
export class SupervisorAvailabilityListComponent {
  @Input() columns!: string[]
  @Input() supervisorAvailability!: MatTableDataSource<SupervisorAvailability>
}
