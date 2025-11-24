import { StyleSheet } from 'react-native';

const Styles = (colors: any) => {
  const styles = StyleSheet.create({
    text: {
      color: colors?.text,
      fontSize: 15.5,
      textAlign: 'left',
    },
  });
  return styles;
};
export default Styles;


