import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../../interfaces/department';
import { DepartmentsService } from '../../services/departments.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-timesheet',
  standalone: false,
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.scss'
})
export class TimesheetComponent {
  
  departments: Department[] | undefined;
  department: Department | undefined;
  employeeNameFC = new FormControl('');
  
  
  constructor(
    private route: ActivatedRoute,
    private departmentsService: DepartmentsService
  ) {}

  ngOnInit(): void {
    this.departments = this.departmentsService.departments;
    this.department = this.departments.find(department => department.id === this.route.snapshot.params['id']);
  }
}
