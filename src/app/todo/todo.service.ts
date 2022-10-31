import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Todo } from '../auth/models/todo';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  createTodo(todo: string) {
    const todoObj = new Todo(todo);
    return this.http.post<Todo>(`http://localhost:3000/todos`, todoObj);
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`http://localhost:3000/todos`);
  }

  getTodoById(id: number) {
    return this.http.get<Todo>(`http://localhost:3000/todos/${id}`);
  }

  deleteTodo(id: number) {

    return this.http.delete(`http://localhost:3000/todos/${id}`)
  }

}
