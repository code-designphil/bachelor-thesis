export default function validateTask(_task, conditionOfTask) {
  const task = getTask();

  if (task == _task && validateCondition(conditionOfTask)) {
    console.log("success!");
    return true;
  }
}

function validateCondition(conditionOfTask) {
  const condition = getConditionFromStorage();
  console.log("condition", condition, "conditionOfTask", conditionOfTask);

  if (isAccessible) {
    return condition != conditionOfTask;
  } else {
    return condition == conditionOfTask;
  }
}

function getTask() {
  return localStorage.getItem("task");
}

function getConditionFromStorage() {
  return localStorage.getItem("condition");
}
