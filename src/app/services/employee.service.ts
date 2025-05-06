import { EnvironmentInjector, inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Employee } from '../interfaces/employee';
import { runInInjectionContext } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeHoursCollection: AngularFirestoreCollection<Employee>;
  private environmentInjector = inject(EnvironmentInjector);


  constructor(private db: AngularFirestore) {
    // Ensure the collection reference is initialized correctly
    this.employeeHoursCollection =
      this.db.collection<Employee>('employee-hours');
  }

  saveEmployeeHours(employee: Employee): Promise<any> {
    employee.departmentId = employee.departmentId || '0';
    console.log('Saving employee hours:', employee);
    return this.employeeHoursCollection.add(employee);
  }

  getEmployeeHoursByDepartment(departmentId: string): Observable<Employee[]> {
    return from(
      this.employeeHoursCollection.ref
        .where('departmentId', '==', departmentId)
        .get()
        .then((querySnapshot) => {
          return querySnapshot.docs.map((doc) => {
            const data = doc.data() as Employee;
            return {
              id: doc.id, // Ensure the Firestore document ID is assigned to the employee object
              departmentId,
              ...data,
            };
          });
        })
    );
  }

  updateEmployeeHours(employee: Employee): Observable<void> {
    return runInInjectionContext(this.environmentInjector, () => {
      return from(
        this.employeeHoursCollection.doc(employee.id).update({ ...employee })
      );
    });
  }

  deleteEmployeeHours(employee: Employee): Observable<void> {
    return runInInjectionContext(this.environmentInjector, () => {
      return from(this.employeeHoursCollection.doc(employee.id).delete());
    });
  }
}