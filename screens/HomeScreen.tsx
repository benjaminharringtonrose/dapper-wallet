/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";

import MainLayout from "./MainLayout";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getCoinMarketRequested, getHoldingsRequested } from "../store/market/slice";
import { useFocusEffect } from "@react-navigation/native";
import { mockHoldings } from "../constants/mock";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import { BalanceInfo, Chart, IconTextButton } from "../components";
import { Coin } from "../types";

const HomeScreen = () => {
  const [selectedCoin, setSelectedCoin] = useState<Coin | undefined>(undefined);
  const {
    holdings,
    loadingGetHoldings,
    // errorGetHoldings,
    coins,
    loadingGetCoinMarket,
    // errorGetCoinMarket,
  } = useAppSelector((state) => state.market);

  const dispatch = useAppDispatch();

  const totalWallet = holdings.reduce((a, b) => a + (b.total || 0), 0);
  const valueChange = holdings.reduce((a, b) => a + (b.holdingValueChange7d || 0), 0);
  const percentageChange = (valueChange / (totalWallet - valueChange)) * 100;

  useFocusEffect(
    useCallback(() => {
      dispatch(getHoldingsRequested({ holdings: mockHoldings }));
      dispatch(getCoinMarketRequested({}));
    }, [])
  );

  function renderWalletInfoSection() {
    return (
      <View
        style={{
          paddingTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          borderRadius: 25,
          borderWidth: 1,
          borderColor: COLORS.gray,
          backgroundColor: COLORS.black,
        }}
      >
        {/* Balance Info */}
        <BalanceInfo
          title={"Your Wallet"}
          displayAmount={totalWallet}
          changePercentage={percentageChange}
        />
        {/* Buttons */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <IconTextButton
            label={"Transfer"}
            icon={icons.send}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
            onPress={() => console.log("Transfer")}
          />
          <IconTextButton
            label={"Withdraw"}
            icon={icons.withdraw}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
            onPress={() => console.log("Widthdraw")}
          />
        </View>
      </View>
    );
  }

  const onRefresh = () => {
    dispatch(getHoldingsRequested({ holdings: mockHoldings }));
    dispatch(getCoinMarketRequested({}));
  };

  return (
    <MainLayout>
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/* Header - Wallet Info */}
        {renderWalletInfoSection()}
        {/* Chart */}
        <Chart
          containerStyle={{ marginTop: SIZES.padding * 2 }}
          chartPrices={
            selectedCoin ? selectedCoin?.sparkline_in_7d?.price : coins[0]?.sparkline_in_7d.price
          }
        />
        {/* Top Cryptocurrency */}
        <FlatList
          data={coins}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ marginTop: 30, paddingHorizontal: SIZES.padding }}
          ListHeaderComponent={
            <View style={{ marginBottom: SIZES.radius }}>
              <Text style={[FONTS.h3, { fontSize: 18, color: COLORS.white }]}>
                {"Top Cryptocurrency"}
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const priceColor =
              item.price_change_percentage_7d_in_currency === 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;
            return (
              <TouchableOpacity
                style={{
                  height: 55,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setSelectedCoin(item)}
              >
                {/* Logo */}
                <View style={{ width: 35 }}>
                  <Image source={{ uri: item.image }} style={{ height: 20, width: 20 }} />
                </View>
                {/* Name */}
                <View style={{ flex: 1 }}>
                  <Text style={[FONTS.h3, { color: COLORS.white }]}>{item.name}</Text>
                </View>
                {/* Figures */}
                <View>
                  <Text
                    style={[FONTS.h4, { textAlign: "right", color: COLORS.white }]}
                  >{`$ ${item.current_price}`}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {item.price_change_percentage_7d_in_currency !== 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.price_change_percentage_7d_in_currency > 0
                              ? [{ rotate: "45deg" }]
                              : [{ rotate: "125deg" }],
                        }}
                      />
                    )}
                    <Text
                      style={[FONTS.body5, { marginLeft: 5, color: priceColor, lineHeight: 15 }]}
                    >{`${item.price_change_percentage_7d_in_currency.toFixed(2)}%`}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={<View style={{ marginBottom: 50 }} />}
        />
      </View>
    </MainLayout>
  );
};

export default HomeScreen;
