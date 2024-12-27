import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center animate-fade-up">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Build Something
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Amazing</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create beautiful, responsive web applications with our modern React framework.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
              Get Started
              <ArrowRight size={20} />
            </button>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg border hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;