import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DUMMY_POSTS = [
  {
    id: '1',
    author: 'AfricaSocial',
    content: 'Bienvenue sur la version mobile de AfricaSocial ! 🌍',
    likes: 45,
    comments: 12,
    image: 'https://picsum.photos/400/300',
  },
  {
    id: '2',
    author: 'Tech234',
    content: 'L\'innovation technologique en Afrique est en pleine croissance ! 🚀',
    likes: 32,
    comments: 8,
    image: 'https://picsum.photos/400/301',
  },
];

const PostCard = ({ post }) => (
  <View style={styles.postCard}>
    <View style={styles.postHeader}>
      <Image
        source={{ uri: 'https://picsum.photos/50/50' }}
        style={styles.avatar}
      />
      <Text style={styles.author}>{post.author}</Text>
    </View>
    
    <Image source={{ uri: post.image }} style={styles.postImage} />
    
    <Text style={styles.content}>{post.content}</Text>
    
    <View style={styles.interactions}>
      <TouchableOpacity style={styles.interactionButton}>
        <Ionicons name="heart-outline" size={24} color="#6366f1" />
        <Text style={styles.interactionText}>{post.likes}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.interactionButton}>
        <Ionicons name="chatbubble-outline" size={24} color="#6366f1" />
        <Text style={styles.interactionText}>{post.comments}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.interactionButton}>
        <Ionicons name="share-social-outline" size={24} color="#6366f1" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_POSTS}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  postCard: {
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  content: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 12,
    lineHeight: 20,
  },
  interactions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionText: {
    marginLeft: 4,
    color: '#6366f1',
    fontSize: 14,
  },
}); 