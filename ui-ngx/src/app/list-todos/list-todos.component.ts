import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import {
  TodoDataService
} from '../service/data/todo-data.service';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public isDone: boolean,
    public targetDate: Date
  ) {}
}
@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {
  message: string | undefined
  todos: Todo[] | undefined
  // todos = [
  //       new Todo(1,"Learn Angular",false,new Date()),
  //       new Todo(2,"Learn Spring Boot",false,new Date()),
  //       new Todo(3,"Learn Unit Test",false,new Date()),

  //   // {id : 1,description : 'learn to dance'},
  //   // {id : 2,description : 'Become an expert Angular'},
  //   // {id : 3,description : 'Visit india'}
  // ]
  // todo   = {
  //   id : 1,
  //   description : "Learn To Angular"
  // }
  constructor(private todoDataService: TodoDataService,
    private router : Router) {}

  ngOnInit(): void {
    this.refreshTodo();
  }

  refreshTodo(){
    this.todoDataService.retrieveAllTodos('in28minutes').subscribe(
      respone => {
        console.log(respone);
        this.todos = respone;
      }
    );
  }

  deleteTodo(id: number) {
    this.todoDataService.deleteTodo("in28minutes", id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete todo ${id} Successful 1`;
        this.refreshTodo();
      }
    );
  }
  updateTodo(id:number){
    this.router.navigate(['todo',id]);
  }
  addTodo(){
    this.router.navigate(['todo',-1]);
  }

}
