import ClassStudent from "./class-student.tsx";
import ClassTeacher from "./class-teacher.tsx";

export default function ClassMain () {

  // role: 0是学生，1是老师
  const role = Number(localStorage.getItem('user:role'));

  // 学生端
  if (role === 0) {
    return (<ClassStudent />);
  }

  // 教师端
  if (role === 1) {
    return (<ClassTeacher />);
  }

  return (<></>);

}