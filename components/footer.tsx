import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.logo}>
                <Text style={styles.glitch}>glitch </Text>
                <Text style={styles.house}>house</Text>
            </Text>
            <Text style={styles.joined}>JOINED 2242 DAYS AGO</Text>

            {/* Block decorations */}
            <View style={styles.blocksRow}>
                <View style={[styles.block, { backgroundColor: 'yellow', left: 10 }]} />
                <View style={[styles.block, { backgroundColor: 'blue', left: 40 }]} />
                <View style={[styles.block, { backgroundColor: 'purple', left: 80 }]} />
                <View style={[styles.block, { backgroundColor: 'cyan', right: 40 }]} />
                <View style={[styles.block, { backgroundColor: 'pink', right: 10 }]} />
            </View>
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#111',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: '#222',
        alignItems: 'center',
        position: 'relative',
    },
    logo: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    glitch: {
        color: '#ccc',
    },
    house: {
        color: '#777',
    },
    joined: {
        color: '#888',
        fontSize: 12,
        marginTop: 4,
    },
    blocksRow: {
        position: 'absolute',
        bottom: 5,
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    block: {
        width: 8,
        height: 8,
        position: 'absolute',
    },
});

export default Footer;
