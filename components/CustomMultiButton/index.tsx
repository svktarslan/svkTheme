import { useTheme } from '@svkTheme/hooks/useTheme';
import layout from '@svkTheme/theme/layout';
import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '@svkTheme/components/CustomText';

interface ActionsType {
  onPress?: () => void;
  children?: any;
  onLongPress?: () => void;
  leftIcon?: any;
  middelChildren?: any;
  rightIcon?: any;
  color?: string;
  text?: string;
  placeholder?: string;
  textDecorationLine?: any;
  rightIconColor?: string;
}
interface MultiRowButtonType {
  actions: ActionsType[];
  title?: string;
  bgColor?: string;
}

const App = ({ actions, title, bgColor }: MultiRowButtonType) => {
  const colors = useTheme();
  return (
    <>
      {title ? (
        <View style={{ width: '90%' }}>
          <CustomText
            text={title}
            fontSize={12}
            textColor={colors?.softBlack}
            style={{
              padding: 5,
              paddingLeft: 0,
              marginBottom: 5,
            }}
          />
        </View>
      ) : null}
      <View
        style={[
          layout.fullWidth,
          {
            height: actions.length * 50,
            borderRadius: 8,
            backgroundColor: bgColor ? bgColor : colors?.secondary,
            marginBottom: 20,
          },
        ]}
      >
        {actions.map((x, i) =>
          x.children ? (
            <View
              key={i}
              style={[
                layout.fill,
                {
                  borderBottomWidth: 0.5,
                  borderColor: actions.length - 1 === i ? 'transparent' : colors?.white,
                },
              ]}
            >
              {x.children}
            </View>
          ) : (
            <TouchableOpacity
              key={i}
              onPress={x.onPress}
              onLongPress={x.onLongPress}
              activeOpacity={typeof x.onPress === 'function' ? 0 : 1}
              style={[
                layout.fill,
                layout.row,
                {
                  maxHeight: 50,
                  borderBottomWidth: 0.5,
                  borderColor: actions.length - 1 === i ? 'transparent' : colors?.white,
                },
              ]}
            >
              {x.leftIcon ? (
                <View
                  style={[
                    layout.fill,
                    layout.center,
                    {
                      maxWidth: 50,
                    },
                  ]}
                >
                  {x.leftIcon}
                </View>
              ) : null}
              <View
                style={[
                  layout.fill,
                  layout.justifyContentCenter,
                  {
                    paddingLeft: x.leftIcon ? 0 : 8,
                    alignItems: x.leftIcon || x.rightIcon ? 'flex-start' : 'center',
                  },
                ]}
              >
                {x.middelChildren ? (
                  x.middelChildren
                ) : (
                  <CustomText
                    text={x.text as string}
                    fontSize={14}
                    style={{
                      color: x.color ? x.color : colors?.text,
                      textDecorationLine: x.textDecorationLine,
                    }}
                  />
                )}
              </View>
              {x.placeholder ? (
                <View style={layout.center}>
                  <CustomText
                    text={x.placeholder as string}
                    fontSize={16}
                    style={{
                      color: 'grey',
                      paddingHorizontal: 3,
                    }}
                  />
                </View>
              ) : null}
              {x.rightIcon ? (
                <View
                  style={[
                    layout.center,
                    {
                      paddingHorizontal: 8,
                    },
                  ]}
                >
                  {x.rightIcon}
                </View>
              ) : (
                <View
                  style={[
                    layout.center,
                    {
                      paddingHorizontal: 8,
                    },
                  ]}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={25}
                    color={x.rightIconColor ? x.rightIconColor : colors?.primary}
                    style={[layout.rtlIcons]}
                  />
                </View>
              )}
            </TouchableOpacity>
          ),
        )}
      </View>
    </>
  );
};
export default memo(App);


