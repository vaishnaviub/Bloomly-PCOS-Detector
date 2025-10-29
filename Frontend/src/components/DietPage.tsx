import { Apple, Fish, Leaf, Droplet, Sparkles, Salad } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function DietPage() {
  const dietTips = [
    {
      icon: Fish,
      title: "Omega-3 Rich Foods",
      description: "Include salmon, walnuts, and flaxseeds to reduce inflammation and support hormone balance.",
      image: "https://images.unsplash.com/photo-1572319216151-4fb52730dc68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbWVhbCUyMGJvd2x8ZW58MXx8fHwxNzYxNDQzMTM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-blue-100 to-cyan-100",
      textColor: "text-blue-600",
    },
    {
      icon: Leaf,
      title: "High-Fiber Foods",
      description: "Whole grains, vegetables, and legumes help regulate blood sugar and improve digestion.",
      image: "https://images.unsplash.com/photo-1648141383711-90448b584ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBmb29kfGVufDF8fHx8MTc2MTQwNzAzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-green-100 to-emerald-100",
      textColor: "text-green-600",
    },
    {
      icon: Apple,
      title: "Low Glycemic Index",
      description: "Choose foods that won't spike your blood sugar: berries, apples, and non-starchy vegetables.",
      image: "https://images.unsplash.com/photo-1572319216151-4fb52730dc68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbWVhbCUyMGJvd2x8ZW58MXx8fHwxNzYxNDQzMTM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-red-100 to-pink-100",
      textColor: "text-red-600",
    },
    {
      icon: Sparkles,
      title: "Anti-Inflammatory Spices",
      description: "Turmeric, cinnamon, and ginger can help reduce inflammation and support metabolism.",
      image: "https://images.unsplash.com/photo-1648141383711-90448b584ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBmb29kfGVufDF8fHx8MTc2MTQwNzAzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-yellow-100 to-orange-100",
      textColor: "text-orange-600",
    },
    {
      icon: Salad,
      title: "Lean Proteins",
      description: "Chicken, turkey, tofu, and legumes help maintain muscle mass and keep you feeling full.",
      image: "https://images.unsplash.com/photo-1572319216151-4fb52730dc68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbWVhbCUyMGJvd2x8ZW58MXx8fHwxNzYxNDQzMTM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-purple-100 to-pink-100",
      textColor: "text-purple-600",
    },
    {
      icon: Droplet,
      title: "Stay Hydrated",
      description: "Drink plenty of water and herbal teas to support hormone balance and overall health.",
      image: "https://images.unsplash.com/photo-1648141383711-90448b584ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBmb29kfGVufDF8fHx8MTc2MTQwNzAzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-cyan-100 to-blue-100",
      textColor: "text-cyan-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl mb-4">
            <Apple className="h-8 w-8 text-pink-500" />
          </div>
          <h1 className="mb-4">Diet Recommendations</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nourish your body with these PCOS-friendly foods that support hormone balance and overall wellness.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dietTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className={`absolute top-4 right-4 p-3 bg-gradient-to-br ${tip.color} rounded-xl`}>
                  <tip.icon className={`h-6 w-6 ${tip.textColor}`} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`mb-3 ${tip.textColor}`}>{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-8 lg:p-12 text-white"
        >
          <h2 className="mb-6 text-white text-center">Foods to Limit or Avoid</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="mb-3 text-white">Refined Carbohydrates</h3>
              <p className="text-pink-100">
                White bread, pastries, and sugary snacks can cause blood sugar spikes and worsen PCOS symptoms.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="mb-3 text-white">Processed Foods</h3>
              <p className="text-pink-100">
                Foods high in trans fats and preservatives can increase inflammation and insulin resistance.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="mb-3 text-white">Excessive Dairy</h3>
              <p className="text-pink-100">
                Some women with PCOS are sensitive to dairy. Consider reducing intake if you notice symptoms.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="mb-3 text-white">Sugary Beverages</h3>
              <p className="text-pink-100">
                Soda, fruit juices, and energy drinks can rapidly increase blood sugar and contribute to weight gain.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Meal Planning Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6"
        >
          <p className="text-blue-900">
            <strong>Pro Tip:</strong> Plan your meals ahead and maintain consistent eating times to help regulate your blood sugar and hormone levels. Consult with a registered dietitian for personalized nutrition advice.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
