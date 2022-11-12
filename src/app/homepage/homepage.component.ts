import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../auth/models/todo';
import { TodoService } from '../todo/todo.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  todolist:Todo[]=[];
  todoForm:FormGroup;
  constructor(private fb:FormBuilder,private todoService:TodoService ) {
    this.todoForm=this.fb.group({
       todo:['',[Validators.required,Validators.minLength(9)]]
    });
  }

  ngOnInit(): void {
    this.fetchTodos();

  }


  onSubmit(){

    if(this.todoForm.invalid){return;}

     let value=this.todoForm.get('todo')?.value;
     this.todoForm.reset();
    this.todoService.createTodo(value).subscribe((res) => {
      console.log(res);
      this.fetchTodos();
     });

  }


  fetchTodos() {
    this.todoService.getTodos().subscribe((res) => {
      this.todolist = res;

    });
  }
  callTodoFunc(){
    this.fetchTodos();
  }
}
