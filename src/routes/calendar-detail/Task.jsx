import { useEffect, useState } from "react";
import { format } from "date-fns";
import MinusIcon from "../../asset/images/minus.svg";
import PlusIcon from "../../asset/images/plus.svg";
import CompletedIcon from "../../asset/images/complete.png";
import CompletedNonClickIcon from "../../asset/images/complete_nonclick.png";
import cheetah_paw from "../../asset/images/cheetah_paw.png";
import * as s from "./styled";
import ko from "date-fns/locale/ko";
import { updateGoalwithRollback } from "../../apis/api_calendar";

//체크 표시가 있는 history 목표 블록.
export const CompletedTask = ({
  goal,
  tag,
  isGoalCompleted,
  onClickCompletedBtn,
  openGoalDetailModal,
  is_calendardetail,
}) => {
  const isHidden = false;
  const formattedDueDate = format(new Date(goal.finish_at), "M/d(E)", {
    locale: ko,
  });
  const completeDate = format(new Date(goal.update_at), "M/d(E)", {
    locale: ko,
  });
  const hours = goal.hoursperday;
  const hour = Math.round(hours);
  var min = (hours % 1) * 60;
  min = Math.round(min);
  console.log(hours, hour, min);
  const rollBackAPI = async () => {
    const response = await updateGoalwithRollback(goal.id);
    console.log(response);
  };
  const onClickRollBack = async () => {
    if (is_calendardetail === true) {
      return;
    }
    await rollBackAPI();
    window.location.reload();
  };
  console.log("dfadwdfd", is_calendardetail, typeof is_calendardetail);

  return (
    <s.TaskLayout onClick={openGoalDetailModal}>
      <s.TaskTopFrame>
        <s.TaskTLeftFrame $isHidden={isHidden}>
          <s.TaskTitle>{goal.title}</s.TaskTitle>
          <s.TaskInfo>
            <s.Tag color={tag.color}>{tag.title}</s.Tag>
            <s.Speed>
              {hour}h {min}m
            </s.Speed>
            <s.Progress>현재까지 {goal.progress_rate}%</s.Progress>
          </s.TaskInfo>
        </s.TaskTLeftFrame>
        <s.TaskBtnContainer onClick={() => onClickRollBack}>
          {is_calendardetail === true ? (
            <img
              alt="button"
              src={CompletedNonClickIcon}
              className="w-[45px]"
            />
          ) : (
            <img alt="button" src={CompletedIcon} className="w-[45px]" />
          )}
        </s.TaskBtnContainer>
      </s.TaskTopFrame>
      <s.DueDateWrapper>
        <s.DueDate className="text-darkgray" $isHidden={isHidden}>
          {isGoalCompleted
            ? `${completeDate}에 완주완료`
            : `${formattedDueDate}까지 달리기`}
        </s.DueDate>
      </s.DueDateWrapper>
    </s.TaskLayout>
  );
};

//완료를 누를 수 있는 목표 블록
export const IncompletedTask = ({
  goal,
  tag,
  openGoalDetailModal,
  openGoalFinishModal,
  hidden,
  isFinished,
  currentdate,
}) => {
  const formattedDueDate = format(new Date(goal.finish_at), "M/d(E)", {
    locale: ko,
  });

  const hours = goal.hoursperday;
  const hour = Math.floor(hours);
  var min = (hours % 1) * 60;
  min = Math.round(min);
  console.log(hours, hour, min);

  const rollBackAPI = async () => {
    const response = await updateGoalwithRollback(goal.id);
    console.log(response);
  };
  const onClickRollBack = async (e) => {
    await rollBackAPI();
    window.location.reload();
  };

  return (
    <s.TaskLayout>
      <s.TaskTopFrame>
        {isFinished ? (
          <>
            <s.TaskTLeftFrame onClick={openGoalDetailModal} $isHidden={hidden}>
              <s.TaskTitle>{goal.title}</s.TaskTitle>
              <s.TaskInfo>
                <s.Tag color={tag.color}>{tag.title}</s.Tag>
                <s.Speed>
                  {" "}
                  {hour}h {min}m
                </s.Speed>
                <s.Progress>현재까지 {goal.progress_rate}%</s.Progress>
              </s.TaskInfo>
            </s.TaskTLeftFrame>
            <s.TaskBtnContainer onClick={onClickRollBack}>
              <img
                alt="button"
                src={
                  isFinished ? CompletedIcon : hidden ? PlusIcon : cheetah_paw
                }
                className={hidden ? "" : "w-[45px]"}
              />
            </s.TaskBtnContainer>
          </>
        ) : (
          <>
            <s.TaskTLeftFrame onClick={openGoalDetailModal} $isHidden={hidden}>
              <s.TaskTitle>{goal.title}</s.TaskTitle>
              <s.TaskInfo>
                <s.Tag color={tag.color}>{tag.title}</s.Tag>
                <s.Speed>
                  {" "}
                  {hour}h {min}m
                </s.Speed>
                <s.Progress>현재까지 {goal.progress_rate}%</s.Progress>
              </s.TaskInfo>
            </s.TaskTLeftFrame>
            <s.TaskBtnContainer onClick={openGoalFinishModal}>
              <img
                alt="button"
                src={
                  isFinished ? CompletedIcon : hidden ? PlusIcon : cheetah_paw
                }
                className="w-[45px]"
              />
            </s.TaskBtnContainer>
          </>
        )}
      </s.TaskTopFrame>
      <s.DueDateWrapper>
        <s.DueDate className="text-darkgray" $isHidden={hidden}>
          {formattedDueDate}까지 달리기
        </s.DueDate>
      </s.DueDateWrapper>
    </s.TaskLayout>
  );
};

