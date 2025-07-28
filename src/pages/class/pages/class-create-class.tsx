import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "../../../common/utils/toast.util.tsx";
import {teacherCreateClass} from "../../../api/methods/class.methods.ts";

export default function ClassCreateClass () {

  const navigate = useNavigate();

  const [className, setClassName] = useState<string>('');

  return (
    <div className="w-11/12 px-3 my-[72px] flex flex-col items-center gap-4">
      {/* 标题 */}
      <p className="absolute top-5 w-full text-center text-3xl font-bold">创建班级</p>

      <div className="w-full flex flex-col gap-4">
        <p>班级名称：</p>
        {/* 班级名称 */}
        <input className="w-full h-16 px-2 py-1 border-2 border-black rounded-md text-[18px]"
               placeholder="请输入班级名称"
               value={className}
               onChange={(event) => setClassName(event.target.value)}
        />
        <div className="btn-trans btn-scale-sm w-full py-2 px-3 my-2 bg-white rounded-lg shadow-md border-black
        border-2 flex items-center justify-center hover:shadow-lg text-2xl font-bold"
             onClick={() => {
               if (className.trim() === '') {
                 toast.error('班级名称不能为空');
                 return;
               }
               teacherCreateClass(className)
                 .then(() => {
                   toast.info('创建班级成功');
                   navigate(-1);
                 })
                 .catch((error: Error) => {
                   toast.error(`创建班级失败：${error.message}`);
                 })
             }}>
          确认
        </div>
      </div>
    </div>
  );
}