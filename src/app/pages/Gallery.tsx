import { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface GalleryImage {
  id: string;
  url: string;
  category: 'Competition' | 'Practice' | 'Camp';
  title: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1509362803586-12d1a67df239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'Competition',
    title: 'Winter Showcase 2026',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1548044792-c05cb81e637f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'Practice',
    title: 'Saturday Morning Practice',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1682953393270-1dd49c0c4989?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'Practice',
    title: 'Edge Work Training',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1659004779624-1ee5b3e1478f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'Competition',
    title: 'Jump Technique',
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1706841877942-3db628c4d8b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'Practice',
    title: 'Group Session',
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1693638816845-294e0fabcc85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'Camp',
    title: 'Summer Skating Camp',
  },
];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories = ['All', 'Competition', 'Practice', 'Camp'];

  const filteredImages =
    selectedCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <PageLayout title="Gallery">
      <div className="p-4 space-y-4">
        {/* Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 h-10 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-[#1C2D8C] text-white'
                  : 'bg-white text-[#6B7280] active:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => setSelectedImage(image)}
              className="aspect-square rounded-[20px] overflow-hidden bg-white shadow-sm cursor-pointer active:scale-95 transition-transform"
            >
              <ImageWithFallback
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Screen Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full rounded-[20px]"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white font-semibold">{selectedImage.title}</h3>
                <p className="text-white/60 text-sm mt-1">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
