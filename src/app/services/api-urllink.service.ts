import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiUrllinkService {

  CreateTodoList:any;
  GetTodoById:any;
  GetAllTodoList:any;
  UpdateTodoList:any;
  DeleteTodoList:any;

  constructor() {

    this.CreateTodoList = environment.apiKey + 'TodoMaster/Create-TodoList'
    this.GetTodoById = environment.apiKey + 'TodoMaster/GetTodo-ById/'
    this.GetAllTodoList = environment.apiKey + 'TodoMaster/GetAll-TodoList'
    this.UpdateTodoList = environment.apiKey + 'TodoMaster/Update-TodoList'
    this.DeleteTodoList = environment.apiKey + 'TodoMaster/Delete-TodoList/'

   }
}
