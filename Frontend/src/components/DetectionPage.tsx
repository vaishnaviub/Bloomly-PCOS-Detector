import { Activity, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export function DetectionPage() {
  const [formData, setFormData] = useState({
    age: "",
    bmi: "",
    amh: "",
    fshLh: "",
    irregularPeriods: false,
    acne: false,
    hairLoss: false,
    weightGain: false,
    darkening: false,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ confidence: number; pcos_risk: string } | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowResult(false);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: formData.age,
          bmi: formData.bmi,
          amh: formData.amh,
          fshLh: formData.fshLh,
          irregularPeriods: formData.irregularPeriods ? 1 : 0,
          acne: formData.acne ? 1 : 0,
          hairLoss: formData.hairLoss ? 1 : 0,
          weightGain: formData.weightGain ? 1 : 0,
          darkening: formData.darkening ? 1 : 0,
        }),
      });

      const data = await response.json();
      setResult(data);
      setShowResult(true);
    } catch (error) {
      console.error("Error predicting PCOS:", error);
      alert("Server error! Make sure Flask backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      age: "",
      bmi: "",
      amh: "",
      fshLh: "",
      irregularPeriods: false,
      acne: false,
      hairLoss: false,
      weightGain: false,
      darkening: false,
    });
    setResult(null);
    setShowResult(false);
  };

  // ✅ Corrected logic: use string comparison
  const isHighRisk = result?.pcos_risk === "High";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl mb-4">
            <Activity className="h-8 w-8 text-pink-500" />
          </div>
          <h1 className="mb-4">PCOS Detection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill in your health information and symptoms to get an instant PCOS risk assessment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 lg:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h3 className="mb-6 text-pink-600">Medical Parameters</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { label: "Age (years)", name: "age", placeholder: "25" },
                  { label: "BMI (kg/m²)", name: "bmi", placeholder: "22.5" },
                  { label: "AMH (ng/mL)", name: "amh", placeholder: "3.5" },
                  { label: "FSH/LH Ratio", name: "fshLh", placeholder: "1.5" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-gray-700 mb-2">{field.label}</label>
                    <input
                      type="number"
                      step="0.1"
                      name={field.name}
                      value={formData[field.name as keyof typeof formData] as string}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      placeholder={field.placeholder}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-pink-600">Symptoms</h3>
              <div className="space-y-4">
                {[
                  { name: "irregularPeriods", label: "Irregular or missed periods" },
                  { name: "acne", label: "Acne or oily skin" },
                  { name: "hairLoss", label: "Hair thinning or hair loss" },
                  { name: "weightGain", label: "Unexplained weight gain" },
                  { name: "darkening", label: "Darkening of skin (neck, groin areas)" },
                ].map((symptom) => (
                  <label
                    key={symptom.name}
                    className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-pink-50 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name={symptom.name}
                      checked={formData[symptom.name as keyof typeof formData] as boolean}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                    />
                    <span className="ml-3 text-gray-700">{symptom.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-60"
            >
              {loading ? "Analyzing..." : "Predict PCOS"}
            </button>
          </form>

          {showResult && result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`mt-8 p-8 rounded-2xl ${
                isHighRisk
                  ? "bg-orange-50 border-2 border-orange-200"
                  : "bg-green-50 border-2 border-green-200"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-xl ${
                    isHighRisk ? "bg-orange-100" : "bg-green-100"
                  }`}
                >
                  {isHighRisk ? (
                    <AlertCircle className="h-8 w-8 text-orange-600" />
                  ) : (
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  )}
                </div>

                <div className="flex-1">
                  <h3
                    className={`mb-2 ${isHighRisk ? "text-orange-900" : "text-green-900"}`}
                  >
                    {isHighRisk ? "High PCOS Risk" : "Low PCOS Risk"}
                  </h3>

                  <p
                    className={`mb-4 ${isHighRisk ? "text-orange-700" : "text-green-700"}`}
                  >
                    {isHighRisk
                      ? `Based on your inputs, there is a ${result.confidence.toFixed(
                          2
                        )}% confidence you may have PCOS. Please consult a healthcare professional.`
                      : `Your PCOS risk appears low (${result.confidence.toFixed(
                          2
                        )}% confidence). Continue maintaining a healthy lifestyle.`}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={resetForm}
                      className="px-6 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      New Test
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-2xl"
        >
          <p className="text-blue-900">
            <strong>Disclaimer:</strong> This tool provides an estimate based on the information
            provided and should not be used as a substitute for professional medical advice.
            Always consult with a qualified healthcare provider for accurate diagnosis and treatment.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
