import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from '../auth/models/todo';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpTestingController: HttpTestingController;
  const todos: Todo[] = [
    { id: 1, todo: 'Learn HTML' },
    { id: 2, todo: 'Learn CSS' },
    { id: 3, todo: 'Learn JS' },
  ];
  const baseUrl = 'http://localhost:3000/todos';
  const newTodo = 'Learn Angular';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TodoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should make a post request to ${baseUrl} url with todo data`, () => {
    let result;
    service.createTodo(newTodo).subscribe((res) => (result = res));

    const httpMock = httpTestingController.expectOne({
      method: 'POST',
      url: baseUrl
    })

    expect(httpMock.cancelled).toBeFalsy();
    expect(httpMock.request.responseType).toEqual('json');
    httpTestingController.verify();
  });
  it(`should make a get request to ${baseUrl} url to fetch todos data`, () => {
    let result;
    service.getTodos().subscribe((res) => (result = res));

    const httpMock = httpTestingController.expectOne({
      method: 'GET',
      url: baseUrl
    })

    expect(httpMock.cancelled).toBeFalsy();
    expect(httpMock.request.responseType).toEqual('json');
    httpTestingController.verify();
  });

  it(`should make a get request to ${baseUrl}/1 url to fetch todo data`, () => {
    let result;
    service.getTodoById(1).subscribe((res) => (result = res));

    const httpMock = httpTestingController.expectOne({
      method: 'GET',
      url: `${baseUrl}/1`
    })

    expect(httpMock.cancelled).toBeFalsy();
    expect(httpMock.request.responseType).toEqual('json');
    httpTestingController.verify();
  });

  it(`should make a delete request to ${baseUrl}/1 url to delete todo`, () => {
    let result;
    service.deleteTodo(1).subscribe((res) => (result = res));

    const httpMock = httpTestingController.expectOne({
      method: 'DELETE',
      url: `${baseUrl}/1`
    })

    expect(httpMock.cancelled).toBeFalsy();
    expect(httpMock.request.responseType).toEqual('json');
    httpTestingController.verify();
  });

  it(`should make a put request to ${baseUrl}/1 url to update todo`, () => {
    let result;
    service.updateTodo({id: 1, todo: 'Learn Angular'}).subscribe((res) => (result = res));

    const httpMock = httpTestingController.expectOne({
      method: 'PUT',
      url: `${baseUrl}/1`
    })

    expect(httpMock.cancelled).toBeFalsy();
    expect(httpMock.request.responseType).toEqual('json');
    httpTestingController.verify();
  });

});
