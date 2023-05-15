import { createAction, props } from "@ngrx/store";
import { Employee } from "../models/employee.model";


export const getAllEmployeesAction = createAction(
    '[Employees component] get all employees');

export const getAllEmployeesActionSuccess = createAction(
    '[Employees component] get all employyess success',
    props<{employees:Employee[]}>()
)

export const getAllEmployeesActionFailure = createAction(
    '[Employees component] get all employyess failure',
    props<{error:any}>()
)

export const employeeSelectionChanged = createAction(
    '[Employees component] selection changed',
    props<{employee:Employee}>()
)

export const isAddingChanged = createAction(
    '[Employees component] changed'
);

export const addEmployee = createAction('[Employees] add',
    props<{newEmpl:Employee}>()
);

export const addEmployeeSuccess = createAction('[Empye] add sucess',
props<{newEmpl:Employee}>());


export const editChanged = createAction('[Empl] editing changed');
export const editEmployee = createAction('[Employees] edit',
props<{emplToEdit:Employee}>()
);

export const editEmployeeSuccess = createAction('[Employees] edit success',
props<{editedEmpl:Employee}>());

export const deleteEmployee = createAction('[Employee] delete',
props<{id:string}>());

export const deleteEmployeeSuccess = createAction('Employee delete success',
props<{id:string}>());
