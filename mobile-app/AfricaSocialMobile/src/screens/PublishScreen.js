import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PublishScreen() {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePick = () => {
    // À implémenter : sélection d'image
    Alert.alert('Sélection d\'image', 'Cette fonctionnalité sera bientôt disponible !');
  };

  const handlePublish = () => {
    if (!content.trim()) {
      Alert.alert('Erreur', 'Veuillez ajouter du contenu à votre publication');
      return;
    }
    // À implémenter : publication du post
    Alert.alert('Succès', 'Votre publication a été créée !');
    setContent('');
    setSelectedImage(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Contenu de la publication</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={4}
          placeholder="Que souhaitez-vous partager ?"
          value={content}
          onChangeText={setContent}
        />

        <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
          <Ionicons name="image-outline" size={24} color="#6366f1" />
          <Text style={styles.imageButtonText}>Ajouter une image</Text>
        </TouchableOpacity>

        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.preview} />
        )}

        <View style={styles.options}>
          <Text style={styles.label}>Options de publication</Text>
          
          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="time-outline" size={24} color="#6366f1" />
            <Text style={styles.optionText}>Programmer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="globe-outline" size={24} color="#6366f1" />
            <Text style={styles.optionText}>Visibilité</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="share-social-outline" size={24} color="#6366f1" />
            <Text style={styles.optionText}>Plateformes</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.publishButton, !content.trim() && styles.publishButtonDisabled]}
          onPress={handlePublish}
          disabled={!content.trim()}
        >
          <Text style={styles.publishButtonText}>Publier</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  imageButtonText: {
    marginLeft: 8,
    color: '#6366f1',
    fontSize: 16,
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  options: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  optionText: {
    marginLeft: 8,
    color: '#4b5563',
    fontSize: 16,
  },
  publishButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  publishButtonDisabled: {
    backgroundColor: '#c7d2fe',
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 