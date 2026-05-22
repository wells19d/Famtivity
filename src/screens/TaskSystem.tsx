//* TaskSystem.tsx

import React, { useCallback, useState } from 'react';
import { useColors } from '../ui/UIUtilities';
import { View, Text } from '../ui';
import NavHeader from '../ui/NavHeader';
import SlideToggle from '../ui/SlideToggle';
import {
  CalendarProvider,
  CalendarUtils,
  ExpandableCalendar,
  TimelineList,
} from 'react-native-calendars';
import { FlashList } from '@shopify/flash-list';
import { useTheme } from '../ui/useTheme';
import {
  allEventsTaskFormat,
  dueTime,
  hourlyEventTaskFormat,
  listAssigned,
  taskTime,
  todayEventTaskFormat,
} from '../utilities/helpers';

type Props = {
  taskType: any[];
};

const TaskSystem = (props: Props) => {
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

  const events = hourlyEventTaskFormat(props.taskType);
  const todayItems = todayEventTaskFormat(props.taskType, selectedDate);
  const allEvents = allEventsTaskFormat(props.taskType);

  const renderTodayItems = useCallback(
    ({ item }: { item: any }) => {
      return (
        <View>
          <View>
            <Text>Title: {item.title}</Text>
            <Text>Description: {item.description}</Text>
            <Text>{taskTime(item.taskHours, item.taskMinutes)}</Text>
            <Text>{dueTime(item.endTime, selectedDate)}</Text>
          </View>
        </View>
      );
    },
    [selectedDate],
  );

  const renderAllItems = useCallback(({ item }: { item: any }) => {
    if (item.type === 'header') {
      return (
        <View border>
          <Text>
            {item.title} - {item.subtitle}
          </Text>
        </View>
      );
    }

    const task = item.task;

    return (
      <View border>
        <View>
          <Text>Title: {task.title}</Text>
          <Text>Description: {task.description}</Text>
          <Text>{taskTime(task.taskHours, task.taskMinutes)}</Text>
          {listAssigned(task) && <Text>Assigned to: {listAssigned(task)}</Text>}
        </View>
      </View>
    );
  }, []);

  if (viewType === 'hourly') {
    return (
      <View flex backgroundColor="#ffffff">
        <NavHeader />
        <View alignItems="center">
          <SlideToggle value={viewType} onChange={setViewType} />
        </View>
        <CalendarProvider
          date={selectedDate}
          showTodayButton
          onDateChanged={date => setSelectedDate(date)}
        >
          <ExpandableCalendar
            firstDay={1}
            theme={theme.expCalendar}
            renderArrow={direction => (
              <Text>{direction === 'left' ? '<' : '>'}</Text>
            )}
          />
          <View flex style={styles.calView}>
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
        <NavHeader />
        <View alignItems="center">
          <SlideToggle value={viewType} onChange={setViewType} />
        </View>
        <CalendarProvider
          date={selectedDate}
          showTodayButton
          onDateChanged={date => setSelectedDate(date)}
        >
          <ExpandableCalendar
            firstDay={1}
            theme={theme.expCalendar}
            renderArrow={direction => (
              <Text>{direction === 'left' ? '<' : '>'}</Text>
            )}
          />
          <FlashList
            data={todayItems}
            renderItem={renderTodayItems}
            keyExtractor={(item, index) => `${item.id}-${index}`}
          />
        </CalendarProvider>
      </View>
    );
  }

  if (viewType === 'all') {
    return (
      <View flex backgroundColor="#ffffff">
        <NavHeader />
        <View alignItems="center">
          <SlideToggle value={viewType} onChange={setViewType} />
        </View>
        <FlashList
          data={allEvents}
          renderItem={renderAllItems}
          keyExtractor={(item, index) => `${item.id}-${index}`}
        />
      </View>
    );
  }
};

export default TaskSystem;

const styles = {
  calView: { transform: [{ translateX: -10 }] },
  section: {
    backgroundColor: '#f3f3f3' as const,
    color: 'grey',
    textTransform: 'capitalize',
  },
  taskIcon: (item: any) => ({
    position: 'absolute' as const,
    top: 1,
    left: 2,
    width: 25,
    height: 25,
    borderWidth: 1.5,
    borderColor: '#ffffff' as const,
    backgroundColor: '#ffffff' as const,
    color:
      item?.priority === 'high'
        ? useColors('danger70')
        : item?.priority === 'medium'
          ? useColors('warning')
          : useColors('success90'),
  }),
  taskCell: {
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ccc' as const,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  taskLock: {
    position: 'absolute' as const,
    top: 1,
    right: -2,
    width: 30,
    height: 30,
    backgroundColor: '#ffffff' as const,
    borderWidth: 2.5,
    borderColor: '#ffffff' as const,
  },
  taskPrivate: {
    position: 'absolute' as const,
    top: -4,
    right: 4,
    width: 30,
    height: 30,
    backgroundColor: '#ffffff' as const,
    borderWidth: 2.5,
    borderColor: '#ffffff' as const,
  },
};
