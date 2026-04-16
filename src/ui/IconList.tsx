//* IconList.tsx
import React from 'react';
import { AntDesign as ADIcons } from '@react-native-vector-icons/ant-design';
import { Entypo as EIcons } from '@react-native-vector-icons/entypo';
import { EvilIcons as EVIcons } from '@react-native-vector-icons/evil-icons';
import { Feather as FEIcons } from '@react-native-vector-icons/feather';
import { FontAwesome as FAIcons } from '@react-native-vector-icons/fontawesome';
import { FontAwesome5 as FA5Icons } from '@react-native-vector-icons/fontawesome5';
import { FontAwesome6 as FA6Icons } from '@react-native-vector-icons/fontawesome6';
import { Fontisto as FIcons } from '@react-native-vector-icons/fontisto';
import { Foundation as FOIcons } from '@react-native-vector-icons/foundation';
import { Ionicons as IIcons } from '@react-native-vector-icons/ionicons';
import { Lucide as LuIcons } from '@react-native-vector-icons/lucide';
import { MaterialDesignIcons as MDIcons } from '@react-native-vector-icons/material-design-icons';
import { MaterialIcons as MIIcons } from '@react-native-vector-icons/material-icons';
import { Octicons as OctIcons } from '@react-native-vector-icons/octicons';
import { SimpleLineIcons as SIIcons } from '@react-native-vector-icons/simple-line-icons';
import { Zocial as ZIIcons } from '@react-native-vector-icons/zocial';

type IconProps = {
  size?: number;
  color?: string;
  [key: string]: any;
};

// All FA5 and FA6 icons need an iconStyle prop of solid.

export const IconList = {
  Account: (props: IconProps) => (
    <MDIcons name="account-circle" size={20} color="#000" {...props} />
  ),
  AddCart: (props: IconProps) => (
    <FAIcons name="cart-plus" size={20} color="#000" {...props} />
  ),
  AddList: (props: IconProps) => (
    <MDIcons name="playlist-plus" size={20} color="#000" {...props} />
  ),
  AdminEdit: (props: IconProps) => (
    <MDIcons name="shield-lock-outline" size={20} color="#000" {...props} />
  ),
  Back: (props: IconProps) => (
    <MIIcons name="arrow-back-ios" size={20} color="#000" {...props} />
  ),
  Barcode: (props: IconProps) => (
    <FAIcons name="barcode" size={20} color="#000" {...props} />
  ),
  BookmarkMinus: (props: IconProps) => (
    <MDIcons name="bookmark-remove-outline" size={20} color="#000" {...props} />
  ),
  BookmarkPlus: (props: IconProps) => (
    <MDIcons name="bookmark-plus-outline" size={20} color="#000" {...props} />
  ),
  Camera: (props: IconProps) => (
    <FEIcons name="camera" size={20} color="#000" {...props} />
  ),
  Check: (props: IconProps) => (
    <FA6Icons
      name="check"
      size={20}
      iconStyle="solid"
      color="#000"
      {...props}
    />
  ),
  CheckFilledCircle: (props: IconProps) => (
    <OctIcons name="check-circle-fill" size={20} color="#000" {...props} />
  ),
  Chest: (props: IconProps) => (
    <MDIcons name="treasure-chest" size={20} color="#000" {...props} />
  ),
  ChevronDown: (props: IconProps) => (
    <FEIcons name="chevron-down" size={20} color="#000" {...props} />
  ),
  ChevronLeft: (props: IconProps) => (
    <FEIcons name="chevron-left" size={20} color="#000" {...props} />
  ),
  ChevronUp: (props: IconProps) => (
    <FEIcons name="chevron-up" size={20} color="#000" {...props} />
  ),
  Children: (props: IconProps) => (
    <FA6Icons
      name="children"
      iconStyle="solid"
      size={20}
      color="#000"
      {...props}
    />
  ),
  CirclePlus: (props: IconProps) => (
    <ADIcons name="plus-circle" size={20} color="#000" {...props} />
  ),
  Close: (props: IconProps) => (
    <MDIcons name="close" size={20} color="#000" {...props} />
  ),
  Cupboards: (props: IconProps) => (
    <MDIcons name="wardrobe" size={20} color="#000" {...props} />
  ),
  Dev: (props: IconProps) => (
    <MDIcons name="dev-to" size={20} color="#000" {...props} />
  ),
  Dot: (props: IconProps) => (
    <MDIcons name="circle" size={20} color="#000" {...props} />
  ),
  Edit: (props: IconProps) => (
    <MIIcons name="edit-note" size={20} color="#000" {...props} />
  ),
  EmptyCircle: (props: IconProps) => (
    <OctIcons name="circle" size={20} color="#000" {...props} />
  ),
  EyeOff: (props: IconProps) => (
    <MDIcons name="eye-off" size={20} color="#000" {...props} />
  ),
  EyeOn: (props: IconProps) => (
    <MDIcons name="eye" size={20} color="#000" {...props} />
  ),
  Family: (props: IconProps) => (
    <MIIcons name="family-restroom" size={20} color="#000" {...props} />
  ),
  Favorite: (props: IconProps) => (
    <OctIcons name="star-fill" size={20} color="#000" {...props} />
  ),
  Filter: (props: IconProps) => (
    <IIcons name="filter-outline" size={20} color="#000" {...props} />
  ),
  Forward: (props: IconProps) => (
    <MIIcons name="arrow-forward-ios" size={20} color="#000" {...props} />
  ),
  Frame: (props: IconProps) => (
    <SIIcons name="frame" size={20} color="#000" {...props} />
  ),
  Help: (props: IconProps) => (
    <MDIcons name="help-circle" size={20} color="#000" {...props} />
  ),
  Home: (props: IconProps) => (
    <MDIcons name="home" size={20} color="#000" {...props} />
  ),
  History: (props: IconProps) => (
    <MDIcons name="history" size={20} color="#000" {...props} />
  ),
  InCart: (props: IconProps) => (
    <FAIcons name="cart-arrow-down" size={20} color="#000" {...props} />
  ),
  Invoice: (props: IconProps) => (
    <MDIcons name="invoice-text-outline" size={20} color="#000" {...props} />
  ),
  Keyboard: (props: IconProps) => (
    <MDIcons name="keyboard-variant" size={20} color="#000" {...props} />
  ),
  Medication: (props: IconProps) => (
    <FA6Icons
      name="prescription-bottle-medical"
      iconStyle="solid"
      size={20}
      color="#000"
      {...props}
    />
  ),
  Pending: (props: IconProps) => (
    <MIIcons name="pending-actions" size={20} color="#000" {...props} />
  ),
  Settings: (props: IconProps) => (
    <IIcons name="settings-sharp" size={20} color="#000" {...props} />
  ),
  Tasks: (props: IconProps) => (
    <FA5Icons
      name="tasks"
      iconStyle="solid"
      size={20}
      color="#000"
      {...props}
    />
  ),
  Unclaimed: (props: IconProps) => (
    <MDIcons
      name="map-marker-question-outline"
      size={20}
      color="#000"
      {...props}
    />
  ),
  XCircle: (props: IconProps) => (
    <OctIcons name="x-circle-fill" size={20} color="#000" {...props} />
  ),
  XCircleOutline: (props: IconProps) => (
    <OctIcons name="x-circle" size={20} color="#000" {...props} />
  ),
  XNoOutline: (props: IconProps) => (
    <OctIcons name="x" size={20} color="#000" {...props} />
  ),
};
