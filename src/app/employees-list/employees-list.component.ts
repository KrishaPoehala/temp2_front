import { Component, OnInit } from '@angular/core';
import { AppState } from '../store/app.state';
import { State, Store } from '@ngrx/store';
import * as appActions from '../store/app.actions'
import { Observable, firstValueFrom } from 'rxjs';
import { Employee } from '../models/employee.model';
import { selectCurrentEmployee, selectEmployees } from '../store/app.selectors';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  constructor(private readonly state:Store<AppState>)
  {}

  employees$!:Observable<Employee[]>
  current$!:Observable<Employee | undefined>;
  ngOnInit(): void {
    this.state.dispatch(appActions.getAllEmployeesAction());
    this.current$ = this.state.select(selectCurrentEmployee);
    this.employees$ = this.state.select(selectEmployees);
  }

  onAdd(){
    this.state.dispatch(appActions.isAddingChanged())
  }

  onEdit(){
    this.state.dispatch(appActions.editChanged())
  }

  changeSelection(e:Employee){
    this.state.dispatch(appActions.employeeSelectionChanged({employee:e}));
  }

  async onDelete(){
    const toDelete = await firstValueFrom(this.current$);
    if(!toDelete){
      return;
    }

    this.state.dispatch(appActions.deleteEmployee({id:toDelete.id}));
  }
}
