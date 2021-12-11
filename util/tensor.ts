import * as tf from "@tensorflow/tfjs";

export const OPTIMIZERS = {
  sgd: { libelle: "sgd", fn: (lr: number) => tf.train.sgd(lr) },
  adam: { libelle: "adam", fn: (lr: number) => tf.train.adam(lr) },
  adagrad: { libelle: "adagrad", fn: (lr: number) => tf.train.adagrad(lr) },
  adadelta: { libelle: "adadelta", fn: (lr: number) => tf.train.adadelta(lr) },
  momentum: { libelle: "momentum", fn: (lr: number) => tf.train.momentum(lr, 1) },
  rmsprop: { libelle: "rmsprop", fn: (lr: number) => tf.train.rmsprop(lr) },
};

export function generateData(xData?: number[], yData?: number[]) {
  const input = tf.tensor([0, 2, 4, 7, 10, 20, 50], [7, 1]);
  const label = tf.tensor([5, 9, 13, 19, 25, 45, 105], [7, 1]);
  return [input, label];
}

export function createModel({ units = 1, learningRate = 0.01, optimizer = "adam" }) {
  const selectOptimizer = (optimizer) => {
    return OPTIMIZERS[optimizer].fn(learningRate);
  };

  const model = tf.sequential();
  model.add(tf.layers.dense({ units, inputShape: [1] }));
  model.compile({
    optimizer: selectOptimizer(optimizer),
    loss: "meanSquaredError",
  });
  return model;
}

export async function trainModel(
  model: tf.Sequential,
  input: tf.Tensor<tf.Rank>,
  label: tf.Tensor<tf.Rank>,
  epochs = 150
) {
  await model.fit(input, label, { epochs });
}

export function flatten(arr: number[]) {
  arr.reduce((acc, currVal) => {
    return acc.concat(currVal);
  }, []);
}
