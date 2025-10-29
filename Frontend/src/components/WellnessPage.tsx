import { Brain, Heart, Moon, Music, Smile, Wind } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function WellnessPage() {
  const wellnessTips = [
    {
      icon: Wind,
      title: "Meditation & Mindfulness",
      description: "Practice daily meditation to reduce stress and balance your hormones naturally.",
      quote: "Peace comes from within. Do not seek it without.",
    },
    {
      icon: Heart,
      title: "Regular Exercise",
      description: "Gentle yoga, walking, or swimming can improve insulin sensitivity and mood.",
      quote: "Take care of your body. It's the only place you have to live.",
    },
    {
      icon: Moon,
      title: "Quality Sleep",
      description: "Aim for 7-9 hours of sleep to support hormone regulation and recovery.",
      quote: "Sleep is the best meditation.",
    },
    {
      icon: Music,
      title: "Stress Management",
      description: "Listen to calming music, practice deep breathing, or engage in creative hobbies.",
      quote: "In the midst of movement and chaos, keep stillness inside of you.",
    },
    {
      icon: Smile,
      title: "Positive Affirmations",
      description: "Build self-love and confidence with daily positive affirmations and gratitude.",
      quote: "You are worthy, you are capable, you are enough.",
    },
    {
      icon: Brain,
      title: "Mental Health Support",
      description: "Consider therapy or counseling to address emotional challenges related to PCOS.",
      quote: "It's okay to ask for help. You don't have to do this alone.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-4">
            <Heart className="h-8 w-8 text-purple-500" />
          </div>
          <h1 className="mb-4">Emotional Wellness</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nurture your mind and spirit with practices that promote balance, peace, and emotional well-being.
          </p>
        </motion.div>

        {/* Hero Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-16 rounded-3xl overflow-hidden shadow-2xl"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1655943508401-5f1e2cce820e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHlvZ2ElMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc2MTQxMDI4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Yoga and meditation"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h2 className="mb-2 text-white">Find Your Inner Peace</h2>
            <p className="text-purple-100 max-w-2xl">
              Your mental and emotional health are just as important as your physical health. 
              Take time each day to nurture your well-being.
            </p>
          </div>
        </motion.div>

        {/* Wellness Tips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {wellnessTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all"
            >
              <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl inline-block mb-4">
                <tip.icon className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="mb-3 text-purple-600">{tip.title}</h3>
              <p className="text-gray-600 mb-4">{tip.description}</p>
              <div className="pt-4 border-t border-purple-100">
                <p className="text-purple-400 italic">"{tip.quote}"</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Breathing Exercise Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 lg:p-12 text-white mb-8"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-white">Quick Breathing Exercise</h2>
            <p className="text-purple-100 mb-8">
              Try this simple 4-7-8 breathing technique to calm your mind and reduce stress:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="mb-3">Inhale</div>
                <div className="text-white">4 seconds</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="mb-3">Hold</div>
                <div className="text-white">7 seconds</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="mb-3">Exhale</div>
                <div className="text-white">8 seconds</div>
              </div>
            </div>
            <p className="mt-6 text-purple-100">Repeat this cycle 4 times for instant relaxation.</p>
          </div>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-blue-50 border border-blue-200 rounded-2xl p-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-blue-100 rounded-2xl">
              <Heart className="h-12 w-12 text-blue-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="mb-2 text-blue-900">Need Someone to Talk To?</h3>
              <p className="text-blue-700 mb-4">
                Remember, you're not alone in this journey. Reach out to support groups, 
                therapists, or trusted friends and family members.
              </p>
              <a
                href="https://www.reddit.com/r/PCOS/"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
              >
                Find Support Resources
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
