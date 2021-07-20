import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TODO_JPA_API_URL } from 'src/app/app.constant';
import { Todo } from 'src/app/list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http : HttpClient) { }
  retrieveAllTodos(username:string){
    return this.http.get<Todo[]>(`${TODO_JPA_API_URL}/user/${username}/todos`);
  }
  deleteTodo(username:string,id:number){
    return this.http.delete(`${TODO_JPA_API_URL}/user/${username}/todos/${id}`);
  }
  retrieveTodos(username:string,id:number){
    return this.http.get<Todo>(`${TODO_JPA_API_URL}/user/${username}/todos/${id}`);
  }
  updateTodo(username:string,id:number,todo:Todo){
    return this.http.put(`${TODO_JPA_API_URL}/user/${username}/todos/${id}`,todo);
  }
  createTodo(username:string,todo:Todo){

    return this.http.post(`${TODO_JPA_API_URL}/user/${username}/todos`,todo);
  }
  fetchChapterData(id:string){
    return this.http.get<any>(`http://localhost:8080/chapter/97071ceb-8538-4244-b6a7-d0c3e2a089d8`);
  }
}
