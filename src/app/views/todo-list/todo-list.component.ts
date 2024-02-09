import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApihttpService } from '../../services/apihttp.service';
import { ApiUrllinkService } from '../../services/api-urllink.service';
import { HttpClientModule } from '@angular/common/http';
import { NgForOf } from '@angular/common';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [HttpClientModule, NgForOf, ReactiveFormsModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {

  todolistData: any = []
  todoAddForm!: FormGroup;
  todoEditForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private httpurl: ApihttpService,
    private apiUrlSer: ApiUrllinkService,
  ) {
  }

  ngOnInit(): void {

    this.GetAllTodoListCom(); // get all todolist


    // Add Todo List

    this.todoAddForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      number: ['', Validators.required]
    })

    this.todoEditForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      number: ['', Validators.required]
    })


  }



  CreateTodoListCom() {

    if (this.todoAddForm.valid) {
      this.httpurl.post(this.apiUrlSer.CreateTodoList, this.todoAddForm.value).subscribe({
        next: (value) => {
          console.log(value);
          this.todoAddForm.reset();
          this.GetAllTodoListCom(); // get all todolist
          Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success"
          });

        },
        error: (err) => {
          console.error('Error occurred:', err.error.message);
          Swal.fire({
            icon: "error",
            text: err.error.message,
          });
        }
      });
    }
    else {
      console.error('Error occurred:');
    }
  }


  GetTodoByIdCom(TodoId: any) {

    this.httpurl.get(this.apiUrlSer.GetTodoById + TodoId).subscribe({
      next: (value) => {
        console.log(value);

        const todoItem = {
          id: value.data.id,
          name: value.data.name,
          email: value.data.email,
          number: value.data.number
        };

        this.todoEditForm.patchValue(todoItem);


      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });

    console.log(TodoId);
  }

  GetAllTodoListCom() {
    this.httpurl.get(this.apiUrlSer.GetAllTodoList).subscribe({
      next: (value) => {
        console.log(value);
        this.todolistData = value;
      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });
  }

  UpdateTodoListCom() {

    if (this.todoEditForm.valid) {
      this.httpurl.put(this.apiUrlSer.UpdateTodoList, this.todoEditForm.value).subscribe({
        next: (value) => {
          console.log(value);
          this.todoEditForm.reset();
          this.GetAllTodoListCom(); // get all todolist
          Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success"
          });

        },
        error: (err) => {
          console.error('Error occurred:', err.error.message);
          Swal.fire({
            icon: "error",
            text: err.error.message,
          });
        }
      });
    }
    else {
      console.error('Error occurred:');
    }


  }

  DeleteTodoListCom(TodoId: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpurl.delete(this.apiUrlSer.DeleteTodoList + TodoId).subscribe({
          next: (value) => {
            console.log(value);
            this.GetAllTodoListCom(); // get all todolist
          },
          error: (err) => {
            console.error('Error occurred:', err);
          }
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your todo list has been deleted.",
          icon: "success"
        });
      }
    });
  }



}
