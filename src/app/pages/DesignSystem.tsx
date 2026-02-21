import { PageLayout } from '../components/PageLayout';
import { Star, Calendar, Send } from 'lucide-react';
import { motion } from 'motion/react';

export function DesignSystem() {
  return (
    <PageLayout title="Design System" showBack>
      <div className="p-4 space-y-8">
        {/* Color Palette */}
        <section>
          <h2 className="text-xl font-semibold text-[#111827] mb-4">Color Palette</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="h-20 bg-[#1C2D8C] rounded-xl flex items-center justify-center">
                <span className="text-white text-sm font-medium">#1C2D8C</span>
              </div>
              <p className="text-xs text-[#6B7280]">Primary Blue</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-[#00C2FF] rounded-xl flex items-center justify-center">
                <span className="text-white text-sm font-medium">#00C2FF</span>
              </div>
              <p className="text-xs text-[#6B7280]">Accent Cyan</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-[#F6F8FC] rounded-xl border border-gray-200 flex items-center justify-center">
                <span className="text-[#111827] text-sm font-medium">#F6F8FC</span>
              </div>
              <p className="text-xs text-[#6B7280]">Background Ice</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-white rounded-xl border border-gray-200 flex items-center justify-center">
                <span className="text-[#111827] text-sm font-medium">#FFFFFF</span>
              </div>
              <p className="text-xs text-[#6B7280]">Card White</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-[#111827] rounded-xl flex items-center justify-center">
                <span className="text-white text-sm font-medium">#111827</span>
              </div>
              <p className="text-xs text-[#6B7280]">Primary Text</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-[#6B7280] rounded-xl flex items-center justify-center">
                <span className="text-white text-sm font-medium">#6B7280</span>
              </div>
              <p className="text-xs text-[#6B7280]">Secondary Text</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-xl font-semibold text-[#111827] mb-4">Typography</h2>
          <div className="bg-white rounded-[20px] p-5 space-y-4">
            <div>
              <p className="text-xs text-[#6B7280] mb-1">Heading 1</p>
              <h1 className="text-2xl font-semibold text-[#111827]">LTS Academy</h1>
            </div>
            <div className="h-px bg-gray-100" />
            <div>
              <p className="text-xs text-[#6B7280] mb-1">Heading 2</p>
              <h2 className="text-xl font-semibold text-[#111827]">Welcome back, Sarah!</h2>
            </div>
            <div className="h-px bg-gray-100" />
            <div>
              <p className="text-xs text-[#6B7280] mb-1">Heading 3</p>
              <h3 className="text-lg font-semibold text-[#111827]">Next Practice</h3>
            </div>
            <div className="h-px bg-gray-100" />
            <div>
              <p className="text-xs text-[#6B7280] mb-1">Body Text</p>
              <p className="text-sm text-[#111827]">
                Let's keep up the great progress with your skating journey
              </p>
            </div>
            <div className="h-px bg-gray-100" />
            <div>
              <p className="text-xs text-[#6B7280] mb-1">Caption</p>
              <p className="text-xs text-[#6B7280]">Member since 2024</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-xl font-semibold text-[#111827] mb-4">Buttons</h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[#6B7280] mb-2">Primary Button</p>
              <button className="w-full h-11 bg-[#1C2D8C] text-white rounded-full font-medium active:scale-95 transition-transform">
                Primary Action
              </button>
            </div>
            <div>
              <p className="text-xs text-[#6B7280] mb-2">Secondary Button</p>
              <button className="w-full h-11 border border-gray-200 text-[#111827] rounded-full font-medium active:bg-gray-50 transition-colors">
                Secondary Action
              </button>
            </div>
            <div>
              <p className="text-xs text-[#6B7280] mb-2">Accent Button</p>
              <button className="w-full h-11 bg-[#00C2FF] text-white rounded-full font-medium active:scale-95 transition-transform">
                Accent Action
              </button>
            </div>
            <div>
              <p className="text-xs text-[#6B7280] mb-2">Icon Button</p>
              <button className="w-11 h-11 bg-[#00C2FF] rounded-full flex items-center justify-center active:scale-95 transition-transform">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-xl font-semibold text-[#111827] mb-4">Cards</h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[#6B7280] mb-2">Standard Card</p>
              <div className="bg-white rounded-[20px] p-5 shadow-sm">
                <h3 className="font-semibold text-[#111827] mb-2">Card Title</h3>
                <p className="text-sm text-[#6B7280]">
                  This is a standard card with soft shadow and rounded corners
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-[#6B7280] mb-2">Gradient Card</p>
              <div className="bg-gradient-to-br from-[#1C2D8C] to-[#2A3FA8] rounded-[20px] p-5 text-white shadow-lg shadow-blue-900/20">
                <h3 className="font-semibold mb-2">Gradient Card</h3>
                <p className="text-sm text-white/80">
                  Featured card with gradient background for important content
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form Inputs */}
        <section>
          <h2 className="text-xl font-semibold text-[#111827] mb-4">Form Inputs</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Text Input
              </label>
              <input
                type="text"
                placeholder="Enter text..."
                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C2FF] transition-shadow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Text Area
              </label>
              <textarea
                placeholder="Enter longer text..."
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C2FF] transition-shadow resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Rounded Input (Search/Message)
              </label>
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full h-11 px-4 bg-[#F6F8FC] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#00C2FF] transition-shadow"
              />
            </div>
          </div>
        </section>

        {/* Icons & Badges */}
        <section>
          <h2 className="text-xl font-semibold text-[#111827] mb-4">Icons & Badges</h2>
          <div className="bg-white rounded-[20px] p-5 space-y-4">
            <div>
              <p className="text-xs text-[#6B7280] mb-3">Icon Containers</p>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-[#F6F8FC] rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#1C2D8C]" />
                </div>
                <div className="w-10 h-10 bg-[#1C2D8C] rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-white/20 backdrop-blur border border-white/30 rounded-full flex items-center justify-center">
                  <Send className="w-5 h-5 text-[#00C2FF]" />
                </div>
              </div>
            </div>
            <div className="h-px bg-gray-100" />
            <div>
              <p className="text-xs text-[#6B7280] mb-3">Badges</p>
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1.5 bg-[#F6F8FC] rounded-full">
                  <span className="text-sm text-[#111827]">Beginner</span>
                </div>
                <div className="px-3 py-1.5 bg-gradient-to-r from-[#1C2D8C]/10 to-[#00C2FF]/10 border border-[#00C2FF]/20 rounded-full">
                  <span className="text-sm text-[#1C2D8C] font-medium">USFS Certified</span>
                </div>
                <div className="px-3 py-1.5 bg-white/20 backdrop-blur rounded-full border border-white/30">
                  <span className="text-sm">Member Since 2024</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing System */}
        <section>
          <h2 className="text-xl font-semibold text-[#111827] mb-4">Spacing System (8px Grid)</h2>
          <div className="bg-white rounded-[20px] p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-[#1C2D8C]" />
              <span className="text-sm text-[#6B7280]">8px (2 units)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-8 bg-[#1C2D8C]" />
              <span className="text-sm text-[#6B7280]">16px (4 units)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-8 bg-[#1C2D8C]" />
              <span className="text-sm text-[#6B7280]">24px (6 units)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#1C2D8C]" />
              <span className="text-sm text-[#6B7280]">32px (8 units)</span>
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className="pb-4">
          <h2 className="text-xl font-semibold text-[#111827] mb-4">Border Radius</h2>
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <span className="text-sm text-[#6B7280]">12px - Small elements</span>
            </div>
            <div className="bg-white rounded-[20px] p-4 border border-gray-200">
              <span className="text-sm text-[#6B7280]">20px - Cards & containers</span>
            </div>
            <div className="bg-white rounded-full p-4 border border-gray-200 text-center">
              <span className="text-sm text-[#6B7280]">Full - Buttons & inputs</span>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
