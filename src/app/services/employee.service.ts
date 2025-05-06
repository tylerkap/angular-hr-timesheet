import { EnvironmentInjector, inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Employee } from '../interfaces/employee';
import { runInInjectionContext } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
    private environmentInjector = inject(EnvironmentInjector);
    private employeeHoursCollection: AngularFirestoreCollection<Employee>;

  constructor(private db: AngularFirestore) {
    // Initialize collection reference in the constructor where injection context is available
    this.employeeHoursCollection = this.db.collection('employee-hours');
  }

    saveEmployeeHours(employee: Employee): any {
        return runInInjectionContext(this.environmentInjector, () => {
            this.db.collection('employee-hours').add(employee);
        })
    }
}