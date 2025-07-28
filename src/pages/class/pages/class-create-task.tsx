import {useLocation, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {toast} from "../../../common/utils/toast.util.tsx";
import {teacherCreateTask} from "../../../api/methods/class.methods.ts";
import Select from "../../../common/components/select.tsx";
import {Class, CreateTaskDTO} from "../../../api/types/class.types.ts";

export default function ClassCreateTask () {

  const navigate= useNavigate();

  const location = useLocation();
  const {classes}: {classes: Class[]} = location.state || {classes: []};
  const classesOptions = classes.map((classItem) => ({
    'label': classItem.name,
    'value': classItem.code
  }));
  const initialSelectedClassCode = classes.length > 0 ? classes[0].code : '';
  const [selectedClassCode, setSelectedClassCode] = useState<string>(initialSelectedClassCode);

  const [selectedType, setSelectedType] = useState<string>('article');
  const typeOptions = [
    { label: '文章', value: 'article' }
  ];

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  return (
    <div className="w-11/12 px-3 my-[72px] flex flex-col items-center gap-4">
      {/* 标题 */}
      <p className="absolute top-5 w-full text-center text-3xl font-bold">创建任务</p>

      <div className="w-full flex flex-col gap-4">
        <Select label="选择班级" value={selectedClassCode}
                onChange={(value) => {
                  setSelectedClassCode(value);
                }}
                options={classesOptions}
                selectClassName="pr-1.5 pl-0.5 w-fit h-[42px]" spanClassName="w-fit h-[42px] text-nowrap shrink-0"
        />
        <Select label="任务类型" value={selectedType}
                onChange={(value) => {
                  setSelectedType(value);
                }}
                options={typeOptions}
                selectClassName="pr-1.5 pl-0.5 w-fit h-[42px]" spanClassName="w-fit h-[42px] text-nowrap shrink-0"
        />

        {/* 任务标题 */}
        <p>任务标题：</p>
        <input className="w-full h-16 px-2 py-1 border-2 border-black rounded-md text-[18px]"
               placeholder="请输入任务标题"
               value={title}
               onChange={(event) => setTitle(event.target.value)}
        />
        <textarea className="w-full h-96 px-1.5 py-1 rounded-md border-2 border-black hide-scrollbar text-[18px]"
                  placeholder="请输入文章内容"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
        />

        <div className="btn-trans btn-scale-sm w-full py-2 px-3 my-2 bg-white rounded-lg shadow-md border-black
        border-2 flex items-center justify-center hover:shadow-lg text-2xl font-bold"
             onClick={() => {
               if (selectedClassCode.trim() === '') {
                 toast.error('班级不能为空');
                 return;
               }
               if (selectedType.trim() === '') {
                 toast.error('任务类型不能为空');
                 return;
               }
               if (title.trim() === '') {
                 toast.error('标题不能为空');
                 return;
               }
               if (content.trim() === '') {
                 toast.error('任务内容不能为空');
                 return;
               }

               const createTaskDTO = {
                 class: selectedClassCode,
                 type: selectedType,
                 title: title,
                 content: content
               } as CreateTaskDTO;

               teacherCreateTask(createTaskDTO)
                 .then(() => {
                   toast.info('创建任务成功');
                   navigate(-1);
                 })
                 .catch((error: Error) => {
                   toast.error(`创建任务失败：${error.message}`);
                 })
             }}
        >
          确认
        </div>
      </div>
    </div>
  );

}