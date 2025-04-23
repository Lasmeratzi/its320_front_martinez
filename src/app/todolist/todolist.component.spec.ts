import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodolistComponent } from './todolist.component';
import { TodoService } from '../services/todo.service';
import { of } from 'rxjs';

// Mock TodoService
class MockTodoService {
  getTodos() {
    return of([{ _id: '1', text: 'Test Todo' }]);
  }
  createTodo(todo: { text: string }) {
    return of({ _id: '2', text: todo.text });
  }
  deleteTodo(todoId: string) {
    return of({ _id: todoId });
  }
  updateTodo(todoId: string, todo: { text: string }) {
    return of({ _id: todoId, text: todo.text });
  }
}

describe('TodolistComponent', () => {
  let component: TodolistComponent;
  let fixture: ComponentFixture<TodolistComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodolistComponent, ReactiveFormsModule, CommonModule],
      providers: [{ provide: TodoService, useClass: MockTodoService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodolistComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a todo', async () => {
    await component.addTodo();
    expect(component.todos.length).toBe(2);  // One test todo + one added
  });

  it('should edit a todo', () => {
    component.editTodo({ _id: '1', text: 'Test Todo' });
    expect(component.currentlyEditing).toEqual({ _id: '1', text: 'Test Todo' });
  });

  it('should update a todo', async () => {
    component.currentlyEditing = { _id: '1', text: 'Test Todo' };
    component.todoInput.setValue('Updated Todo');
    await component.updateTodo();
    expect(component.todos[0].text).toBe('Updated Todo');
  });

  it('should remove a todo', async () => {
    await component.removeTodo('1');
    expect(component.todos.length).toBe(0);
  });
});
