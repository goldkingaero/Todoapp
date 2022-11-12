import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs/internal/observable/of';
import { Todo } from '../auth/models/todo';
import { TodoService } from '../todo/todo.service';

import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,

       ],
       providers: [BsModalService],
      declarations: [ HomepageComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create  todoForm', () => {
    expect(component.todoForm).toBeDefined();
  });

  it('should todoForm be invalid', () => {
    expect(component.todoForm.invalid).toBeTrue();
  });

  it('should invoke createTodo method on authService when todoForm is submitted',()=>{
    const todoService=fixture.debugElement.injector.get(TodoService);
    expect(component.onSubmit()).toBeFalsy();
    const todoValue="have an meeting at 10:00am";
    component.todoForm.controls['todo'].patchValue("have an meeting at 10:00am");
    const todoSpy=spyOn(todoService, 'createTodo').and.returnValue(of<Todo>({
      id: 2,
      todo:"new one we are going to create"
  }));
  const fetchTodosSpy=spyOn(todoService, 'getTodos').and.returnValue(of<Todo[]>([{
    id: 2,
    todo:"new one we are going to create"
 }]));
  fixture?.ngZone?.run(fakeAsync(()=>{
    component.onSubmit();
     expect(todoSpy).toHaveBeenCalledOnceWith(todoValue);

     expect(fetchTodosSpy).toHaveBeenCalled();
   }))
  })

  it('should invoke callTodoFunc on callFunc event', () => {

    let todoComp= fixture.debugElement.query(By.css('[data-test-id="app-todos"]'));
    const callTodoFuncSpy = spyOn(component, 'callTodoFunc').and.callThrough();
    const fetchTodoFuncSpy = spyOn(component, 'fetchTodos');
    todoComp.nativeElement.dispatchEvent(new Event('callFunc'));
    fixture.detectChanges();
    expect(callTodoFuncSpy).toHaveBeenCalled();
    expect(fetchTodoFuncSpy).toHaveBeenCalledTimes(1);

  })
});
