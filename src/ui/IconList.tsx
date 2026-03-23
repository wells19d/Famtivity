//* IconList.tsx
import React from 'react';
import ADIcons from '@react-native-vector-icons/ant-design';
import EIcons from '@react-native-vector-icons/entypo';
import EVIcons from '@react-native-vector-icons/evil-icons';
import FEIcons from '@react-native-vector-icons/feather';
import FAIcons from '@react-native-vector-icons/fontawesome';
import FA5Icons from '@react-native-vector-icons/fontawesome5';
import FA6Icons from '@react-native-vector-icons/fontawesome6';
import FIcons from '@react-native-vector-icons/fontisto';
import FOIcons from '@react-native-vector-icons/foundation';
import IIcons from '@react-native-vector-icons/ionicons';
import LuIcons from '@react-native-vector-icons/lucide';
import MDIcons from '@react-native-vector-icons/material-design-icons';
import MIIcons from '@react-native-vector-icons/material-icons';
import OctIcons from '@react-native-vector-icons/octicons';
import SIIcons from '@react-native-vector-icons/simple-line-icons';
import ZIIcons from '@react-native-vector-icons/zocial';

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
  InCart: (props: IconProps) => (
    <FAIcons name="cart-arrow-down" size={20} color="#000" {...props} />
  ),
  Keyboard: (props: IconProps) => (
    <MDIcons name="keyboard-variant" size={20} color="#000" {...props} />
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
