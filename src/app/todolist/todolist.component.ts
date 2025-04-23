import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  todos: any[] = [];
  todoInput = new FormControl('');
  currentlyEditing: any = null;  // New property to track the todo being edited

  constructor(private todoService: TodoService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.todos = await this.todoService.getTodos();
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  async addTodo(): Promise<void> {
    const value = this.todoInput.value?.trim();
    if (!value) return;

    try {
      const newTodo = await this.todoService.createTodo({ text: value });
      this.todos.push(newTodo);
      this.todoInput.setValue(''); // Clear the input field
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  async removeTodo(todoId: string): Promise<void> {
    try {
      await this.todoService.deleteTodo(todoId);
      this.todos = this.todos.filter(todo => todo._id !== todoId);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  // Method to edit a todo
  editTodo(todo: any): void {
    this.currentlyEditing = { ...todo }; // Set the currently editing todo
    this.todoInput.setValue(todo.text);  // Populate the input field
  }

  // Method to update a todo
  async updateTodo(): Promise<void> {
    if (this.currentlyEditing) {
      const updatedText = this.todoInput.value?.trim();
      if (!updatedText) return;

      try {
        const updatedTodo = await this.todoService.updateTodo(this.currentlyEditing._id, { text: updatedText });
        const index = this.todos.findIndex(todo => todo._id === updatedTodo._id);
        this.todos[index] = updatedTodo;  // Update the todo in the list
        this.todoInput.setValue(''); // Clear the input field
        this.currentlyEditing = null;  // Reset currentlyEditing
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
  }
}
