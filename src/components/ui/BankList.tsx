import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Bank, BankList } from "../../types";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const BankSelector = ({
  selectedBank,
  bankList,
  setSelectedBank,
  disabled,
}: {
  selectedBank: Bank;
  bankList: BankList;
  setSelectedBank: (bank: Bank) => void;
  disabled?: boolean;
}) => {
  const [visible, setVisible] = useState(false);
  const onBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.bankSelector}
        onPress={() => setVisible(true)}
        disabled={disabled}
      >
        <Image
          source={{ uri: selectedBank.media[0].source }}
          style={styles.bankLogo}
        />
        <Image
          source={require("../../assets/chevron-down.png")}
          style={styles.chevronIcon}
        />
      </TouchableOpacity>
      <BankSelectionModal
        visible={visible}
        onClose={() => setVisible(false)}
        banks={bankList}
        selectedBank={selectedBank}
        onBankSelect={onBankSelect}
      />
    </>
  );
};

const BankSelectionModal = ({
  visible,
  onClose,
  banks,
  selectedBank,
  onBankSelect,
}: {
  visible: boolean;
  onClose: () => void;
  banks: BankList;
  selectedBank: Bank;
  onBankSelect: (bank: Bank) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("personal");

  const filteredBanks =
    activeTab === "personal"
      ? banks.personalBanks.filter((bank) =>
          bank.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : banks.businessBanks.filter((bank) =>
          bank.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.bottomSheet}>
          <SafeAreaView style={styles.bottomSheetContent}>
            <ModalHeader title="Pay with your Bank App" onClose={onClose} />

            <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />

            <SearchBox value={searchQuery} onChangeText={setSearchQuery} />

            <BanksList
              banks={filteredBanks}
              selectedBank={selectedBank}
              onBankSelect={onBankSelect}
            />

            <ModalFooter />
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

const TabSelector = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => (
  <View style={styles.tabContainer}>
    <TouchableOpacity
      style={[styles.tab, activeTab === "personal" && styles.activeTab]}
      onPress={() => setActiveTab("personal")}
    >
      <Text
        style={[
          styles.tabText,
          activeTab === "personal" && styles.activeTabText,
        ]}
      >
        Personal
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.tab, activeTab === "business" && styles.activeTab]}
      onPress={() => setActiveTab("business")}
    >
      <Text
        style={[
          styles.tabText,
          activeTab === "business" && styles.activeTabText,
        ]}
      >
        Business
      </Text>
    </TouchableOpacity>
  </View>
);

const BanksList = ({
  banks,
  selectedBank,
  onBankSelect,
}: {
  banks: Bank[];
  selectedBank: Bank;
  onBankSelect: (bank: Bank) => void;
}) => (
  <FlatList
    data={banks}
    keyExtractor={(item) => item.id}
    numColumns={3}
    contentContainerStyle={styles.bankRow}
    columnWrapperStyle={{ gap: 4 }}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={[
          styles.bankCard,
          selectedBank?.id === item.id && styles.selectedBankCard,
          { width: "33.33%" },
        ]}
        onPress={() => onBankSelect(item)}
      >
        <Image
          source={{ uri: item.media[1].source }}
          style={{ width: 40, height: 40, borderRadius: "100%" }}
          resizeMode="contain"
        />
        <Text style={styles.bankName} numberOfLines={1}>
          {item.name}
        </Text>
      </TouchableOpacity>
    )}
  />
);

const ModalHeader = ({
  title,
  onClose,
  titleStyle,
  containerStyle,
}: {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
  titleStyle?: StyleProp<TextStyle>;
}) => (
  <View style={[styles.bottomSheetHeader, containerStyle]}>
    <Text style={[styles.bottomSheetTitle, titleStyle]}>{title}</Text>
    {onClose && (
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>
    )}
  </View>
);

const ModalFooter = () => (
  <View style={styles.bottomSheetFooter}>
    <Text style={styles.footerText}>Powered by</Text>
    <Image
      source={require("../../assets/Flick.png")}
      style={styles.flickLogo}
    />
  </View>
);

const SearchBox = ({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) => (
  <View style={styles.searchContainer}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search.."
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={"#666"}
    />
  </View>
);

const styles = StyleSheet.create({
  bankSelector: {
    backgroundColor: "#E9F5F4",
    padding: 12,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  bankLogo: {
    width: 24,
    height: 24,
    borderRadius: 100,
  },
  chevronIcon: {
    width: 16,
    height: 16,
    tintColor: "#666",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: "#666666",
  },
  flickLogo: {
    width: 40,
    height: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: SCREEN_HEIGHT * 0.7,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  bottomSheetContent: {
    flex: 1,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#228985",
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#666",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 100,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 100,
  },
  activeTab: {
    backgroundColor: "#2A9D8F",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "white",
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchInput: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 100,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  bankGrid: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  bankRow: {
    gap: 3,
  },
  bankCard: {
    aspectRatio: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedBankCard: {
    borderColor: "#2A9D8F",
    borderWidth: 2,
  },
  bankName: {
    fontSize: 10,
    color: "#1A1A1A",
    textAlign: "center",
    marginTop: 2,
  },
  bottomSheetFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    gap: 4,
  },
  findMoreButton: {
    alignItems: "center",
    padding: 16,
  },
});
