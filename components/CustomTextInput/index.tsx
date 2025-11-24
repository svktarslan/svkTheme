import React, { memo, useState, useRef, useEffect } from "react";
import {
  I18nManager,
  KeyboardTypeOptions,
  ScrollView,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  LayoutAnimation,
} from "react-native";
import layout from "../../theme/layout";
import CustomText from "../CustomText";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Control, RegisterOptions, useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { staticColors, useTheme } from "../../hooks/useTheme";
import { validations } from "../../utils/regex";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { searchAscii } from "../../utils/makeAscii";
import Style from "./styles";
import CustomAsyncButton from "../CustomAsyncButton";

interface SvktTextInputType {
  title?: string;
  disabled?: boolean;
  onlyNumber?: boolean;
  search?: boolean;
  multiline?: boolean;
  upperCase?: boolean;
  placeholder?: string;
  borderColor?: string;
  style?: ViewStyle | ViewStyle[];
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  name: string;
  rules: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  control: Control<any>;
  defaultValue?: string;
  leftIcon?: any;
  maxLength?: number;
  textInputStyle?: ViewStyle | ViewStyle[] | TextStyle | TextStyle[];
  textInputContainerStyle?: ViewStyle | ViewStyle[];
  pickerData?: any[];
  searchData?: any[];
  pickerName?: string;
  pickerPlaceholder?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  searchOnChange?: any;
  rightAction?: React.ReactNode;
  rightFunction?: () => void;
  autoFocus?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  debouncedCallback?: (value: string) => void;
  debounceDelay?: number;
  showErrorMessage?: boolean;
}

const App = ({
  title,
  placeholder,
  style,
  keyboardType,
  secureTextEntry = false,
  multiline = false,
  name,
  control,
  rules,
  defaultValue,
  leftIcon,
  maxLength,
  textInputStyle,
  textInputContainerStyle,
  borderColor,
  onlyNumber,
  upperCase,
  disabled = false,
  autoCapitalize,
  search = false,
  searchData = [],
  searchOnChange,
  rightAction,
  rightFunction,
  autoFocus = false,
  onFocus,
  onBlur,
  debouncedCallback,
  debounceDelay = 1000,
  showErrorMessage = true,
}: SvktTextInputType) => {
  const [hideText, setHideText] = useState(secureTextEntry);
  const { t } = useTranslation();
  const colors = useTheme();
  const styles = Style(colors);
  const {
    field: { onChange: onChangeHandler, value, onBlur: onBlurHandler },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const [showSearchContent, setShowSearchContent] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const onChangeText = (text: string) => {
    if (search) {
      if (text.length > 0) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowSearchContent(true);
      } else {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowSearchContent(false);
      }
    }
    if (onlyNumber) {
      text = text.replace(validations.onlyNumber, "");
    }
    if (upperCase) {
      text = text.toUpperCase();
    }
    onChangeHandler(text);

    if (debouncedCallback) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        debouncedCallback(text);
      }, debounceDelay);
    }
  };
  return (
    <View style={[layout.fullWidth, { paddingVertical: 5 }, style]}>
      {title && <CustomText style={styles.title} fontSize={14} text={title} />}

      <View style={[layout.row, layout.fullWidth]}>
        <View
          style={[
            layout.fullWidth,
            layout.row,
            styles.inputContainer,
            {
              height: multiline ? "auto" : 48,
              borderColor: error
                ? staticColors.error
                : borderColor
                ? borderColor
                : value !== "" && value !== undefined
                ? colors.text
                : colors?.placeholderTextColor,
              borderBottomWidth: showSearchContent ? 0 : 1,
              borderBottomLeftRadius: showSearchContent ? 0 : 8,
              borderBottomRightRadius:
                showSearchContent || rightFunction ? 0 : 8,
              borderRightWidth: rightFunction ? 0 : 1,
              borderTopRightRadius: rightFunction ? 0 : 8,
            },
            textInputContainerStyle,
          ]}
        >
          {leftIcon && (
            <View
              style={[layout.center, { paddingHorizontal: 10, height: 48 }]}
            >
              {leftIcon}
            </View>
          )}
          <TextInput
            value={value}
            placeholder={t(placeholder || "")}
            onChangeText={onChangeText}
            keyboardType={onlyNumber ? "numeric" : keyboardType}
            multiline={multiline}
            editable={!disabled}
            secureTextEntry={hideText}
            maxLength={maxLength}
            placeholderTextColor={colors?.placeholderTextColor}
            autoCapitalize={autoCapitalize}
            autoFocus={autoFocus}
            onFocus={onFocus}
            onBlur={() => {
              onBlurHandler();
              onBlur?.();
            }}
            style={[
              layout.fill,
              multiline
                ? { minHeight: 45, paddingVertical: 8 }
                : layout.fullHeight,
              {
                paddingHorizontal: leftIcon ? 0 : 8,
                color: colors?.text,
                textAlign: I18nManager.isRTL ? "right" : "left",
              },
              textInputStyle,
            ]}
          />

          {secureTextEntry && (
            <TouchableOpacity
              onPress={() => setHideText((x) => !x)}
              style={[layout.fullHeight, layout.center]}
            >
              <Ionicons
                name={!hideText ? "eye-off-outline" : "eye-outline"}
                size={23}
                color={!hideText ? colors?.softBlack : colors?.text}
                style={[layout.rtlIcons, { paddingHorizontal: 12 }]}
              />
            </TouchableOpacity>
          )}
          {rightAction}
        </View>

        {rightFunction && (
          <CustomAsyncButton
            text="+"
            fontSize={30}
            onPress={rightFunction}
            buttonStyle={{
              marginTop: 5,
              width: 50,
              height: 48,
              marginRight: 2,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          />
        )}
      </View>
      {showSearchContent && (
        <ScrollView
          nestedScrollEnabled={true}
          style={[layout.fullWidth, styles.searchContainer]}
        >
          {searchData
            .filter((y) =>
              searchAscii(
                y.label +
                  " " +
                  y?.item?.value +
                  " " +
                  y?.item?.value2 +
                  " " +
                  y?.item?.description,
                value
              )
            )
            .map((x, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  searchOnChange(x);
                  onChangeText("");
                }}
                style={[
                  layout.fullWidth,
                  layout.row,
                  layout.alignItemsCenter,
                  styles.searchButtons,
                  {
                    borderBottomWidth: (searchData.length - 1 === i
                      ? 0
                      : 0.4) as number,
                  },
                ]}
              >
                <MaterialIcons
                  name="holiday-village"
                  size={34}
                  color={colors?.text}
                  style={{ marginHorizontal: 5 }}
                />
                <View style={[layout.fill, { padding: 5 }]}>
                  <CustomText
                    text={x.label}
                    style={[layout.textBold]}
                    fontSize={15}
                  />
                  <CustomText
                    text={x.item.description}
                    textColor={colors?.softBlack}
                    fontSize={13}
                    style={{ paddingVertical: 4 }}
                  />
                  <View
                    style={[
                      layout.row,
                      layout.justifyContentFlexEnd,
                      layout.alignItemsCenter,
                    ]}
                  >
                    <CustomText text={x.item.value} fontSize={11} />
                    <CustomText text=" / " translate={false} fontSize={11} />
                    <CustomText text={x.item.value2} fontSize={11} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      )}
      {error && !showErrorMessage && (
        <CustomText
          style={styles.errorMessage}
          fontSize={13}
          text={error.message as string}
        />
      )}
    </View>
  );
};

export default memo(App);
