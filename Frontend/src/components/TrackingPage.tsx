import { Activity, TrendingUp, Weight, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface TrackingData {
  age: number;
  bmi: number;
  amh: number;
  fshLh: number;
  testosterone: number;
  cycle_days: number;
  progress: number;
  pcos_risk: string;
  confidence: number;
  created_at: string;
  weight_history?: { month: string; weight: number }[];
  bmi_history?: { month: string; bmi: number }[];
}

export function TrackingPage() {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/tracking/1")
      .then((res) => res.json())
      .then((data) => {
        setTrackingData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tracking data:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-pink-500 text-lg font-semibold">
        Loading tracking data...
      </div>
    );

  if (!trackingData)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        No tracking data found.
      </div>
    );

  // Dummy fallback history if backend doesn’t send any yet
  const weightData =
    trackingData.weight_history || [
      { month: "Jan", weight: trackingData.bmi + 42 },
      { month: "Feb", weight: trackingData.bmi + 41 },
      { month: "Mar", weight: trackingData.bmi + 40 },
      { month: "Apr", weight: trackingData.bmi + 39 },
      { month: "May", weight: trackingData.bmi + 38 },
      { month: "Jun", weight: trackingData.bmi + 37 },
    ];

  const bmiData =
    trackingData.bmi_history || [
      { month: "Jan", bmi: trackingData.bmi + 1 },
      { month: "Feb", bmi: trackingData.bmi },
      { month: "Mar", bmi: trackingData.bmi - 0.5 },
      { month: "Apr", bmi: trackingData.bmi - 0.7 },
      { month: "May", bmi: trackingData.bmi - 0.9 },
      { month: "Jun", bmi: trackingData.bmi - 1 },
    ];

  const hormoneData = [
    { name: "AMH", value: trackingData.amh, target: 3.5 },
    { name: "FSH/LH", value: trackingData.fshLh, target: 7.0 },
    { name: "Testosterone", value: trackingData.testosterone || 55, target: 45 },
  ];

  const stats = [
    {
      icon: Weight,
      label: "Current Weight",
      value: `${(trackingData.bmi * 1.8).toFixed(1)} kg`,
      change: "-2.5 kg",
      positive: true,
      color: "from-pink-100 to-purple-100",
      textColor: "text-pink-600",
    },
    {
      icon: Activity,
      label: "BMI",
      value: trackingData.bmi.toFixed(1),
      change: "-1.1",
      positive: true,
      color: "from-blue-100 to-cyan-100",
      textColor: "text-blue-600",
    },
    {
      icon: TrendingUp,
      label: "Progress",
      value: `${trackingData.progress || 72}%`,
      change: "+8%",
      positive: true,
      color: "from-green-100 to-emerald-100",
      textColor: "text-green-600",
    },
    {
      icon: Calendar,
      label: "Cycle Days",
      value: `${trackingData.cycle_days || 32} days`,
      change: trackingData.cycle_days <= 35 ? "Regular" : "Irregular",
      positive: trackingData.cycle_days <= 35,
      color: "from-purple-100 to-pink-100",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="mb-4">Health Tracking Dashboard</h1> 
          <p className="text-gray-600"> Monitor your progress and stay on top of your health metrics. </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all"
            >
              <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl inline-block mb-4`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
              <p className="text-gray-600 mb-1">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className={stat.textColor}>{stat.value}</p>
                <span
                  className={`px-2 py-1 rounded-lg ${
                    stat.positive
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Weight Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h3 className="mb-6 text-pink-600">Weight Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#ec4899"
                  strokeWidth={3}
                  dot={{ fill: "#ec4899", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-gray-600 mt-4">
              Great progress! Keep maintaining a healthy routine.
            </p>
          </motion.div>

          {/* BMI Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h3 className="mb-6 text-purple-600">BMI Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bmiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="bmi"
                  stroke="#a855f7"
                  strokeWidth={3}
                  dot={{ fill: "#a855f7", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-gray-600 mt-4">
              Your BMI is improving steadily — you’re doing great!
            </p>
          </motion.div>
        </div>

        {/* Hormone Levels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-md p-6 mb-8"
        >
          <h3 className="mb-6 text-pink-600">Hormone Levels Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hormoneData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="value" fill="#ec4899" radius={[8, 8, 0, 0]} />
              <Bar dataKey="target" fill="#d1d5db" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-pink-500 rounded" />
              <span className="text-gray-600">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <span className="text-gray-600">Target</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-8 lg:p-12 text-white"
        >
          <h2 className="mb-6 text-white text-center">Log Your Progress</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl p-6 transition-all">
              <Weight className="h-8 w-8 mb-3 mx-auto" />
              <p>Log Weight</p>
            </button>
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl p-6 transition-all">
              <Activity className="h-8 w-8 mb-3 mx-auto" />
              <p>Add Symptoms</p>
            </button>
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl p-6 transition-all">
              <Calendar className="h-8 w-8 mb-3 mx-auto" />
              <p>Track Cycle</p>
            </button>
          </div>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6"
        >
          <p className="text-blue-900">
            <strong>Note:</strong> Regular tracking helps you and your healthcare provider make informed decisions about your treatment plan.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
