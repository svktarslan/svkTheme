import React, { View, Modal, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { memo } from 'react';

type Props = {
  children: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onBeforeClose?: () => void;
};

const CustomModal = ({ children, isOpen, setIsOpen, onBeforeClose }: Props) => {
  const colors = useTheme();

  return (
    <>
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          onBeforeClose?.();
          setIsOpen(false);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            onBeforeClose?.();
            setIsOpen(false);
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                style={{
                  backgroundColor: colors.secondary,
                  borderRadius: 8,
                  padding: 8,
                  minWidth: 150,
                  shadowColor: colors.placeholderTextColor,
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4.84,
                  elevation: 5,
                }}
              >
                {children}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default memo(CustomModal);


