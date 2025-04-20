import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { Bank } from '../../types';
import { Footer } from './Footer';

const AppLayout = ({
  children,
  banks,
}: {
  children: React.ReactNode;
  banks: Bank[];
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pay by Bank</Text>
        <View style={styles.securityIcons}>
          {banks.map((item) => (
            <Image
              key={item.id}
              source={{ uri: item.media[0]?.source }}
              style={styles.securityIcon}
            />
          ))}
        </View>
      </View>
      <View style={styles.paymentContainer}>{children}</View>
      <Footer />
    </View>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    width: '100%',
    backgroundColor: '#F5FAF9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2A9D8F',
  },
  securityIcons: {
    flexDirection: 'row',
    borderRadius: 100,
    gap: 8,
  },
  securityIcon: {
    width: 24,
    height: 24,
  },

  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  bankSelector: {
    backgroundColor: '#E9F5F4',
    padding: 12,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bankLogo: {
    width: 24,
    height: 24,
    borderRadius: 100,
  },
  chevronIcon: {
    width: 16,
    height: 16,
    tintColor: '#666',
  },
});
