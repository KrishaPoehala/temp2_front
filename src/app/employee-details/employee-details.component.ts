import { Observable, first } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { isAdding, isEditing, selectCurrentEmployee } from '../store/app.selectors';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Genre } from '../models/genre.enum';
import { addEmployee, editChanged, editEmployee, isAddingChanged } from '../store/app.actions';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(private store:Store<AppState>)
  {}

  selectedEmployee$!:Observable<Employee | undefined>;
  isAdding$!:Observable<boolean>;
  isEditing$!:Observable<boolean>;
  genres:Genre[] = [Genre.Male, Genre.Female];
  selectedGenre!:Genre;
  ngOnInit(): void {
    this.selectedEmployee$ = this.store.select(selectCurrentEmployee);
    this.isAdding$ = this.store.select(isAdding);
    this.isEditing$ = this.store.select(isEditing);
    this.addModel = {
      id:uuidv4(),
      firstName:'',
      lastName:'',
      city:'',
      genre:Genre.Male,
    };
  }

  addModel!:Employee;
  onAdd(){
    this.store.dispatch(addEmployee({newEmpl:this.addModel}));
    this.store.dispatch(isAddingChanged());
  }

  onEdit(e:Employee){
    console.log(e);
    
    this.store.dispatch(editEmployee({emplToEdit:e}));
    this.store.dispatch(editChanged());
  }
}
