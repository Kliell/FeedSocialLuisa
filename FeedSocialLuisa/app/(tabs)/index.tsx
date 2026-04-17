import { View, Text, FlatList, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useTheme } from '../../hooks/UseTheme';
import { globalStyles } from '../../assets/styles/styles';
import { useState, useLayoutEffect } from 'react';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function FeedScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const posts = useQuery(api.user.getPosts);
  const createPost = useMutation(api.user.createPost);

  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          onPress={() => setShowForm(!showForm)} 
          style={{ marginRight: 15 }}
        >
          <Ionicons 
            name={showForm ? "close-circle" : "add-circle-outline"} 
            size={28} 
            color={colors.primary} 
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, showForm, colors.primary]);

  const handlePost = async () => {
    if (!content || !imageUrl) return Alert.alert("Ops", "Preencha os campos.");
    try {
      await createPost({ username: "Instagram User", content, imageUrl });
      setContent('');
      setImageUrl('');
      setShowForm(false);
      Alert.alert("Sucesso", "Post publicado!");
    } catch (e) {
      Alert.alert("Erro", "Falha ao publicar.");
    }
  };

  const renderCreatePost = () => {
    if (!showForm) return null;
    return (
      <View style={{ 
        padding: 15, 
        backgroundColor: colors.card, 
        borderBottomWidth: 1, 
        borderBottomColor: '#DBDBDB' 
      }}>
        <TextInput
          style={[globalStyles.input, { color: colors.text, borderColor: '#DBDBDB' }]}
          placeholder="URL da Imagem..."
          placeholderTextColor="#999"
          value={imageUrl}
          onChangeText={setImageUrl}
        />
        <TextInput
          style={[globalStyles.input, { color: colors.text, borderColor: '#DBDBDB' }]}
          placeholder="Legenda..."
          placeholderTextColor="#999"
          value={content}
          onChangeText={setContent}
        />
        <TouchableOpacity style={globalStyles.button} onPress={handlePost}>
          <Text style={globalStyles.buttonText}>Publicar Agora</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[globalStyles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={posts}
        ListHeaderComponent={renderCreatePost}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <View style={globalStyles.postHeader}>
              <View style={{width: 30, height: 30, borderRadius: 15, backgroundColor: '#EEE', marginRight: 10}} />
              <Text style={[globalStyles.username, { color: colors.text }]}>{item.username}</Text>
            </View>
            <Image source={{ uri: item.imageUrl }} style={globalStyles.postImage} />
            <View style={globalStyles.contentSection}>
              <Text style={{ color: colors.text }}>
                <Text style={globalStyles.username}>{item.username} </Text>
                {item.content}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}