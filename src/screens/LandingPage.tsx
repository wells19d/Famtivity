//* LandingPage.tsx

import React from 'react';
import { Icons, Text, View } from '../ui';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { NavParams } from '../navigation/types';
import { useColors } from '../ui/UIUtilities';

const LandingPage = () => {
  const navigation = useNavigation<NavigationProp<NavParams>>();

  // Global handler for the button press that takes in the navigation name.
  // Later we will be adding the haptic feedback system

  const handlePress = (navigate: keyof NavParams) => () => {
    console.log(`Navigating to ${navigate}`);
    navigation.navigate(navigate);
  };

  // Global variables for button styling

  const buttonColor = '#f3f3f380';
  const borderColor = '#f3f3f380';
  const iconColor = useColors('black');
  const iconSize = 35;
  const buttonSize = 70;
  const fontSize = 'small';
  const buttonsPerRow = 4;

  // We are going to create a reusable button component that takes in
  // name, icon, color, borderColor, and onPress handler as props.

  const AppButton: React.FC<{
    name: string;
    icon?: React.ReactNode;
    color?: string;
    borderColor?: string;
    onPress: () => void;
  }> = ({ name, icon, color, borderColor, onPress }) => {
    return (
      <View flex style={{ height: 150, width: 100 }} p5>
        <View flex centerVH>
          <View centerVH style={{ position: 'relative', top: 2 }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.5,
                borderColor: borderColor || '#f3f3f3',
                height: buttonSize,
                width: buttonSize,
                borderRadius: 12,
                backgroundColor: color || '#f3f3f3',
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 1,
                elevation: 5,
              }}
              onPress={onPress}
            >
              {icon}
            </TouchableOpacity>
            <View mt={5}>
              <Text size={fontSize}>{name}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // We are going to create a BlankButton component that will be used to fill the remaining spaces
  // in the grid layout when there are less buttons than the specified buttonsPerRow.

  const BlankButton = () => {
    return <View flex style={{ height: 150, width: 100 }} p5 />;
  };

  // We are going to create an array of buttons with their respective icons and onPress handlers.
  // This will allow us to easily map over the array and render the buttons in a grid layout.
  // For now we are just going to pass in a global color and border color until we determine what the button colors should be.

  const mappedButtons = [
    {
      name: 'My Tasks',
      icon: <Icons.Tasks size={iconSize} color={iconColor} />,
      color: { buttonColor: buttonColor, borderColor: borderColor },
      onPress: handlePress('MyTasks'),
      active: true,
    },
    {
      name: 'Family',
      icon: <Icons.Family size={iconSize} color={iconColor} />,
      color: { buttonColor: buttonColor, borderColor: borderColor },
      onPress: handlePress('FamilyTasks'),
      active: true,
    },
    {
      name: 'Children',
      icon: <Icons.Children size={iconSize - 5} color={iconColor} />,
      color: { buttonColor: buttonColor, borderColor: borderColor },
      onPress: handlePress('ChildTasks'),
      active: true,
    },
    {
      name: 'Pending',
      icon: <Icons.Pending size={iconSize} color={iconColor} />,
      color: { buttonColor: buttonColor, borderColor: borderColor },
      onPress: handlePress('PendingTasks'),
      active: true,
    },
    {
      name: 'Unclaimed',
      icon: <Icons.Unclaimed size={iconSize} color={iconColor} />,
      color: { buttonColor: buttonColor, borderColor: borderColor },
      onPress: handlePress('UnclaimedTasks'),
      active: true,
    },
    {
      name: 'Meds',
      icon: <Icons.Medication size={iconSize - 5} color={iconColor} />,
      color: { buttonColor: buttonColor, borderColor: borderColor },
      onPress: handlePress('Medications'),
      active: true,
    },
    {
      name: 'Bills',
      icon: <Icons.Invoice size={iconSize} color={iconColor} />,
      color: { buttonColor: buttonColor, borderColor: borderColor },
      onPress: handlePress('Billing'),
      active: true,
    },
    {
      name: 'History',
      icon: <Icons.History size={iconSize} color={iconColor} />,
      color: { buttonColor: buttonColor, borderColor: borderColor },
      onPress: handlePress('History'),
      active: true,
    },
    {
      name: 'Account',
      icon: <Icons.Account size={iconSize} color={iconColor} />,
      color: { buttonColor: buttonColor, borderColor: borderColor },
      onPress: handlePress('Account'),
      active: true,
    },
    {
      name: 'Settings',
      icon: <Icons.Settings size={iconSize} color={iconColor} />,
      color: { buttonColor: buttonColor, borderColor: borderColor },
      onPress: handlePress('Settings'),
      active: true,
    },
  ];

  const activeButtons = mappedButtons.filter(button => button.active);

  // 1. First we are going to look at the buttonPerRow variable to determine how many buttons we want in each row.
  // 2. Next we will filter the buttons to only include the active ones from the mappedButtons array, these will be based on conditions later.
  // 3. Then we are going to loop through the activeButtons array and create a new array of rows, where each row is an array of buttons.
  // 4. Finally, we are going to render the rows of buttons.
  // 5. If a row has less than buttonPerRow buttons, we will fill the remaining spaces with BlankButtons to maintain the layout.

  const rows = [];
  for (let i = 0; i < activeButtons.length; i += buttonsPerRow) {
    rows.push(activeButtons.slice(i, i + buttonsPerRow));
  }

  return (
    <View flex pt20 p15>
      {rows.map((row, index) => (
        <View key={index} row>
          {row.map(button => (
            <AppButton
              key={button.name}
              name={button.name}
              icon={button.icon}
              color={button.color?.buttonColor || '#f3f3f380'}
              borderColor={button.color?.borderColor || '#f3f3f380'}
              onPress={button.onPress}
            />
          ))}
          {/* Fill remaining spaces with BlankButtons */}
          {row.length < buttonsPerRow &&
            Array(buttonsPerRow - row.length)
              .fill(null)
              .map((_, idx) => <BlankButton key={`blank-${idx}`} />)}
        </View>
      ))}
    </View>
  );
};

export default LandingPage;
