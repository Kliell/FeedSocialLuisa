import { View, Text, FlatList, Image } from 'react-native';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useTheme } from '@/hooks/UseTheme';
import { globalStyles } from '@/assets/styles/styles';

export default function FeedScreen() {
  const { colors } = useTheme();
  const posts = useQuery(api.user.getPosts);

  return (
    <View style={[globalStyles.container, { backgroundColor: colors.background }]}>
      <Text style={[globalStyles.title, { color: colors.text }]}>SocialFeed</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <View style={globalStyles.postHeader}>
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