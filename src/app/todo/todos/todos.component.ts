import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/auth/models/todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  @Input('todos') todos?: Todo[];
  @Output('callFunc') todoId: EventEmitter<number> = new EventEmitter();;
  constructor(private todoService:TodoService,private router:Router) { }

  ngOnInit(): void {
  }


  handleDeleteTodo(todo:Todo) {


    this.todoService.deleteTodo(todo.id).subscribe(() => {
      this.todoId.emit(1);
     console.log("success");
    });
  }
}
