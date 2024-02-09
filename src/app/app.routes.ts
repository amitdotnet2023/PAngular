import { Routes } from '@angular/router';
import { TodoListComponent } from './views/todo-list/todo-list.component';

export const routes: Routes = [

    { path: '', redirectTo: 'todoviewpage', pathMatch: 'full' },
    { path: 'todoviewpage', component: TodoListComponent },

];
