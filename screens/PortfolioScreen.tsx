import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import * as tf from "@tensorflow/tfjs";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";

import { useAppDispatch, useAppSelector } from "../hooks";
import MainLayout from "./MainLayout";
import { BalanceInfo, Chart } from "../components";
import { SIZES, COLORS, FONTS, mockData, icons } from "../constants";
import { useFocusEffect } from "@react-navigation/native";
import { getHoldingsRequested } from "../store/market/slice";
import { mockHoldings } from "../constants/mock";
import { createModel, generateData, trainModel } from "../util/tensor";
import { FormDropListPicker } from "../components/FormDropListPicker";
import { setLearningRate, setModelOptions, setOptimizer } from "../store/model/slice";
import { FormInput } from "../components/FormInput";
import { Button } from "../components/Button";

interface ModelFormProps {
  optimizer?: string;
  learningRate?: number;
  epochs?: number;
}

const PortfolioScreen = () => {
  const formRef = React.useRef<FormikProps<ModelFormProps>>(null);

  const [input, label] = generateData();
  const optimizer = useAppSelector((state) => state.model.optimizer);
  const learningRate = useAppSelector((state) => state.model.learningRate);
  const epochs = useAppSelector((state) => state.model.epochs);

  const [modelReady, setModelReady] = useState(false);
  const [target, setTarget] = useState(0);
  const [prediction, setPrediction] = useState("");
  const [targetPredict, setTargetPredict] = useState(target * 2 + 5);
  const [model, setModel] = useState(createModel({ learningRate, optimizer }));

  const [selectedCoin, setSelectedCoin] = useState<any>(undefined);
  const { holdings, loadingGetHoldings } = useAppSelector((state) => state.market);
  const dispatch = useAppDispatch();

  // const totalWallet = holdings.reduce((a, b) => a + (b.total || 0), 0);
  // const valueChange = holdings.reduce((a, b) => a + (b.holdingValueChange7d || 0), 0);
  // const percentageChange = (valueChange / (totalWallet - valueChange)) * 100;

  useFocusEffect(
    useCallback(() => {
      dispatch(getHoldingsRequested({ holdings: mockHoldings }));
    }, [])
  );

  const chartPrices = selectedCoin
    ? selectedCoin?.sparklineIn7d?.value
    : holdings[0]?.sparklineIn7d?.value;

  // ------------------------------MODEL-----------------------------------------------

  const handleChangeTarget = (e) => {
    setTarget(Number(e.target.value));
  };

  useEffect(() => {
    console.log("triggered useEffect");
    setTarget(0);
    setPrediction("0");
    setModel(createModel({ learningRate, optimizer }));
  }, [learningRate, optimizer]);

  useEffect(() => {
    console.log("triggered useEffect");
    setTargetPredict(target * 2 + 5);
    model
      .predict(tf.tensor([target]))
      .data()
      .then((data) => setPrediction(parseFloat(data).toFixed(2).toString()));
  }, [target]);

  // -----------------------------------------------------------------------

  const onSubmit = (values: ModelFormProps) => {
    console.log("VALUES: ", values);
    dispatch(
      setModelOptions({
        optimizer: values.optimizer || "adam",
        learningRate: values.learningRate || 0.1,
        epochs: values.epochs || 50,
      })
    );
    setModelReady(false);
    trainModel(model, input, label, epochs)
      .then(() => setModelReady(true))
      .catch((e) => console.log(e));
  };

  const flattenedX = [].concat(...input.arraySync());
  const flattenedY = [].concat(...label.arraySync());

  console.log(optimizer);

  return (
    <MainLayout>
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/* Header - Current Balance */}
        {/* {renderCurrentBalanceSection()} */}
        {/* Data */}
        {/* Chart */}
        <Chart containerStyle={{ marginTop: SIZES.radius }} chartPrices={chartPrices} />
        {/* Assets */}
        <FlatList
          data={holdings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ marginTop: SIZES.padding, paddingHorizontal: SIZES.padding }}
          ListHeaderComponent={
            <View>
              {/* Section Title */}
              <Text style={[FONTS.h2, { color: COLORS.white }]}>{"Your Assets"}</Text>
              {/* Header Label */}
              <View style={{ flexDirection: "row", marginTop: SIZES.radius }}>
                <Text style={{ flex: 1, color: COLORS.lightGray3 }}>{"Asset"}</Text>
                <Text style={{ flex: 1, color: COLORS.lightGray3, textAlign: "right" }}>
                  {"Price"}
                </Text>
                <Text style={{ flex: 1, color: COLORS.lightGray3, textAlign: "right" }}>
                  {"Holdings"}
                </Text>
              </View>
            </View>
          }
          renderItem={({ item }) => {
            const priceColor =
              item.priceChangePercentageInCurrency7d === 0
                ? COLORS.lightGray3
                : item.priceChangePercentageInCurrency7d > 0
                ? COLORS.lightGreen
                : COLORS.red;
            return (
              <TouchableOpacity
                style={{ flexDirection: "row", height: 55 }}
                onPress={() => setSelectedCoin(item)}
              >
                {/* Asset */}
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                  <Image source={{ uri: item.image }} style={{ width: 20, height: 20 }} />
                  <Text style={[FONTS.h4, { marginLeft: SIZES.radius, color: COLORS.white }]}>
                    {item.name}
                  </Text>
                </View>
                {/* Price */}
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text
                    style={[FONTS.h4, { textAlign: "right", color: COLORS.white, lineHeight: 15 }]}
                  >{`$${item.currentPrice.toLocaleString()}`}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {item.priceChangePercentageInCurrency7d !== 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.priceChangePercentageInCurrency7d > 0
                              ? [{ rotate: "45deg" }]
                              : [{ rotate: "125deg" }],
                        }}
                      />
                    )}
                    <Text
                      style={[FONTS.body5, { marginLeft: 5, color: priceColor, lineHeight: 15 }]}
                    >{`${item.priceChangePercentageInCurrency7d.toFixed(2)} %`}</Text>
                  </View>
                </View>
                {/* Holdings */}
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text
                    style={[FONTS.h4, { textAlign: "right", color: COLORS.white, lineHeight: 15 }]}
                  >{`$ ${item.total.toLocaleString()}`}</Text>
                  <Text
                    style={[
                      FONTS.body5,
                      { textAlign: "right", color: COLORS.lightGray3, lineHeight: 15 },
                    ]}
                  >{`${item.qty} ${item.symbol}`}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={<View style={{ marginBottom: 50 }} />}
        />
        <View style={{ flex: 1, flexDirection: "row" }}>
          {flattenedX.map((x) => (
            <Text key={x} style={{ color: COLORS.white, paddingRight: 10 }}>
              {x}
            </Text>
          ))}
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {flattenedY.map((y) => (
            <Text key={y} style={{ color: COLORS.white, paddingRight: 10 }}>
              {y}
            </Text>
          ))}
        </View>
        <Formik
          innerRef={formRef}
          initialValues={{ optimizer, learningRate, epochs }}
          onSubmit={onSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, touched, errors }) => (
            <View>
              <FormDropListPicker
                title={"Select Optimizer"}
                label={"Optimizer:"}
                value={values.optimizer}
                items={["sgd", "adam", "adagrad", "adadelta", "momentum", "rmsprop"]}
                onSelect={(optimizer) => setFieldValue("optimizer", optimizer)}
                style={{ marginVertical: SIZES.base }}
                error={errors.optimizer}
                touched={touched.optimizer}
              />
              <FormInput
                label={"Learning Rate:"}
                value={values.learningRate?.toString()}
                onChangeText={handleChange("learningRate")}
                onBlur={handleBlur("learningRate")}
              />
              <FormInput
                label={"Epochs:"}
                value={values.epochs?.toString()}
                onChangeText={handleChange("epochs")}
                onBlur={handleBlur("epochs")}
              />
              <Button label={"Train Model"} onPress={() => handleSubmit()} />
            </View>
          )}
        </Formik>
      </View>
    </MainLayout>
  );
};

export default PortfolioScreen;
