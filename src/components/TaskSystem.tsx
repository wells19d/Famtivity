//* TaskSystem.tsx

import React, { useMemo, useState } from 'react';
import { View, Text, Icons } from '../ui';
import NavHeader from '../ui/NavHeader';
import SlideToggle from './SlideToggle';
import {
  CalendarProvider,
  CalendarUtils,
  ExpandableCalendar,
  TimelineList,
} from 'react-native-calendars';
import { useTheme } from '../ui/useTheme';
import {
  allEventsTaskFormat,
  hourlyEventTaskFormat,
  todayEventTaskFormat,
} from '../utilities/helpers';

import TaskList from './TaskList';

type TaskSystemProps = {
  screen?: string;
  taskType: any[];
  createMode: string;
  title?: string;
};

const TaskSystem = (props: TaskSystemProps) => {
  const { taskType, createMode, screen, title } = props;
  const theme = useTheme();
  const timelineTheme = theme.timelineList;

  type ViewType = 'hourly' | 'today' | 'all';

  const [viewType, setViewType] = useState<ViewType>('all');

  const today = new Date();
  const getDate = (offset = 0) =>
    CalendarUtils.getCalendarDateString(
      new Date().setDate(today.getDate() + offset),
    );

  const [selectedDate, setSelectedDate] = useState(getDate());

  const events = hourlyEventTaskFormat(taskType);
  const todayItems = todayEventTaskFormat(taskType, selectedDate);
  const allEvents = allEventsTaskFormat(taskType);

  const showToggle =
    screen === 'MyTasks' || screen === 'FamilyTasks' || screen === 'ChildTasks';

  if (viewType === 'hourly') {
    return (
      <View flex backgroundColor="#ffffff">
        <NavHeader
          createMode={createMode}
          leftButton="Back"
          rightButton="Create"
        />
        {showToggle && (
          <View alignItems="center">
            <SlideToggle value={viewType} onChange={setViewType} />
          </View>
        )}
        <CalendarProvider
          date={selectedDate}
          showTodayButton
          onDateChanged={date => setSelectedDate(date)}
        >
          <ExpandableCalendar
            firstDay={1}
            theme={theme.expCalendar}
            renderArrow={direction =>
              direction === 'left' ? <Icons.Back /> : <Icons.Forward />
            }
          />
          <View flex style={{ transform: [{ translateX: -10 }] }}>
            <TimelineList
              events={events}
              showNowIndicator
              scrollToFirst
              timelineProps={{
                rightEdgeSpacing: 10,
                format24h: false,
                renderEvent: event => (
                  <View ph5>
                    <Text {...(timelineTheme.header as any)}>
                      {event.title}
                    </Text>

                    {!!event.summary && (
                      <Text {...(timelineTheme.body as any)}>
                        {event.summary}
                      </Text>
                    )}
                  </View>
                ),
              }}
            />
          </View>
        </CalendarProvider>
      </View>
    );
  }

  if (viewType === 'today') {
    return (
      <View flex backgroundColor="#ffffff">
        <NavHeader
          createMode={createMode}
          leftButton="Back"
          rightButton="Create"
          title={title}
        />
        {showToggle && (
          <View alignItems="center">
            <SlideToggle value={viewType} onChange={setViewType} />
          </View>
        )}
        <CalendarProvider
          date={selectedDate}
          showTodayButton
          onDateChanged={date => setSelectedDate(date)}
        >
          <ExpandableCalendar
            firstDay={1}
            theme={theme.expCalendar}
            renderArrow={direction =>
              direction === 'left' ? <Icons.Back /> : <Icons.Forward />
            }
          />
          <TaskList
            data={todayItems}
            renderType="today"
            selectedDate={selectedDate}
          />
        </CalendarProvider>
      </View>
    );
  }

  if (viewType === 'all') {
    return (
      <View flex backgroundColor="#ffffff" pb10>
        <NavHeader
          createMode={createMode}
          leftButton="Back"
          rightButton="Create"
          title={title}
        />
        {showToggle && (
          <View alignItems="center">
            <SlideToggle value={viewType} onChange={setViewType} />
          </View>
        )}
        <View flex mh10>
          <TaskList
            data={allEvents}
            renderType="all"
            selectedDate={selectedDate}
          />
        </View>
      </View>
    );
  }
};

export default TaskSystem;
