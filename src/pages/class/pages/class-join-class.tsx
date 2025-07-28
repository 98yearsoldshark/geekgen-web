import React, {useState} from "react";
import {toast} from "../../../common/utils/toast.util.tsx";
import {studentJoinClass} from "../../../api/methods/class.methods.ts";
import {useNavigate} from "react-router-dom";

export default function ClassJoinClass () {

  const navigate = useNavigate();

  const [classCode, setClassCode] = useState<string>('');

  return (
    <div className="w-11/12 px-3 my-[72px] flex flex-col items-center gap-4">
      {/* 标题 */}
      <p className="absolute top-5 w-full text-center text-3xl font-bold">加入班级</p>

      <div className="w-full flex flex-col gap-4">
        {/* 班级名称 */}
        <p className="">班级码：</p>
        <input className="w-full h-16 px-2 py-1 border-2 border-black rounded-md text-[18px]"
               placeholder="请输入班级码"
               value={classCode}
               onChange={(event) => setClassCode(event.target.value)}
        />

        {/* 确认按钮 */}
        <div className="btn-trans btn-scale-sm w-full py-2 px-3 my-2 bg-white rounded-lg shadow-md border-black
        border-2 flex items-center justify-center hover:shadow-lg text-2xl font-bold"
             onClick={() => {
               const regex = /^[A-Z0-9]{6}$/;
               if (!regex.test(classCode)) {
                 toast.error('班级码格式错误');
                 return;
               }
               studentJoinClass(classCode)
                 .then(() => {
                   toast.info('加入班级成功');
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