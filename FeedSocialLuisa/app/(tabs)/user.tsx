import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useTheme } from '../../hooks/UseTheme';
import { globalStyles } from '../../assets/styles/styles';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const numColumns = 3;
const size = width / numColumns;

export default function UserProfileScreen() {
  const { colors } = useTheme();
  const posts = useQuery(api.user.getPosts);

  const renderHeader = () => (
    <View style={{ backgroundColor: colors.background }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, justifyContent: 'space-between' }}>
        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#E1E1E1', justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="person" size={40} color="#999" />
        </View>
        
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', marginLeft: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: colors.text }}>{posts?.length || 0}</Text>
            <Text style={{ color: colors.text, fontSize: 12 }}>Posts</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: colors.text }}>2m</Text>
            <Text style={{ color: colors.text, fontSize: 12 }}>Followers</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: colors.text }}>40</Text>
            <Text style={{ color: colors.text, fontSize: 12 }}>Following</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={[globalStyles.button, { marginHorizontal: 20, height: 35, marginTop: 0 }]}>
        <Text style={globalStyles.buttonText}>Follow</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#DBDBDB', marginTop: 20 }}>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1 }}>
          <Ionicons name="grid-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingVertical: 10 }}>
          <Ionicons name="person-circle-outline" size={24} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[globalStyles.container, { backgroundColor: colors.background, paddingHorizontal: 0 }]}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        numColumns={numColumns}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <Image 
            source={{ uri: item.imageUrl }} 
            style={{ width: size, height: size, borderWidth: 0.5, borderColor: colors.background }} 
          />
        )}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <View style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <Ionicons name="camera-outline" size={40} color={colors.text} />
            </View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>No Posts Yet</Text>
          </View>
        )}
      />
    </View>
  );
}
