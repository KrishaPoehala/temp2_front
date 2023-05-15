import { addEmployee, addEmployeeSuccess, deleteEmployee, deleteEmployeeSuccess, editEmployee, editEmployeeSuccess, getAllEmployeesAction, getAllEmployeesActionFailure, getAllEmployeesActionSuccess } from './app.actions';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of } from 'rxjs';
import { HttpService } from '../services/http.service';

@Injectable()
export class AppEffects{
    getAllEmployees$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(getAllEmployeesAction),
          concatMap((action) =>
            this.http.getEmployees().pipe(
              map((result) => {
                return getAllEmployeesActionSuccess({employees:result});
              }),
              catchError((error) => {
                return of(getAllEmployeesActionFailure({ error:error}))
              }
              )
            )
          )
        );
      });

    addEmpl$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addEmployee),
            concatMap((action) => 
            this.http.create(action.newEmpl).pipe(
                map(_ => addEmployeeSuccess({newEmpl:action.newEmpl}))
            )
            )
        );
    });

    editEmpl$ =  createEffect(() => {
        return this.actions$.pipe(
            ofType(editEmployee),
            concatMap((action) => 
            this.http.edit(action.emplToEdit).pipe(
                map(_ => editEmployeeSuccess({editedEmpl:action.emplToEdit}))
            )
            )
        );
    });

    deleteEmpl$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteEmployee),
            concatMap((action) => 
            this.http.delete(action.id).pipe(
                map(_ => deleteEmployeeSuccess({id:action.id}))
            )
            )
        );
    })

    constructor(private actions$:Actions,private http:HttpService)
    {}
}