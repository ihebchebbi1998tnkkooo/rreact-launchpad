import { Zap, Shield, Smartphone } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Lightning Fast",
      description: "Built with performance in mind for the best user experience."
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Secure by Default",
      description: "Enterprise-grade security built into every layer."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-primary" />,
      title: "Responsive Design",
      description: "Perfect experience across all devices and screen sizes."
    }
  ];

  return (
    <div id="features" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Amazing Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to build modern web applications.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border bg-white hover:shadow-lg transition-shadow duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;