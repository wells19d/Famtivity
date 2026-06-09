import React, { createContext, useContext, useState } from 'react';
import BottomSheet from './UIBottomSheet';

type BottomSheetOptions = {
  content: React.ReactNode;
  snapPoints?: [number, number];
  innerStyles?: any;
};

type BottomSheetContextType = {
  openBottomSheet: (options: BottomSheetOptions) => void;
  closeBottomSheet: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export const BottomSheetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);
  const [canOpen, setCanOpen] = useState(true);
  const [snapPoints, setSnapPoints] = useState<[number, number]>([0.01, 1]);
  const [innerStyles, setInnerStyles] = useState<any>({ margin: 0 });

  const openBottomSheet = (options: BottomSheetOptions) => {
    if (!canOpen) return;

    setCanOpen(false);
    setContent(options.content);
    setSnapPoints(options.snapPoints ?? [0.01, 1]);
    setInnerStyles(options.innerStyles ?? { margin: 0 });
    setVisible(true);
  };

  const closeBottomSheet = () => {
    setVisible(false);

    setTimeout(() => {
      setContent(null);
      setCanOpen(true);
    }, 2000);
  };

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}

      <BottomSheet
        visible={visible}
        onClose={closeBottomSheet}
        snapPoints={snapPoints}
        innerStyles={innerStyles}
      >
        {content}
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);

  if (!context) {
    throw new Error('useBottomSheet must be used inside BottomSheetProvider');
  }

  return context;
};
