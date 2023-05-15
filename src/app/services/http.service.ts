import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";
import { environment } from "src/environments/environment";

@Injectable()
export class HttpService{
    constructor(private http:HttpClient)
    {}

    getEmployees(){
        return this.http.get<Employee[]>(environment.api + 'getAll');
    }

    edit(model:any){
        return this.http.put(environment.api + 'edit',model);
    }

    delete(id:string){
        return this.http.delete(environment.api + 'delete/' + id);
    }

    create(model:any){
        console.log(model);
        return this.http.post(environment.api + 'add',model);
    }
}