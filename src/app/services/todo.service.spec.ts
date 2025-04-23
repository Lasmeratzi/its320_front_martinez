import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { apiUrl } from '../constant/constant';  // Import apiUrl from constant.ts

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a todo', async () => {
    const dummyTodo = { text: 'Test Todo' };

    const promise = service.createTodo(dummyTodo);
    const req = httpMock.expectOne(`${apiUrl}/todos`);  // Use apiUrl from constant.ts
    expect(req.request.method).toBe('POST');
    req.flush(dummyTodo);

    const result = await promise;
    expect(result).toEqual(dummyTodo);
  });

  it('should delete a todo', async () => {
    const todoId = '123';

    const promise = service.deleteTodo(todoId);
    const req = httpMock.expectOne(`${apiUrl}/todos/${todoId}`);  // Use apiUrl from constant.ts
    expect(req.request.method).toBe('DELETE');
    req.flush(null);

    await promise; // just wait for it to resolve
    expect(true).toBeTrue(); // confirm no errors thrown
  });

  afterEach(() => {
    httpMock.verify();
  });
});
