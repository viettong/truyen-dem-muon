import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  id :  any 
  todo :  Todo|any

  constructor(private todoDataService : TodoDataService,
    private router : ActivatedRoute,
    private route : Router) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, new Date());

    if(this.id!=-1){
      this.todoDataService.retrieveTodos('in28minutes',this.id).subscribe(
        data => {
          this.todo = data;
          console.log(this.todo);
        }
      );
    }
    else{
    
    }
  }

  saveTodo(){
    console.log(this.id == -1 );
    
    if(this.id == -1){
      //create
      this.todoDataService.createTodo('in28minutes',this.todo).subscribe(
        data => {
          console.log(data);
         this.route.navigate(['todos']);
        }
      );
    }
    else{//update
      this.todoDataService.updateTodo('in28minutes',this.id,this.todo).subscribe(
        data => {
          console.log(data);
        this.route.navigate(['todos']);
        }
      );
    }
  }

}
