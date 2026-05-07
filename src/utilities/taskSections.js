import moment from 'moment';

export const taskSections = tasks => {
  const list = [];
  let currentDateKey = null;

  (tasks || []).forEach(task => {
    const dateKey = moment(task.dueDate).format('YYYY-MM-DD');

    if (dateKey !== currentDateKey) {
      currentDateKey = dateKey;

      list.push({
        type: 'header',
        id: `header-${dateKey}`,
        title: moment(task.dueDate).format('dddd'),
        subtitle: moment(task.dueDate).format('MMMM D, YYYY'),
      });
    }

    list.push({
      type: 'task',
      id: task.id,
      task,
    });
  });

  return list;
};
