import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StatCard = ({ title, value, icon, trend, color }) => (
  <View style={styles.statCard}>
    <View style={styles.statHeader}>
      <Ionicons name={icon} size={24} color={color} />
      <Text style={styles.statTitle}>{title}</Text>
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <View style={[styles.statTrend, { backgroundColor: trend > 0 ? '#dcfce7' : '#fee2e2' }]}>
      <Ionicons 
        name={trend > 0 ? 'trending-up' : 'trending-down'} 
        size={16} 
        color={trend > 0 ? '#16a34a' : '#dc2626'} 
      />
      <Text style={[styles.statTrendText, { color: trend > 0 ? '#16a34a' : '#dc2626' }]}>
        {Math.abs(trend)}%
      </Text>
    </View>
  </View>
);

export default function AnalyticsScreen() {
  const stats = [
    {
      title: 'Abonnés',
      value: '1,234',
      icon: 'people',
      trend: 12,
      color: '#6366f1',
    },
    {
      title: 'Engagement',
      value: '5.7%',
      icon: 'heart',
      trend: -2,
      color: '#ec4899',
    },
    {
      title: 'Portée',
      value: '45.2K',
      icon: 'eye',
      trend: 8,
      color: '#14b8a6',
    },
    {
      title: 'Publications',
      value: '128',
      icon: 'document-text',
      trend: 5,
      color: '#8b5cf6',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vue d'ensemble</Text>
        <Text style={styles.subtitle}>30 derniers jours</Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meilleures publications</Text>
        <View style={styles.post}>
          <View style={styles.postHeader}>
            <Text style={styles.postTitle}>Innovation en Afrique 🚀</Text>
            <Text style={styles.postDate}>Il y a 2 jours</Text>
          </View>
          <View style={styles.postStats}>
            <View style={styles.postStat}>
              <Ionicons name="heart" size={16} color="#ec4899" />
              <Text style={styles.postStatValue}>1.2K</Text>
            </View>
            <View style={styles.postStat}>
              <Ionicons name="chatbubble" size={16} color="#6366f1" />
              <Text style={styles.postStatValue}>234</Text>
            </View>
            <View style={styles.postStat}>
              <Ionicons name="share-social" size={16} color="#14b8a6" />
              <Text style={styles.postStatValue}>45</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Répartition géographique</Text>
        <View style={styles.locationStats}>
          <View style={styles.locationItem}>
            <Text style={styles.locationName}>Cameroun</Text>
            <View style={styles.locationBar}>
              <View style={[styles.locationProgress, { width: '75%' }]} />
            </View>
            <Text style={styles.locationValue}>45%</Text>
          </View>
          <View style={styles.locationItem}>
            <Text style={styles.locationName}>Côte d'Ivoire</Text>
            <View style={styles.locationBar}>
              <View style={[styles.locationProgress, { width: '60%' }]} />
            </View>
            <Text style={styles.locationValue}>30%</Text>
          </View>
          <View style={styles.locationItem}>
            <Text style={styles.locationName}>Sénégal</Text>
            <View style={styles.locationBar}>
              <View style={[styles.locationProgress, { width: '40%' }]} />
            </View>
            <Text style={styles.locationValue}>25%</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    width: Dimensions.get('window').width / 2 - 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTitle: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  statTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statTrendText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  post: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  postDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postStatValue: {
    marginLeft: 4,
    fontSize: 14,
    color: '#4b5563',
  },
  locationStats: {
    gap: 12,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationName: {
    width: 100,
    fontSize: 14,
    color: '#4b5563',
  },
  locationBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  locationProgress: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  locationValue: {
    width: 40,
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'right',
  },
}); 