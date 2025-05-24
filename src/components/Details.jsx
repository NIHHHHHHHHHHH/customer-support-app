import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, User, Users } from 'lucide-react';

const DetailsSection = ({ title, isOpen, onToggle, children }) => (
  <div className="border-b border-gray-100">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-3 px-4 text-left hover:bg-gray-50 transition-colors"
    >
      <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">
        {title}
      </span>
      {isOpen ? (
        <ChevronUp className="w-4 h-4 text-gray-400" />
      ) : (
        <ChevronDown className="w-4 h-4 text-gray-400" />
      )}
    </button>
    {isOpen && (
      <div className="px-4 pb-4">
        {children}
      </div>
    )}
  </div>
);

const LinkItem = ({ icon, title, onAdd }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center gap-3">
      <span className="text-base">{icon}</span>
      <span className="text-sm text-gray-700">{title}</span>
    </div>
    <button
      onClick={onAdd}
      className="p-1 hover:bg-gray-100 rounded transition-colors"
    >
      <Plus className="w-4 h-4 text-gray-400" />
    </button>
  </div>
);

export const Details = () => {
  const [openSections, setOpenSections] = useState({
    links: true,
    userData: false,
    conversationAttributes: false,
    companyDetails: false,
    salesforce: false,
    stripe: false,
    jiraTickets: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="bg-white flex flex-col h-full">
      {/* Assignee and Team Section */}
      <div className="p-4 border-b border-gray-100">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Assignee</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                <User className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm text-gray-900">Nihal</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Team</span>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">Unassigned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className="flex-1 overflow-y-auto">
        {/* Links Section */}
        <DetailsSection
          title="LINKS"
          isOpen={openSections.links}
          onToggle={() => toggleSection('links')}
        >
          <div className="space-y-1">
            <LinkItem
              icon="📋"
              title="Tracker ticket"
              onAdd={() => console.log('Add tracker ticket')}
            />
            <LinkItem
              icon="🎫"
              title="Back-office tickets"
              onAdd={() => console.log('Add back-office ticket')}
            />
            <LinkItem
              icon="💬"
              title="Side conversations"
              onAdd={() => console.log('Add side conversation')}
            />
          </div>
        </DetailsSection>

        {/* User Data Section */}
        <DetailsSection
          title="USER DATA"
          isOpen={openSections.userData}
          onToggle={() => toggleSection('userData')}
        >
          <div className="text-sm text-gray-500">
            No user data available
          </div>
        </DetailsSection>

        {/* Conversation Attributes Section */}
        <DetailsSection
          title="CONVERSATION ATTRIBUTES"
          isOpen={openSections.conversationAttributes}
          onToggle={() => toggleSection('conversationAttributes')}
        >
          <div className="text-sm text-gray-500">
            No conversation attributes
          </div>
        </DetailsSection>

        {/* Company Details Section */}
        <DetailsSection
          title="COMPANY DETAILS"
          isOpen={openSections.companyDetails}
          onToggle={() => toggleSection('companyDetails')}
        >
          <div className="text-sm text-gray-500">
            No company details available
          </div>
        </DetailsSection>

        {/* Salesforce Section */}
        <DetailsSection
          title="SALESFORCE"
          isOpen={openSections.salesforce}
          onToggle={() => toggleSection('salesforce')}
        >
          <div className="text-sm text-gray-500">
            No Salesforce data
          </div>
        </DetailsSection>

        {/* Stripe Section */}
        <DetailsSection
          title="STRIPE"
          isOpen={openSections.stripe}
          onToggle={() => toggleSection('stripe')}
        >
          <div className="text-sm text-gray-500">
            No Stripe data
          </div>
        </DetailsSection>

        {/* Jira for Tickets Section */}
        <DetailsSection
          title="JIRA FOR TICKETS"
          isOpen={openSections.jiraTickets}
          onToggle={() => toggleSection('jiraTickets')}
        >
          <div className="text-sm text-gray-500">
            No JIRA tickets
          </div>
        </DetailsSection>
      </div>
    </div>
  );
};