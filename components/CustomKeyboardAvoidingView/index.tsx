import React, { memo } from 'react';
import { Keyboard, Platform, TouchableOpacity } from 'react-native';
import layout from '@svkTheme/theme/layout';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
const App = ({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: () => void;
}) => {
  const onPressKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={layout.fill}>
      <TouchableOpacity onPress={onPressKeyboard} disabled={!onPress} activeOpacity={1} style={[layout.fill]}>
        {children}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default memo(App);


