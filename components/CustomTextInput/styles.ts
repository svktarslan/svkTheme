import { staticColors } from '../../hooks/useTheme';
import { StyleSheet } from 'react-native';

const Styles = (colors: any) => {
  const styles = StyleSheet.create({
    title: { fontWeight: '500', marginBottom: 8, textAlign: 'left' },
    errorMessage: {
      fontWeight: '500',
      marginTop: 8,
      color: staticColors.error,
      textAlign: 'left',
    },
    inputContainer: {
      borderWidth: 1,
      borderRadius: 8,
      marginTop: 5,
    },
    inputPickerButton: {
      marginTop: 0,
      borderRadius: 0,
      borderWidth: 0,
      borderRightWidth: 0.5,
      borderColor: colors?.softBlack,
    },
    disiabled: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    searchContainer: {
      maxHeight: 160,
      backgroundColor: colors?.secondary,
      borderWidth: 1,
      borderColor: colors?.softBlack,
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
      padding: 3,
    },
    searchButtons: {
      paddingHorizontal: 8,
      borderColor: colors?.softBlack,
    },
  });
  return styles;
};
export default Styles;


