import { staticColors, useTheme } from '../../hooks/useTheme';
import React, { memo, useState } from 'react';
import { TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import Style from './styles';
import layout from '../../theme/layout';
import CustomText from '../CustomText';

interface SparkAsyncButtonType {
  text: string;
  textColor?: string;
  textStyle?: TextStyle | TextStyle[];
  fontSize?: number;
  onPress?: any;
  buttonStyle?: ViewStyle | ViewStyle[];
  disabled?: boolean;
  children?: React.ReactNode;
}

const App = ({
  text,
  textStyle,
  fontSize = 17,
  onPress,
  buttonStyle,
  textColor,
  disabled,
  children,
}: SparkAsyncButtonType) => {
  const colors = useTheme();
  const [loading, setLoading] = useState(false);
  const styles = Style(colors);
  const disable = disabled || loading;
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={async () => {
        try {
          const result = onPress();
          if (result instanceof Promise) {
            setLoading(true);
            await result;
            setLoading(false);
          }
        } catch (e) {
          setLoading(false);
        }
      }}
      style={[
        layout.fullWidth,
        layout.center,
        layout.row,
        styles.submitButton,
        buttonStyle,
        { opacity: disable || disabled ? 0.5 : 1 },
      ]}
    >
      {children}
      <CustomText
        textColor={textColor ? textColor : staticColors.white}
        style={textStyle}
        text={loading ? 'loading' : text}
        fontSize={fontSize}
      />
    </TouchableOpacity>
  );
};

export default memo(App);


