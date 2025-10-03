'use client';

import React, { useState } from 'react';
import { z } from 'zod';

// --- Phone Models Data ---
const phoneModels = {
  "Apple": ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15", "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14", "iPhone SE"],
  "Samsung": ["Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24", "Galaxy Z Fold 5", "Galaxy Z Flip 5", "Galaxy A55"],
  "Google Pixel": ["Pixel 8 Pro", "Pixel 8", "Pixel 7a", "Pixel Fold", "Pixel 7 Pro"],
};

// --- Zod Schema for Validation ---
const orderSchema = z.object({
  name: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  mobile: z.string().min(10, { message: 'Please enter a valid mobile number' }),
  brand: z.string().min(1, { message: 'Please select a brand' }),
  model: z.string().min(1, { message: 'Please select a model' }),
  accessories: z.string().optional(),
});

// --- Main Page Component ---
export default function OrderPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
         <OrderForm />
         <footer className="text-center mt-6">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Order System. All rights reserved.</p>
         </footer>
      </div>
    </div>
  );
}

// --- Order Form Logic Component ---
function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    brand: '',
    model: '',
    accessories: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Special handling for brand change to reset the model
    if (name === 'brand') {
        setFormData(prev => ({
            ...prev,
            brand: value,
            model: '' // Reset model when brand changes
        }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts interacting
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    // Also clear model error if brand is changed
    if (name === 'brand' && errors.model) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.model;
            return newErrors;
        });
    }
  };

  const formatWhatsAppMessage = () => {
    // Start with "Hi" to help with accounts that block long first messages.
    let message = `Hi\n\n` +
                  `*New Order Request*\n\n` +
                  `*Name:* ${formData.name}\n` +
                  `*Mobile:* ${formData.mobile}\n` +
                  `*Brand:* ${formData.brand}\n` +
                  `*Model:* ${formData.model}`;

    if (formData.accessories) {
      message += `\n\n*Accessories:*\n${formData.accessories}`;
    }

    // encodeURIComponent handles all special characters correctly.
    return encodeURIComponent(message);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    // Validate form data with Zod
    const result = orderSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        if (issue.path && issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    
    const whatsappNumber = "+923152561004";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${formatWhatsAppMessage()}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-orange-500">Order Now</h1>
            <a href="#" className="text-orange-500 hover:text-orange-700 font-medium text-sm">
              ← Back
            </a>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg outline-none transition placeholder:text-gray-400 text-black focus:ring-2 ${errors.name ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:border-orange-400 focus:ring-orange-300'}`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg outline-none transition placeholder:text-gray-400 text-black focus:ring-2 ${errors.mobile ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:border-orange-400 focus:ring-orange-300'}`}
                placeholder="Enter your mobile number"
              />
               {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <select
                     id="brand"
                     name="brand"
                     value={formData.brand}
                     onChange={handleChange}
                     className={`w-full px-4 py-3 border rounded-lg outline-none transition text-black focus:ring-2 ${errors.brand ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:border-orange-400 focus:ring-orange-300'}`}
                  >
                     <option value="">Select Brand</option>
                     {Object.keys(phoneModels).map(brandName => (
                        <option key={brandName} value={brandName}>{brandName}</option>
                     ))}
                  </select>
                  {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
               </div>
               <div>
                  <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <select
                     id="model"
                     name="model"
                     value={formData.model}
                     onChange={handleChange}
                     disabled={!formData.brand}
                     className={`w-full px-4 py-3 border rounded-lg outline-none transition text-black focus:ring-2 ${errors.model ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:border-orange-400 focus:ring-orange-300'} disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  >
                     <option value="">Select Model</option>
                     {formData.brand && phoneModels[formData.brand].map(modelName => (
                        <option key={modelName} value={modelName}>{modelName}</option>
                     ))}
                  </select>
                  {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
               </div>
            </div>
            
            <div>
              <label htmlFor="accessories" className="block text-sm font-medium text-gray-700 mb-1">Accessories</label>
              <textarea
                id="accessories"
                name="accessories"
                value={formData.accessories}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition placeholder:text-gray-400 text-black"
                placeholder="List accessories (e.g., charger, case)"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
            >
              Send Order to WhatsApp
            </button>
          </form>
        </div>
    </div>
  );
}