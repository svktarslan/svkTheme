import React, { memo } from 'react';
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import Style from './styles';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';

interface SparkoTextType {
  text: string;
  textColor?: string;
  style?: TextStyle | TextStyle[];
  maxLength?: number;
  fontSize?: number;
  onPress?: () => void;
  buttonStyle?: ViewStyle | ViewStyle[];
  translate?: boolean;
  bold?: boolean;
}

const App = ({
  text,
  style,
  maxLength,
  fontSize,
  onPress,
  buttonStyle,
  textColor,
  translate = true,
  bold = false,
}: SparkoTextType) => {
  const colors = useTheme();
  const styles = Style(colors);
  const { t } = useTranslation();

  const renderText = () => {
    const truncatedText = maxLength
      ? text.length > maxLength
        ? `${text.slice(0, maxLength)}...`
        : text
      : text;

    return translate ? t(truncatedText) : truncatedText;
  };

  return (
    <TouchableOpacity
      disabled={typeof onPress !== 'function'}
      onPress={onPress}
      style={buttonStyle}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: fontSize || 16,
            color: textColor || colors?.text,
            fontWeight: bold ? '500' : 'normal',
          },
          style,
        ]}
      >
        {renderText()}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(App);


