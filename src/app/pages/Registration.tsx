import { useState } from "react";
import { PageLayout } from "../components/PageLayout";
import { useNavigate } from "react-router";
import { Check, ChevronRight } from "lucide-react";
import { ref, push } from "firebase/database";
import { db } from "../../../lib/firebase";

interface SimpleFormData {
  parentName: string;
  studentName?: string;
  parentPhone: string;
  role: "parent" | "coach";
  avatarUrl?: string;
}

const initialFormData: SimpleFormData = {
  parentName: "",
  studentName: "",
  parentPhone: "",
  role: "parent",
};

export function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SimpleFormData>(initialFormData);

  // ...existing code...

  const updateFormData = (field: keyof SimpleFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    // if coach, studentName may be empty
    if (!formData.parentName || !formData.parentPhone) return;
    if (formData.role === "parent" && !formData.studentName) return;

    // compute an avatar URL if not already provided
    const avatar =
      formData.avatarUrl ||
      `https://api.dicebear.com/6.x/identicon/svg?seed=${encodeURIComponent(
        formData.parentName
      )}`;

    const payload: SimpleFormData = { ...formData, avatarUrl: avatar };

    // Save to Firebase
    const usersRef = ref(db, "users");
    await push(usersRef, payload);

    // Save locally for session persistence
    localStorage.setItem("ltsUser", JSON.stringify(payload));
    localStorage.setItem("registered", "true");

    // Redirect to chat
    navigate("/chat");
  };

  return (
    <PageLayout title="Register for LTS Academy">
      <div className="p-4 space-y-6">
        {/* optionally show generated avatar for preview */}
        <div className="flex justify-center">
          <img
            src={
              formData.avatarUrl ||
              `https://api.dicebear.com/6.x/identicon/svg?seed=${encodeURIComponent(
                formData.parentName || ''
              )}`
            }
            alt="avatar preview"
            className="w-24 h-24 rounded-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Role *</label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="parent"
                checked={formData.role === "parent"}
                onChange={() => updateFormData("role", "parent")}
                className="form-radio h-4 w-4"
              />
              <span className="ml-2">Parent</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="coach"
                checked={formData.role === "coach"}
                onChange={() => updateFormData("role", "coach")}
                className="form-radio h-4 w-4"
              />
              <span className="ml-2">Coach/Trainer</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Parent Name *</label>
          <input
            type="text"
            value={formData.parentName}
            onChange={(e) => updateFormData("parentName", e.target.value)}
            placeholder="Enter your name"
            className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C2FF]"
          />
        </div>

        {formData.role === "parent" && (
          <div>
            <label className="block text-sm font-medium mb-2">Skater Name *</label>
            <input
              type="text"
              value={formData.studentName}
              onChange={(e) => updateFormData("studentName", e.target.value)}
              placeholder="Enter skater's name"
              className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C2FF]"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Phone Number *</label>
          <input
            type="tel"
            value={formData.parentPhone}
            onChange={(e) => updateFormData("parentPhone", e.target.value)}
            placeholder="(555) 123-4567"
            className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C2FF]"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={
            !formData.parentName ||
            !formData.parentPhone ||
            (formData.role === "parent" && !formData.studentName)
          }
          className="w-full h-12 bg-[#1C2D8C] text-white rounded-full flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Check className="w-5 h-5" />
          Register & Start Chat
        </button>
      </div>
    </PageLayout>
  );
}