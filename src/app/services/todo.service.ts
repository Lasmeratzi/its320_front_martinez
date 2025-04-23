import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:5000/api/todos';  // Direct URL

  constructor(private http: HttpClient) {}

  async getTodos(): Promise<any[]> {
    try {
      const todos = await this.http.get<any[]>(this.apiUrl).toPromise();
      return todos ?? [];
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  async createTodo(todo: { text: string }): Promise<any> {
    try {
      return await this.http.post<any>(this.apiUrl, todo).toPromise();
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  }

  async deleteTodo(todoId: string): Promise<void> {
    try {
      await this.http.delete(`${this.apiUrl}/${todoId}`).toPromise();
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }

  // Update a todo by its ID
  async updateTodo(todoId: string, updatedTodo: { text: string }): Promise<any> {
    try {
      return await this.http.put<any>(`${this.apiUrl}/${todoId}`, updatedTodo).toPromise();
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }
}
