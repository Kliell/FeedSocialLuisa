import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', padding: 15 },
  card: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#DBDBDB' },
  postHeader: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  username: { fontWeight: 'bold', fontSize: 14 },
  postImage: { width: '100%', aspectRatio: 1 },
  contentSection: { padding: 10 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, margin: 10 },
  button: { backgroundColor: '#0095F6', padding: 15, borderRadius: 8, margin: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
});