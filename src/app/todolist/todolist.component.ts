import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent {
  todoInput = new FormControl('');
  todos: string[] = [];

  addTodo() {
    const value = this.todoInput.value?.trim();
    if (value) {
      this.todos.push(value); // Add task to the list
      this.todoInput.reset(); // Clear input field
    }
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1); // Remove the selected task
  }
}
