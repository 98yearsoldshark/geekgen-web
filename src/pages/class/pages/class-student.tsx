import React from "react";
import {useNavigate} from "react-router-dom";
import {studentGetClasses, studentGetTasks} from "../../../api/methods/class.methods.ts";
import {useRequest} from "alova/client";
import ScreenLoading from "../../../common/components/loader/screen-loading.tsx";
import SingleWordCard from "../../../common/components/card/single-word-card.tsx";

export default function ClassStudent () {

  const navigate = useNavigate();

  const {loading: classesLoading, error: classesError, data: classesData} = useRequest(studentGetClasses(), {force: true});
  const {loading: tasksLoading, error: tasksError, data: tasksData} = useRequest(studentGetTasks(), {force: true});

  if (classesLoading || tasksLoading || classesData === undefined || tasksData === undefined) {
    return <ScreenLoading />
  }
  if (classesError || tasksError) {
    throw new Error('获取数据错误');
  }

  const taskTypeMap = {
    'article': '文章'
  };

  function timestampToString(timestamp: number) {
    // 创建一个 Date 对象，传入时间戳（如果是毫秒级时间戳直接传入，如果是秒级时间戳需要乘以 1000）
    const date = new Date(timestamp * 1000);
    // 获取年份
    const year = date.getFullYear();
    // 获取月份，注意 getMonth() 返回的月份是从 0 开始的，所以要加 1
    const month = String(date.getMonth() + 1).padStart(2, '0');
    // 获取日期
    const day = String(date.getDate()).padStart(2, '0');
    // 拼接成 xx年xx月xx日 的格式
    return `${year}年${month}月${day}日`;
  }

  return (
    <div className="w-11/12 px-3 my-[72px] flex flex-col items-center gap-4">
      {/* 标题 */}
      <p className="absolute top-5 w-full text-center text-3xl font-bold">学生端</p>
      {/* 加入班级 */}
      <div className="btn-trans btn-scale-sm w-full p-3 bg-white rounded-lg shadow-md border-black
          border-2 flex items-center justify-center hover:shadow-lg text-3xl font-bold relative"
           onClick={() => navigate('/class/join_class')}
      >
        加入班级
        <span className="absolute right-10">🫂</span>
      </div>

      {/* 所在班级 */}
      <p className="w-full text-center text-2xl font-bold">班级</p>
      {
        classesData.length === 0 &&
        <p>暂未加入班级</p>
      }
      {
        classesData.map((classItem, index) =>
          <div key={index}
               className="btn-trans w-full p-2 my-2 bg-white rounded-lg shadow-md border-black border-2 flex flex-col gap-2 hover:shadow-lg">
            <h2 className="text-lg font-bold ">{classItem.name}</h2>
            <p>班级码：{classItem.code}</p>
          </div>
        )
      }

      {/* 未完成的任务 */}
      <p className="w-full text-center text-2xl font-bold">待完成任务</p>
      {
        tasksData.length === 0 &&
        <p>暂无待完成任务</p>
      }
      {
        tasksData.map((taskItem, index) =>
          <div key={index}
               className="btn-trans btn-scale-sm w-full p-2 my-2 bg-white rounded-lg shadow-md border-black border-2 flex flex-col gap-2 hover:shadow-lg"
            onClick={() => {
              navigate('/article', {state: {type: 'task', article: `${taskItem.classCode}:${taskItem.id}`}})
            }}
          >
            <h2 className="text-lg font-bold ">{taskItem.title}</h2>
            <div className="flex flex-wrap gap-2">
              <SingleWordCard word={taskItem.className} />
              <SingleWordCard word={taskTypeMap[taskItem.type]} />
              <SingleWordCard word={timestampToString(taskItem.time)} />
            </div>
          </div>
        )
      }
    </div>
  );
}