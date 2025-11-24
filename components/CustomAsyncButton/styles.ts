import { StyleSheet } from 'react-native';

const Styles = (colors: any) => {
  const styles = StyleSheet.create({
    text: {
      color: colors?.text,
      fontSize: 15.5,
      textAlign: 'left',
    },
    submitButton: {
      borderRadius: 11,
      backgroundColor: colors?.primary,
      height: 42,
      marginTop: 30,
    },
  });
  return styles;
};
export default Styles;


