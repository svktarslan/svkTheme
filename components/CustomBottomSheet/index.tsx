import React, { memo, useCallback } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetHandleProps,
} from "@gorhom/bottom-sheet";
import layout from "@svkTheme/theme/layout";
import { useTheme } from "@svkTheme/hooks/useTheme";
import { Keyboard } from "react-native";

type LayoutProps = {
  children: React.ReactNode;
  bottomSheetModalRef?: React.RefObject<BottomSheet | null>;
  snapPoints?: string[];
  handleSheetChanges?: (index: number) => void;
  handleIndicatorStyle?: any;
  handleStyle?: any;
  handleComponent?: React.FC<BottomSheetHandleProps>;
};

function CustomBottomSheet({
  children,
  bottomSheetModalRef,
  snapPoints,
  handleSheetChanges,
  handleIndicatorStyle,
  handleStyle,
  handleComponent,
}: LayoutProps) {
  const colors = useTheme();
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
        enableTouchThrough={false}
        onPress={() => {
          bottomSheetModalRef?.current?.close();
          Keyboard.dismiss();
        }}
      />
    ),
    [bottomSheetModalRef]
  );

  return (
    <BottomSheet
      ref={bottomSheetModalRef}
      onChange={handleSheetChanges}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      accessibilityIgnoresInvertColors={true}
      handleIndicatorStyle={[
        { backgroundColor: colors.text, width: 70 },
        handleIndicatorStyle,
      ]}
      handleStyle={[
        { backgroundColor: colors.pageContainer, borderRadius: 10 },
        handleStyle,
      ]}
      handleComponent={handleComponent}
    >
      <BottomSheetView
        style={[layout.fullSize, { backgroundColor: colors.pageContainer }]}
      >
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
}

export default memo(CustomBottomSheet);
