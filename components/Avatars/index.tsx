import { staticColors, useTheme } from '@svkTheme/hooks/useTheme';
import { Image, StyleSheet, View } from 'react-native';
import CustomText from '@svkTheme/components/CustomText';
import layout from '@svkTheme/theme/layout';

const overlap = 13;
export default ({
  avatars,
  slice = 3,
  right = false,
}: {
  avatars: any[];
  slice?: number;
  right?: boolean;
}) => {
  const colors = useTheme();
  return (
    <View style={styles.avatarContainer}>
      {avatars.slice(0, slice).map((source, i) => (
        <Image
          key={i}
          source={source}
          style={[
            styles.avatarImage,
            {
              left: i * (30 - overlap),
              zIndex: avatars.length + i,
            },
          ]}
          resizeMode="cover"
        />
      ))}
      {avatars.length > slice && (
        <View
          style={[
            styles.avatarImage,
            layout.center,
            {
              left: slice * (30 - overlap),
              zIndex: avatars.length + slice,
              backgroundColor: colors.primary,
            },
          ]}
        >
          <CustomText text={`+${avatars.length - slice}`} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    height: 30,
    width: 30 + 2 * (30 - 13),
  },
  avatarImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: staticColors.white,
    position: 'absolute',
    marginRight: 4,
  },
});


