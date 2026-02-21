import { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { ChevronLeft, ChevronRight, Check, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';

interface FormData {
  studentName: string;
  studentAge: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalConditions: string;
  signature: string;
  agreement: boolean;
}

const initialFormData: FormData = {
  studentName: '',
  studentAge: '',
  parentName: '',
  parentEmail: '',
  parentPhone: '',
  emergencyContact: '',
  emergencyPhone: '',
  medicalConditions: '',
  signature: '',
  agreement: false,
};

export function Registration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const totalSteps = 4;

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    navigate('/');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.studentName && formData.studentAge;
      case 2:
        return formData.parentName && formData.parentEmail && formData.parentPhone;
      case 3:
        return formData.emergencyContact && formData.emergencyPhone;
      case 4:
        return formData.agreement;
      default:
        return false;
    }
  };

  return (
    <PageLayout title="New Student Registration" showBack>
      <div className="p-4 pb-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#111827]">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-[#6B7280]">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#1C2D8C] to-[#00C2FF]"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {/* Step 1: Student Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-[#111827] mb-2">
                    Student Information
                  </h2>
                  <p className="text-sm text-[#6B7280]">
                    Tell us about the student who will be joining LTS Academy
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Student's Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.studentName}
                      onChange={(e) => updateFormData('studentName', e.target.value)}
                      placeholder="Enter student's name"
                      className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C2FF] transition-shadow"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Student's Age *
                    </label>
                    <input
                      type="number"
                      value={formData.studentAge}
                      onChange={(e) => updateFormData('studentAge', e.target.value)}
                      placeholder="Enter age"
                      className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C2FF] transition-shadow"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Parent Information */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-[#111827] mb-2">
                    Parent/Guardian Information
                  </h2>
                  <p className="text-sm text-[#6B7280]">
                    We need your contact information for academy communication
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.parentName}
                      onChange={(e) => updateFormData('parentName', e.target.value)}
                      placeholder="Enter your name"
                      className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C2FF] transition-shadow"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.parentEmail}
                      onChange={(e) => updateFormData('parentEmail', e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C2FF] transition-shadow"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.parentPhone}
                      onChange={(e) => updateFormData('parentPhone', e.target.value)}
                      placeholder="(555) 123-4567"
                      className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C2FF] transition-shadow"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Emergency Contact & Medical */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-[#111827] mb-2">
                    Emergency Contact & Medical
                  </h2>
                  <p className="text-sm text-[#6B7280]">
                    Important information for your student's safety
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Emergency Contact Name *
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContact}
                      onChange={(e) => updateFormData('emergencyContact', e.target.value)}
                      placeholder="Contact person's name"
                      className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C2FF] transition-shadow"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Emergency Contact Phone *
                    </label>
                    <input
                      type="tel"
                      value={formData.emergencyPhone}
                      onChange={(e) => updateFormData('emergencyPhone', e.target.value)}
                      placeholder="(555) 123-4567"
                      className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C2FF] transition-shadow"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Medical Conditions or Allergies
                    </label>
                    <textarea
                      value={formData.medicalConditions}
                      onChange={(e) => updateFormData('medicalConditions', e.target.value)}
                      placeholder="Please list any medical conditions, allergies, or special needs..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C2FF] transition-shadow resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Agreement & Signature */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-[#111827] mb-2">
                    Agreement & Signature
                  </h2>
                  <p className="text-sm text-[#6B7280]">
                    Review and sign the academy disclaimer
                  </p>
                </div>

                <div className="bg-[#F6F8FC] rounded-xl p-4 max-h-64 overflow-y-auto">
                  <h4 className="font-medium text-[#111827] mb-3">Liability Waiver & Agreement</h4>
                  <div className="text-sm text-[#6B7280] space-y-2 leading-relaxed">
                    <p>
                      I hereby acknowledge that ice skating involves inherent risks, and I assume all
                      risks associated with participation in LTS Academy programs.
                    </p>
                    <p>
                      I agree to release, waive, and discharge LTS Academy, its coaches, employees,
                      and representatives from any and all liability for injuries or damages arising
                      from participation.
                    </p>
                    <p>
                      I confirm that my child is physically fit to participate and has no medical
                      conditions that would prevent safe participation, except as disclosed above.
                    </p>
                    <p>
                      I grant permission for emergency medical treatment if necessary and agree to be
                      responsible for all medical expenses.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Digital Signature
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.signature}
                      onChange={(e) => updateFormData('signature', e.target.value)}
                      placeholder="Type your full name"
                      className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C2FF] transition-shadow"
                      style={{ fontFamily: 'cursive' }}
                    />
                  </div>
                  <p className="text-xs text-[#6B7280] mt-2">
                    By typing your name, you agree to sign this document electronically
                  </p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreement}
                    onChange={(e) => updateFormData('agreement', e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-[#1C2D8C] focus:ring-[#00C2FF]"
                  />
                  <span className="text-sm text-[#6B7280]">
                    I have read and agree to the terms and conditions outlined in the liability
                    waiver and agreement above. *
                  </span>
                </label>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center active:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-[#111827]" />
            </button>
          )}

          <button
            onClick={currentStep === totalSteps ? handleSubmit : nextStep}
            disabled={!canProceed()}
            className="flex-1 h-12 bg-[#1C2D8C] text-white rounded-full font-medium active:scale-95 transition-transform disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            {currentStep === totalSteps ? (
              <>
                <Check className="w-5 h-5" />
                Submit Registration
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
