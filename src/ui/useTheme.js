import { useColors, useFonts } from './UIUtilities';

export const useTheme = () => {
  const open6 = useFonts('open-6');
  const open7 = useFonts('open-7');

  return {
    expCalendar: {
      dayTextColor: useColors('dark'),
      textDayFontSize: 16,
      textDayFontFamily: open6.fontFamily,
      textDayFontWeight: open6.fontWeight,

      monthTextColor: useColors('dark'),
      textMonthFontSize: 20,
      textMonthFontFamily: open7.fontFamily,
      textMonthFontWeight: open7.fontWeight,

      textSectionTitleColor: useColors('dark'),
      textDayHeaderFontSize: 14,
      textDayHeaderFontFamily: open6.fontFamily,
      textDayHeaderFontWeight: open6.fontWeight,
    },
    timelineList: {
      header: { size: 'xSmall', font: 'open-6', color: 'dark' },
      body: { size: 'tiny', font: 'open-5', color: 'dark70' },
    },
  };
};
