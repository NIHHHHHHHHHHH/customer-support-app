class AIResponseGenerator {
  constructor() {
    this.responses = new Map([
      ['how do i get a refund', this.getRefundResponse()],
      ['what\'s your return policy', this.getReturnPolicyResponse()],
      ['how long does shipping take', this.getShippingResponse()],
      ['can i change my order', this.getOrderChangeResponse()],
      ['do you offer exchanges', this.getExchangeResponse()],
      ['what\'s your warranty policy', this.getWarrantyResponse()],
      ['i placed the order over 60 days ago', this.getOver60DaysResponse()],
      ['what if the order was over 60 days ago', this.getOver60DaysResponse()]
    ]);
  }

  generateResponse(query) {
    const normalizedQuery = query.toLowerCase().trim();
    
    // Check for exact matches first
    if (this.responses.has(normalizedQuery)) {
      return this.responses.get(normalizedQuery);
    }

    // Check for partial matches
    for (const [key, response] of this.responses.entries()) {
      if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
        return response;
      }
    }

    // Default response for unmatched queries
    return this.getDefaultResponse(query);
  }

  // Rephrase functionality
  rephraseText(text, tone) {
    switch (tone) {
      case 'friendly':
        return this.rephraseToFriendly(text);
      case 'formal':
        return this.rephraseToFormal(text);
      case 'grammar':
        return this.fixGrammar(text);
      case 'translate':
        return this.translateText(text);
      default:
        return text;
    }
  }

  rephraseToFriendly(text) {
    return text
      .replace(/We understand/g, "We totally get it")
      .replace(/Please note/g, "Just a heads up")
      .replace(/requirements/g, "conditions")
      .replace(/Thank you/g, "Thanks so much")
      .replace(/\./g, ". 😊");
  }

  rephraseToFormal(text) {
    return text
      .replace(/We get it/g, "We understand")
      .replace(/heads up/g, "please note")
      .replace(/Thanks/g, "Thank you")
      .replace(/can't/g, "cannot")
      .replace(/won't/g, "will not");
  }

  fixGrammar(text) {
    return text
      .replace(/\bi\b/g, "I")
      .replace(/\bdont\b/g, "don't")
      .replace(/\bcant\b/g, "can't")
      .replace(/\bwont\b/g, "won't")
      .replace(/\s+/g, " ")
      .trim();
  }

  translateText(text) {
    // Mock translation - in real app would use translation API
    return `[Translated to Spanish] ${text.replace(/Hello/g, "Hola").replace(/Thank you/g, "Gracias")}`;
  }

  getRefundResponse() {
    return `We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund.

To assist you with your refund request, could you please provide your order ID and proof of purchase.

Please note:
We can only refund orders placed within the last 60 days, and your item must meet our requirements for condition to be returned. Please check when you placed your order before proceeding.

Once I've checked these details, if everything looks OK, I will send a returns QR code which you can use to post the item back to us. Your refund will be automatically issued once you put it in the post.`;
  }

  getOver60DaysResponse() {
    return `I understand your situation, and I appreciate you reaching out to us about your order from over 60 days ago. 

While our standard refund policy typically covers orders within 60 days, I'd be happy to review your specific case to see what options might be available.

Could you please provide me with:
- Your order number
- The reason for the return request
- Photos of the item's current condition

I'll escalate this to our customer service manager who has the authority to make exceptions for special circumstances. We always try to work with our valued customers when possible.

Thank you for your patience, and I'll do my best to find a solution for you! 🙂`;
  }

  getReturnPolicyResponse() {
    return `Our return policy allows returns within 60 days of purchase for most items. Here are the key points:

• Items must be unused and in original packaging
• Free returns for defective or damaged items
• Customer pays return shipping for change of mind
• Refunds processed within 5-7 business days
• Some items like personalized products are non-returnable

Would you like more specific information about your particular item?`;
  }

  getShippingResponse() {
    return `Shipping times depend on your location and chosen method:

• Standard shipping: 3-5 business days
• Express shipping: 1-2 business days
• International shipping: 7-14 business days

You'll receive tracking information once your order ships. Premium members get free express shipping on orders over $50.

Is there a specific order you'd like me to check the status for?`;
  }

  getOrderChangeResponse() {
    return `We can help you modify your order, but it depends on its current status:

• If your order hasn't shipped yet, we can make changes to items, quantities, or shipping address
• Once shipped, we can't modify the order, but you can return items for exchange
• Processing typically takes 1-2 hours before shipping

Please provide your order number so I can check its current status and available options.`;
  }

  getExchangeResponse() {
    return `Yes, we offer exchanges for most items within 60 days of purchase:

• Same item in different size/color: Free exchange
• Different item of equal value: Free exchange
• Different item of higher value: Pay the difference
• Items must be unused and in original packaging

The exchange process is simple - just initiate a return and select "exchange" as your reason. We'll send you a prepaid return label.`;
  }

  getWarrantyResponse() {
    return `Our warranty coverage varies by product category:

• Electronics: 1-year manufacturer warranty
• Clothing: 90-day quality guarantee
• Home goods: 6-month warranty against defects
• Premium items: Extended warranty options available

All warranties cover manufacturing defects but not normal wear or accidental damage. For specific warranty details, please check your product page or contact us with your order number.`;
  }

  getDefaultResponse(query) {
    return `I understand your question about "${query}". Let me help you with that.

Based on our knowledge base, I can provide you with relevant information. Could you please provide more specific details so I can give you the most accurate assistance?

I'm here to help resolve any concerns you might have quickly and efficiently.`;
  }

  // Generate suggestions based on context
  getSuggestions(context) {
    const commonSuggestions = [
      "How do I get a refund?",
      "What's your return policy?", 
      "How long does shipping take?"
    ];

    if (context?.includes("refund") || context?.includes("return")) {
      return [
        "What if the order was over 60 days ago?",
        "Do I need the original receipt?",
        "How long does the refund take?",
        ...commonSuggestions.slice(1)
      ];
    }

    return commonSuggestions;
  }
}

export const aiResponseGenerator = new AIResponseGenerator();



