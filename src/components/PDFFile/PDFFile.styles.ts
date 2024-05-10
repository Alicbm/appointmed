import { StyleSheet, Font } from '@react-pdf/renderer'

export const colors = {
  blue: '#075985',
  slate: '#F1F5F9',
  darkGray: '#1F2937',
  lightGray: '#F3F4F6',
  borderInputColor: '#E5E7EB',
  backgroundPage: '#F7F9FB'
}

export const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.backgroundPage,
    padding: 40
  },
  title: {
    fontSize: 15,
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    color: colors.blue,
    backgroundColor: colors.slate,
    borderBottomWidth: 1, 
    borderBottomStyle: 'solid',
    borderBottomColor: colors.blue,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    padding: 12,
    marginBottom: 24,
  },
  containerSection: {
    marginBottom: 10
  },
  containerInputs: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 4
  },
  input: {
    width: '31%',
    minHeight: 45,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 6,
    borderWidth: 1, 
    borderStyle: 'solid',
    borderColor: colors.borderInputColor,
  },
  titleInput: {
    display: 'flex',
    fontSize: 13,
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    color: colors.blue,
    paddingLeft: 5,
    marginBottom: 3
  },
  textInput: {
    display: 'flex',
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: colors.darkGray,
    paddingLeft: 5,
  }
})

Font.register({
  family: 'Open Sans',
  src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});