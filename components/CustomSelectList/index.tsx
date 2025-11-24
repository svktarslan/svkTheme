import layout from '@svkTheme/theme/layout';
import React, { memo, useEffect, useRef, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@svkTheme/hooks/useTheme';
import CustomText from '@svkTheme/components/CustomText';

interface SvktSelectListType {
  onChange?: any;
  value?: string;
  horizontal?: boolean;
  data: {
    label: string;
    value: string;
  }[];
}

const App = ({ onChange, value, data, horizontal = false }: SvktSelectListType) => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const colors = useTheme();
  const [currentValue, setCurrentValue] = useState(value);
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);
  useEffect(() => {
    const pos = data.map(e => e.value).indexOf(value as string);
    scrollViewRef?.current?.scrollTo({
      x: 0,
      y: 45 * (pos > 2 ? pos - 2 : pos) || 0,
      animated: false,
    });
  }, [data]);
  if (data === undefined) return;
  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal={horizontal}
      nestedScrollEnabled={true}
      showsHorizontalScrollIndicator={false}
      style={[{ backgroundColor: colors?.secondary, borderRadius: 8 }]}
    >
      {data.map(x => (
        <TouchableOpacity
          onPress={() => {
            onChange(x.value);
            setCurrentValue(x.value);
          }}
          key={x.value}
          style={[layout.row, layout.alignItemsCenter, { height: 45, paddingHorizontal: 18, paddingLeft: horizontal ? 0 : 18, width: horizontal ? undefined : '100%' }]}
        >
          {currentValue === x.value ? (
            <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={25} color={colors?.primary} />
          ) : (
            <MaterialCommunityIcons name="circle-outline" size={25} color={colors?.text} />
          )}
          <CustomText style={{ paddingHorizontal: 8 }} text={x.label} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default memo(App);


