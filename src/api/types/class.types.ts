export interface CreateTaskDTO {
  class: string;
  type: 'article';
  title: string;
  content: string;
}

export interface Class {
  code: string;
  name: string;
  studentCount?: number;
}

export interface Task {
  id: string;
  classCode: string;
  className: string;
  type: 'article';
  title: string;
  content: Array<Array<Array<string>>>;
  time: number;
  done: number;
}
