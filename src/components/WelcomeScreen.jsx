import React from 'react';
import { Bot, Zap, Shield, Users, BarChart3 } from 'lucide-react';

export const WelcomeScreen = () => {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered',
      description: 'Instant intelligent responses',
      color: 'text-blue-600'
    },
    {
      icon: Shield,
      title: 'Smart Sources',
      description: 'Knowledge base integration',
      color: 'text-green-600'
    },
    {
      icon: Users,
      title: 'Customer Intel',
      description: 'Complete customer insights',
      color: 'text-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Performance tracking',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4 sm:px-6 md:px-8 py-10">
      <div className="text-center w-full max-w-sm sm:max-w-md md:max-w-2xl">
        {/* Icon Box */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 px-2">
          Welcome to AI-Powered Support
        </h2>

        {/* Paragraph */}
        <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed px-2">
          Select a conversation to get started with intelligent customer support. 
          Our AI copilot will help you provide faster, more accurate responses.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm px-1 sm:px-0">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <IconComponent className={`w-4 h-4 ${feature.color}`} />
                  <span className="font-semibold text-sm sm:text-base">{feature.title}</span>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
