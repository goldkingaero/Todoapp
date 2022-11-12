import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/auth/models/todo';
import { TodoService } from '../todo.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  @Input('todos') todos?: Todo[];
  @Output('callFunc') todoId: EventEmitter<number> = new EventEmitter();
  updateForm:FormGroup;
  todoContent:string='';
  id:number=0;
  constructor(private todoService:TodoService,private router:Router,private formBuilder: FormBuilder,private modalService: BsModalService) {

    this.updateForm=this.formBuilder.group({
      todo:['',[Validators.required,Validators.minLength(9)]]
   });
   }

  ngOnInit(): void {
  }

  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  handleDeleteTodo(todo:Todo) {


    this.todoService.deleteTodo(todo.id).subscribe(() => {
      this.todoId.emit(1);
     console.log("success");
    });
  }

  editTodo(todo:Todo,template: TemplateRef<any>) {

    this.updateForm.reset();
    this.updateForm.setValue({todo: todo.todo});
    this.id=todo.id;
    this.modalRef = this.modalService.show(template, this.config);
  }

  onSubmit(){

    if(this.updateForm.invalid){return;}

     let value=this.updateForm.get('todo')?.value;
     console.log(value);
     this.updateForm.reset();
     let obj={
      todo:value,
      id:this.id
     }
     this.todoService.updateTodo(obj).subscribe((res) => {
      this.modalRef?.hide();
      this.todoId.emit(1);
     });

  }


}
