import { CommonModule, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDo } from './models/to-do';
import { FormsModule } from '@angular/forms';
import { find } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DecimalPipe, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title:string = 'To-Do List';

myList:ToDo[] = [
  {
    task: "Exercise",
    completed: false,
    duration: .5,
    priority: 1
  },
  {
    task: "Relax Reading",
    completed: false,
    duration: 1,
    priority: 3
  },
  {
    task: "Walk Dog",
    completed: true,
    duration: .5,
    priority: 2
  },
  {
    task: "Mow Lawn",
    completed:false,
    duration: 3,
    priority: 3
  }
];

deleteTask(targetTask:ToDo):void{
  let index: number = this.myList.findIndex(i => i == targetTask)
  this.myList.splice(index, 1)
}

showPriority(num:number):string{
  if(num == 3){

    return "Low Priority ↓ "
  }
  else if(num == 2){
    return ""
  }
  else if(num == 1){
    return " High Priority ↑ "
  }
  return ""
}

formTask: ToDo = {} as ToDo

completeTask(targetTask:ToDo):void{
  if(targetTask.completed == true){
    targetTask.completed = false
  }
  else{
    targetTask.completed = true
  }
}

addTask():void{
  let newTask: ToDo = { ...this.formTask}, completed: false;
  this.myList.push(newTask)

}

IsListCompleted():boolean{
  //No items
  if(this.myList.length == 0){
    return true;
  }
  //any incomplete
  let allComplete: boolean = true;
  this.myList.forEach((t:ToDo) => {
    if (t.completed == false){
      allComplete = false;
    }
  });
      //all complete
      return allComplete;

}

filter:string=""

GetFiltered():ToDo[] {
  if(this.filter == ""){
    return this.myList;
  }
  else{
    return this.myList.filter((t: ToDo) => t.task.toLowerCase().includes(this.filter.toLowerCase()));
  }
}


}


