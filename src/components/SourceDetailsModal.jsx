import React from 'react';
import { X, FileText, Plus, Bookmark, Copy } from 'lucide-react';

export const SourceDetailsModal = ({ source, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-96 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{source.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{source.title}</h3>
              <p className="text-sm text-gray-500">{source.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>{source.type}</span>
            </div>
            <span>•</span>
            <span>{source.author}</span>
            <span>•</span>
            <span>Updated {source.lastUpdated}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${
                source.confidence >= 90 ? 'bg-green-500' : 
                source.confidence >= 70 ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span>{source.confidence}% match</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-800 leading-relaxed">
              We understand that sometimes a purchase may not meet your expectations, and you may need to 
              request a refund. This comprehensive guide outlines the simple steps to help you navigate the refund process 
              and ensure a smooth resolution to your concern. Our customer-first approach ensures that eligible 
              returns are processed quickly and efficiently.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              <Plus className="w-4 h-4" />
              Use this source
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              <Bookmark className="w-4 h-4" />
              Save for later
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              <Copy className="w-4 h-4" />
              Copy link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};