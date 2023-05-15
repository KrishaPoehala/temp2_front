import { Employee } from "../models/employee.model"
import { addEmployeeSuccess, deleteEmployeeSuccess, editChanged, employeeSelectionChanged, getAllEmployeesActionSuccess, isAddingChanged } from './app.actions';
import { createReducer, on } from '@ngrx/store';
import { isEditing } from "./app.selectors";

export const appFeatureKey = "app-key"

export interface State {
    employees:Employee[],
    error:any,
    selectedEmployee:Employee | undefined,
    isAdding:boolean,
    isEditing: boolean,
};

export const initialState:State = {
    employees:[],
    error:null,
    selectedEmployee:undefined,
    isAdding:false,
    isEditing:false,
};

export const reducer = createReducer(initialState,
    on(getAllEmployeesActionSuccess, (state,action) => {
        return {
            ...state,
            employees:action.employees,
            selectedEmployee: action.employees.at(0)

        }
    }),
    on(employeeSelectionChanged, (state,action) => {
        return {
            ...state,
            selectedEmployee:action.employee,
        }
    }),
    on(isAddingChanged, (state,action) => {
        return {
            ...state,
            isAdding : !state.isAdding,
            isEditing:false,
        }
    }),
    on(addEmployeeSuccess, (state,action) => {
        return {
            ...state,
            employees:[...state.employees, action.newEmpl]
        }
    }),
    on(editChanged, (state,action) => {
        return {
            ...state,
            isEditing: !state.isEditing
        }
    }),
    on(deleteEmployeeSuccess, (state,action) => {
        let e = state.employees.filter(x => x.id !== action.id).slice();
        return {
            ...state,
            employees:e,
        }
    })
)