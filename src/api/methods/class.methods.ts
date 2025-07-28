import alova from "../index.ts";
import {Class, CreateTaskDTO, Task} from "../types/class.types.ts";
import {ArticleInfo} from "../types/article.types.ts";

// 老师创建班级
export const teacherCreateClass =
  (className: string) => alova.Post<string>('/class/t/classes', {'name': className})

// 老师查询班级
export const teacherGetClasses =
  () => alova.Get<Class[]>('/class/t/classes')

// 老师创建任务
export const teacherCreateTask =
  (createTaskDTO: CreateTaskDTO) => alova.Post('/class/t/tasks', createTaskDTO)

// 老师查询任务
export const teacherGetTasks =
  () => alova.Get<Task[]>('/class/t/tasks')

// 学生加入班级
export const studentJoinClass =
  (classCode: string) => alova.Post('/class/s/classes', {'class': classCode})

// 学生查询班级
export const studentGetClasses =
  () => alova.Get<Class[]>('/class/s/classes')

// 学生查询任务
export const studentGetTasks =
  () => alova.Get<Task[]>('/class/s/tasks')

// 学生查询任务文章
export const studentGetTaskArticle =
  (taskId: string) => alova.Get<ArticleInfo>('/class/s/task', {params: {taskId}})

// 学生完成任务
export const studentFinishTask =
  (classCode: string, taskId: string) => alova.Post('/class/s/tasks', { classCode, taskId })
