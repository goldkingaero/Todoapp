import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {  BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs/internal/observable/of';
import { Todo } from 'src/app/auth/models/todo';
import { TodoService } from '../todo.service';

import { TodosComponent } from './todos.component';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule, RouterTestingModule,FormsModule,
        ReactiveFormsModule],
        providers: [BsModalService],
      declarations: [ TodosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create updateForm', () => {
    expect(component.updateForm).toBeDefined();
  });

  it('should updateForm be invalid', () => {
    expect(component.updateForm.invalid).toBeTrue();
  });

  it('should invoke updateTodo method on todoService when updateForm is submitted',()=>{
    const todoService=fixture.debugElement.injector.get(TodoService);
    expect(component.onSubmit()).toBeFalsy();
    component.updateForm.controls['todo'].patchValue("have an meeting at 10:00am");
    component.id=2
    let obj={
      id: 2,
      todo:"have an meeting at 10:00am"
    };
    const todoServiceSpy=spyOn(todoService, 'updateTodo').and.returnValue(of<any>(obj));

    fixture?.ngZone?.run(fakeAsync(()=>{
    component.onSubmit();
     expect(todoServiceSpy).toHaveBeenCalledOnceWith(obj);

  }))
  })

  it('should invoke editTodo method when  edit img is clicked',()=>{
    let todo:Todo[]  =[{
      id: 2,
      todo:"have an meeting at 10:00am"
    }];
    component.todos=todo;
    fixture.detectChanges();
   let elem= fixture.debugElement.query(By.css('[data-test-id="edit-img"]'));
   const editTodospy = spyOn(component, 'editTodo').and.callThrough();
   elem.triggerEventHandler('click',null);
    expect(editTodospy).toHaveBeenCalledTimes(1);
    expect(component.todos).toHaveSize(1);
 });

 it('should invoke handleDeleteTodo method when  trash img is clicked',()=>{
  let todo:Todo[]  =[{
    id: 2,
    todo:"have an meeting at 10:00am"
  }];
  component.todos=todo;
  fixture.detectChanges();
  const todoService=fixture.debugElement.injector.get(TodoService);
 let elem= fixture.debugElement.query(By.css('[data-test-id="del-img"]'));
 const deleteTodospy = spyOn(component, 'handleDeleteTodo').and.callThrough();
 const todoSpy=spyOn(todoService, 'deleteTodo').and.returnValue(of({id:1}));
 const eventSpy = spyOn(component.todoId, 'emit');
 elem.triggerEventHandler('click',null);
  expect(deleteTodospy).toHaveBeenCalledTimes(1);
  expect(todoSpy).toHaveBeenCalled();
  expect(eventSpy).toHaveBeenCalled();


});
});