//-와 +를 바꿀 수 있는 목표 블록
export const Task = ({
  goal,
  tag,
  openGoalDetailModal,
  hidden,
  minusDateAPI,
  plusDateAPI,
  currentdate,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isHidden, setIsHidden] = useState(hidden);
  const formattedDueDate = format(new Date(goal.finish_at), "M/d(E)", {
    locale: ko,
  });

  const changeStateofGoals = () => {
    if (isHidden) {
      plusDateAPI(goal.id, currentdate);
    } else {
      minusDateAPI(goal.id, currentdate);
    }
    console.log("change!");
  };

  const onClickTaskBtn = () => {
    //!isCompleted ? setIsHidden(!isHidden) : setIsCompleted(!isCompleted);
    if (!isCompleted) {
      changeStateofGoals();
      setIsHidden(!isHidden);
    } else {
      setIsCompleted(!isCompleted);
    }
  };
  const hours = goal.hoursperday;
  const hour = Math.floor(hours);
  var min = (hours % 1) * 60;
  min = Math.round(min);
  console.log(hours, hour, min);

  return (
    <s.TaskLayout>
      <s.TaskTopFrame>
        <s.TaskTLeftFrame onClick={openGoalDetailModal} $isHidden={isHidden}>
          <s.TaskTitle>{goal.title}</s.TaskTitle>
          <s.TaskInfo>
            <s.Tag color={tag.color}>{tag.title}</s.Tag>
            <s.Speed>
              {" "}
              {hour}h {min}m
            </s.Speed>
            <s.Progress>현재까지 {goal.progress_rate}%</s.Progress>
          </s.TaskInfo>
        </s.TaskTLeftFrame>
        <s.TaskBtnContainer onClick={onClickTaskBtn}>
          <img
            alt="button"
            src={isCompleted ? CompletedIcon : isHidden ? PlusIcon : MinusIcon}
          />
        </s.TaskBtnContainer>
      </s.TaskTopFrame>
      <s.DueDateWrapper>
        <s.DueDate className="text-darkgray" $isHidden={isHidden}>
          {formattedDueDate}까지 달리기
        </s.DueDate>
      </s.DueDateWrapper>
    </s.TaskLayout>
  );
};

//마감기한에 뜨는 목표 블록
export const DueDateGoal = ({
  goal,
  tag,
  isGoalCompleted,
  isPastGoal,
  openGoalDetailModal,
}) => {
  const isHidden = false;
  const completeDate = format(new Date(goal.update_at), "M/d(E)", {
    locale: ko,
  });
  const hours = goal.hoursperday;
  const hour = Math.floor(hours);
  var min = (hours % 1) * 60;
  min = Math.round(min);

  console.log(hours, hour, min);

  return (
    <s.TaskLayout>
      <s.TaskTopFrame>
        <s.TaskTLeftFrame onClick={openGoalDetailModal} $isHidden={isHidden}>
          <s.TaskTitle>{goal.title}</s.TaskTitle>
          <s.TaskInfo>
            <s.Tag color={tag.color}>{tag.title}</s.Tag>
            <s.Speed>
              {hour}h {min}m
            </s.Speed>
            <s.Progress>현재까지 {goal.progress_rate}%</s.Progress>
          </s.TaskInfo>
        </s.TaskTLeftFrame>
        <s.TaskBtnContainer></s.TaskBtnContainer>
      </s.TaskTopFrame>
      <s.DueDateWrapper>
        <s.GoalBottomText $isHidden={isHidden}>
          {isGoalCompleted
            ? `✅ ${completeDate}에 완주완료`
            : isPastGoal
            ? "완주기한 초과"
            : "🔥 끝까지 달리는 날"}
        </s.GoalBottomText>
      </s.DueDateWrapper>
    </s.TaskLayout>
  );
};
