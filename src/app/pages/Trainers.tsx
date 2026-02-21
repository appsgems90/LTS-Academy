import { PageLayout } from '../components/PageLayout';
import { Award, Star, Calendar, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import missyImage from '../../assets/missy.PNG';

interface Coach {
  id: string;
  name: string;
  title: string;
  image: string;
  experience: string;
  bio: string;
  certifications: string[];
  rating: number;
}

const coaches: Coach[] = [
  {
    id: '1',
    name: 'Coach Missy',
    title: 'Head Coach & Founder',
    image: missyImage,
    experience: '15 Years',
    bio: 'Former professional figure skater with a passion for developing young talent. Specializes in beginner to intermediate training with focus on building strong fundamentals and confidence on ice.',
    certifications: ['USFS Certified', 'PSA Master Rated', 'SafeSport Certified'],
    rating: 5.0,
  },
];

export function Trainers() {
  return (
    <PageLayout title="Our Trainers">
      <div className="p-4 space-y-4">
        {coaches.map((coach, index) => (
          <motion.div
            key={coach.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-[20px] p-6 shadow-sm"
          >
            {/* Coach Header */}
            <div className="flex gap-4 mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                <ImageWithFallback
                  src={coach.image}
                  alt={coach.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[#111827] mb-1">{coach.name}</h3>
                <p className="text-sm text-[#6B7280] mb-2">{coach.title}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < coach.rating ? 'fill-[#00C2FF] text-[#00C2FF]' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-[#6B7280] ml-1">{coach.rating}</span>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="flex items-center gap-2 mb-4 p-3 bg-[#F6F8FC] rounded-xl">
              <Calendar className="w-5 h-5 text-[#1C2D8C]" />
              <span className="text-sm text-[#111827]">
                <span className="font-medium">{coach.experience}</span> of Coaching Experience
              </span>
            </div>

            {/* Bio */}
            <div className="mb-4">
              <h4 className="font-medium text-[#111827] mb-2">About</h4>
              <p className="text-sm text-[#6B7280] leading-relaxed">{coach.bio}</p>
            </div>

            {/* Certifications */}
            <div className="mb-5">
              <h4 className="font-medium text-[#111827] mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#00C2FF]" />
                Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {coach.certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="px-3 py-1.5 bg-gradient-to-r from-[#1C2D8C]/10 to-[#00C2FF]/10 border border-[#00C2FF]/20 rounded-full"
                  >
                    <span className="text-sm text-[#1C2D8C] font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 h-11 bg-[#1C2D8C] text-white rounded-full font-medium active:scale-95 transition-transform">
                View Profile
              </button>
              <button className="w-11 h-11 border border-gray-200 rounded-full flex items-center justify-center active:bg-gray-50 transition-colors">
                <Mail className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>
          </motion.div>
        ))}

        {/* Additional Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-[#1C2D8C]/5 to-[#00C2FF]/5 rounded-[20px] p-6 border border-[#00C2FF]/10"
        >
          <h4 className="font-semibold text-[#111827] mb-2">Meet Our Team</h4>
          <p className="text-sm text-[#6B7280] mb-4">
            Our certified coaching staff is dedicated to helping every student reach their full
            potential on the ice. With years of experience and a passion for teaching, we create a
            supportive and fun learning environment.
          </p>
          <button className="text-sm text-[#1C2D8C] font-medium">
            Learn More About Our Program →
          </button>
        </motion.div>
      </div>
    </PageLayout>
  );
}
