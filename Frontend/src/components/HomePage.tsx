import { Sparkles, Activity, Heart, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: Activity,
      title: "Instant Detection",
      description: "Quick and reliable PCOS detection based on medical parameters and symptoms.",
    },
    {
      icon: Heart,
      title: "Personalized Care",
      description: "Get customized diet and wellness recommendations tailored to your needs.",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your health journey with comprehensive tracking tools.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center space-x-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                <span>Your health companion</span>
              </div>
              <h1 className="mb-6">
                <span className="block">Empowering Women's Health </span>
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  💫
                </span>
              </h1>
              <p className="text-gray-600 mb-8 max-w-xl">
                Understand your body. Detect PCOS instantly. Get personalized diet and wellness support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate("detection")}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Start Detection
                </button>
                <button
                  onClick={() => onNavigate("wellness")}
                  className="px-8 py-4 bg-white text-pink-600 border-2 border-pink-200 rounded-xl hover:bg-pink-50 transition-all"
                >
                  Learn More
                </button>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1685977648886-2344df7aab68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25maWRlbnQlMjB3b21lbiUyMGhlYWx0aHxlbnwxfHx8fDE3NjE0ODg5Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Confident women in health"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent" />
              </div>
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl">
                    <Heart className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-gray-500">Your Wellness Journey</p>
                    <p className="text-pink-600">Starts Here</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">Why Choose Bloomly?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive support for your health journey with science-backed tools and personalized recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-pink-100"
              >
                <div className="p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl inline-block mb-4">
                  <feature.icon className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-12 text-center text-white shadow-2xl"
          >
            <h2 className="mb-4 text-white">Ready to Take Control of Your Health?</h2>
            <p className="mb-8 text-pink-100 max-w-2xl mx-auto">
              Join thousands of women who are taking charge of their health with our comprehensive PCOS support platform.
            </p>
            <button
              onClick={() => onNavigate("register")}
              className="px-8 py-4 bg-white text-pink-600 rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
            >
              Get Started Free
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
