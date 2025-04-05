import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions, SafeAreaView, ImageBackground, Animated, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import img1 from "../../assets/images/like/like1.png"
import img2 from "../../assets/images/like/like2.png"
import img3 from "../../assets/images/like/like3.png"
import img4 from "../../assets/images/saved/save1.png"
import img5 from "../../assets/images/saved/save2.png"
import img6 from "../../assets/images/saved/save3.png"
import Footer from '@/components/footer';



const { width } = Dimensions.get('window');

const collections = [
  {
    title: 'LIKED',
    count: 32,
    images: [img1, img2, img3],
    icon: 'heart',
  },
  {
    title: 'SAVED',
    count: 23,
    images: [img4, img5, img6],
    icon: 'bookmark',
  },
  {
    title: 'FILES',
    count: 3,
    images: [img1, img2, img4],
    icon: 'folder',
  },
];


const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('collections');
  const tabBlinkAnim = useRef(new Animated.Value(0)).current;

  const handleAnyTap = () => {
    // Trigger the tab blink animation
    Animated.sequence([
      Animated.timing(tabBlinkAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(tabBlinkAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  // Interpolated background color for tabs
  const tabBackgroundColor = tabBlinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#111', '#00ff8844'], // normal to highlight
  });

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleAnyTap} style={{ flex: 1 }}>
        {/* Header */}
        <ImageBackground source={require('@/assets/images/bg.png')} resizeMode="cover">
          <View style={styles.header}>
            <Image source={require('@/assets/images/dog.png')} style={styles.profilePic} />
            <View style={styles.headerRight}>
              <Ionicons name="share-social-outline" size={20} color="#fff" style={styles.shareIcon} />
              <Ionicons name="settings" size={20} color="#fff" style={styles.settingIcon} />
            </View>
          </View>

          <View style={styles.topRow}>
            <View style={styles.leftInfo}>
              <View style={styles.usernameRow}>
                <Text style={styles.username}>@theo_from_hsr</Text>
                <Ionicons name="checkmark-circle" size={18} color="#00f3a1" style={styles.verifiedIcon} />
              </View>
              <View style={styles.countryRow}>
                <Text style={styles.flag}>🇮🇳</Text>
                <Text style={styles.country}> INDIA</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>EDIT PROFILE</Text>
              <Ionicons name="pencil" size={14} color="#bbb" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>

          {/* Info Section */}
          <View style={styles.info}>
            <Text style={styles.bio}>18 y/o with high ambitions. want to build cool stuff!</Text>
            <Text style={styles.following}>
              <Ionicons name="person" size={20} color="#fff" style={styles.following} />
              <Ionicons name="checkmark" size={18} color="#0f0" style={{ marginLeft: 4 }} />2
            </Text>
            <Text style={styles.following}> FOLLOWING</Text>
          </View>
        </ImageBackground>

        {/* Tabs */}
        <Animated.View style={[styles.tabRow, { backgroundColor: tabBackgroundColor }]}>
          <TouchableOpacity onPress={() => setActiveTab('collections')} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="albums" size={16} color={activeTab === 'collections' ? '#00ff88' : '#777'} />
            <Text style={activeTab === 'collections' ? styles.tabActive : styles.tabInactive}> COLLECTIONS</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab('tags')} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="pricetags" size={16} color={activeTab === 'tags' ? '#00ff88' : '#777'} />
            <Text style={activeTab === 'tags' ? styles.tabActive : styles.tabInactive}> MANAGE TAGS</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Collections tab */}

        {activeTab === 'collections' ? (
          <FlatList
            data={collections}
            numColumns={2}
            keyExtractor={(item) => item.title}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <View style={styles.collectionCard}>
                <View style={styles.imageGrid}>
                  {item.images.slice(0, 3).map((img, index) => (
                    <Image
                      key={index}
                      source={item.images[index]}
                      style={styles.gridImage}
                      resizeMode="cover"
                    />
                  ))}
                </View>
                <View style={styles.cardLabel}>
                  <Ionicons name={item.icon} size={14} color="#ccc" />
                  <Text style={styles.cardLabelText}>
                    {item.title.toUpperCase()} ({item.count})
                  </Text>
                </View>
              </View>
            )}
            ListFooterComponent={<Footer />}
          />
        ) : (
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text style={{ color: '#ccc', marginBottom: 20 }}>
              our recommendations work best when you let us know these things:
            </Text>

            <TouchableOpacity style={styles.tagSection}>
              <View>
                <Text style={styles.tagTitle}>YOUR DIFFICULTY ✨</Text>
                <Text style={styles.tagSubtitle}>you decide the level of challenge you want!</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.tagSection}>
              <View>
                <Text style={styles.tagTitle}>INTERESTS YOU LIKE ✨</Text>
                <Text style={styles.tagSubtitle}>we’ll use these to show you cool builds</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.tagSection}>
              <View>
                <Text style={styles.tagTitle}>TOOLS USED 🛠️</Text>
                <Text style={styles.tagSubtitle}>we’ll suggest better using these picks.</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </TouchableOpacity>

            <Footer />
          </ScrollView>
        )}
      </Pressable>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', marginTop: 30 },
  collectionCard: {
    flex: 1,
    margin: 8,
    borderRadius: 4,

    backgroundColor: '#1a1a1a',
    overflow: 'hidden',
  },
  imageGrid: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    height: 120,
  },
  gridImage: {
    width: '60%',
    height: '50%',
  },
  cardLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  cardLabelText: {
    color: '#ccc',
    fontSize: 13,
    marginLeft: 6,
  },

  tagSection: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tagTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },

  tagSubtitle: {
    color: '#888',
    fontSize: 13,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  leftInfo: {
    flexDirection: 'column',
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },



  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  verifiedIcon: {
    marginLeft: 6,
  },

  countryRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  flag: {
    fontSize: 14,
  },
  country: {
    color: '#bbb',
    fontSize: 14,
  },

  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    paddingBottom: 2,
  },
  editProfileText: {
    color: '#bbb',
    fontSize: 13,
    marginRight: 2,
    letterSpacing: 0.5,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  profilePic: {
    height: 80,
    width: 80,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 12,

  },

  editText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  shareIcon: {
    marginLeft: 12,
    marginBottom: 30,
    paddingBottom: 10
  },

  settingIcon: {
    marginLeft: 12,
    marginBottom: 30,
    paddingBottom: 10
  },

  info: {
    paddingHorizontal: 16,
    marginTop: 10,


  },


  bio: { color: '#ccc', marginTop: 4, fontSize: 14 },
  following: {
    color: 'skyblue', marginTop: 6, fontWeight: 'bold', flexDirection: 'row',
    alignItems: 'center',
  },

  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#333',
    backgroundColor: '#111', // fallback
  },

  tabActive: { color: '#00ff88', fontWeight: 'bold', fontSize: 14 },
  tabInactive: { color: '#777', fontSize: 14 },


  gridImagePlaceholder: {
    width: (width - 60) / 3,
    height: 80,
    backgroundColor: '#333',
    borderRadius: 6,
  },
  cardTitle: {
    marginTop: 8,
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ProfileScreen;
