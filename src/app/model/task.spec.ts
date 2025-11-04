import { Task } from './task';

describe('Task', () => {
  it('should create an instance', () => {
    const task: Task = {
      id: 1,
      name: 'Test task'
    };
    expect(task.id).toBeDefined();
    expect(task.name).toBeDefined();
  });
});
