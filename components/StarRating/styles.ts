import { StyleSheet } from 'react-native';

interface StyleProps {
  spacing: number;
}

export default ({ spacing }: StyleProps) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    star: {
      marginRight: spacing,
    },
  });


