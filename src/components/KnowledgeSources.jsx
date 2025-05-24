import React, { useState } from 'react';
import { ArrowRight, BarChart3 } from 'lucide-react';
import { mockAISources } from '../data/mockData';
import { SourceDetailsModal } from './SourceDetailsModal';

export const KnowledgeSources = () => {
  const [showSourceDetails, setShowSourceDetails] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);

  const handleSourceClick = (source) => {
    setSelectedSource(source);
    setShowSourceDetails(true);
  };

  return (
    <>
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-gray-900">Knowledge Sources</h4>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {mockAISources.length} sources found
          </span>
        </div>
        
        <div className="space-y-3">
          {mockAISources.map((source) => (
            <div
              key={source.id}
              className="group border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
              onClick={() => handleSourceClick(source)}
            >
              <div className="flex items-start gap-3">
                <div className="text-lg flex-shrink-0">{source.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-900">
                      {source.title}
                    </h5>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${
                        source.confidence >= 90 ? 'bg-green-500' : 
                        source.confidence >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-xs text-gray-500">{source.confidence}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-0.5 rounded">{source.category}</span>
                    <span>•</span>
                    <span>{source.author}</span>
                    <span>•</span>
                    <span>{source.lastUpdated}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
        
        <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mt-3 font-medium">
          <BarChart3 className="w-4 h-4" />
          View all sources ({mockAISources.length + 12} total)
        </button>
      </div>

      {showSourceDetails && selectedSource && (
        <SourceDetailsModal 
          source={selectedSource}
          onClose={() => setShowSourceDetails(false)}
        />
      )}
    </>
  );
};