import * as tf from "@tensorflow/tfjs";

let model: tf.LayersModel | null = null;
let isLoading = false;
let loadPromise: Promise<tf.LayersModel> | null = null;

export async function initModel(): Promise<tf.LayersModel> {
  if (model) return model;
  
  // Prevent multiple simultaneous loads
  if (isLoading && loadPromise) {
    return loadPromise;
  }
  
  isLoading = true;
  loadPromise = tf.loadLayersModel("/models/car_price_model/model.json")
    .then(loadedModel => {
      model = loadedModel;
      console.log("✅ Model loaded successfully!");
      console.log("Model input shape:", model.inputs[0].shape);
      console.log("Model output shape:", model.outputs[0].shape);
      return model;
    })
    .catch(error => {
      console.error("❌ Failed to load model:", error);
      throw error;
    })
    .finally(() => {
      isLoading = false;
    });
  
  return loadPromise;
}

// NEW: Call initModel automatically before prediction
export async function predictPrice(input: {
  gender: number;   // 0 = female, 1 = male
  age: number;
  salary: number;
  debt: number;
  netWorth: number;
}): Promise<number> {
  
  // ✅ Ensure model is loaded first
  if (!model) {
    await initModel();
  }
  
  if (!model) {
    throw new Error("Model failed to load");
  }

  console.log("Predicting with:", input);

  // 1️⃣ Create tensor [1, 5]
  const inputTensor = tf.tensor2d(
    [[
      input.gender,
      input.age,
      input.salary,
      input.debt,
      input.netWorth,
    ]],
    [1, 5]
  );

  // 2️⃣ Predict
  const prediction = model.predict(inputTensor) as tf.Tensor;

  // 3️⃣ Get value
  const result = (await prediction.data())[0];

  // 4️⃣ Cleanup
  tf.dispose([inputTensor, prediction]);

  console.log("Prediction result:", result);
  return result;
}

// Helper function for testing
export async function testPrediction() {
  try {
    const result = await predictPrice({
      gender: 1,
      age: 35,
      salary: 80000,
      debt: 10000,
      netWorth: 50000
    });
    console.log(`Test prediction: ${result}`);
    return result;
  } catch (error) {
    console.error("Test failed:", error);
    throw error;
  }
}