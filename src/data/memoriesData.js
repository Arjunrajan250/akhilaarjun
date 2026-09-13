// Memory archive dataset connected to all 36 real photos in src/assets/images
const imageModules = import.meta.glob('../assets/images/*.jpg', { eager: true, import: 'default' });

export const getPhotoSrc = (id) => {
  return imageModules[`../assets/images/${id}.jpg`] || `/photos/${id}.jpg`;
};

// Reordered in reverse: from latest photo 36 down to photo 1
export const MEMORIES_DATA = [
  { id: 36, src: getPhotoSrc(36), category: 'milestones', rotation: 1.9 },
  { id: 35, src: getPhotoSrc(35), category: 'cozy', rotation: -1.9 },
  { id: 34, src: getPhotoSrc(34), category: 'travel', rotation: 1.4 },
  { id: 33, src: getPhotoSrc(33), category: 'smiles', rotation: -2.1 },
  { id: 32, src: getPhotoSrc(32), category: 'adventures', rotation: 1.9 },
  { id: 31, src: getPhotoSrc(31), category: 'dates', rotation: -1.5 },
  { id: 30, src: getPhotoSrc(30), category: 'adventures', rotation: 2.2 },
  { id: 29, src: getPhotoSrc(29), category: 'cozy', rotation: -1.8 },
  { id: 28, src: getPhotoSrc(28), category: 'dates', rotation: 1.3 },
  { id: 27, src: getPhotoSrc(27), category: 'cozy', rotation: -2.0 },
  { id: 26, src: getPhotoSrc(26), category: 'smiles', rotation: 1.6 },
  { id: 25, src: getPhotoSrc(25), category: 'milestones', rotation: -1.7 },
  { id: 24, src: getPhotoSrc(24), category: 'travel', rotation: 2.1 },
  { id: 23, src: getPhotoSrc(23), category: 'adventures', rotation: -1.6 },
  { id: 22, src: getPhotoSrc(22), category: 'travel', rotation: 1.5 },
  { id: 21, src: getPhotoSrc(21), category: 'dates', rotation: -2.3 },
  { id: 20, src: getPhotoSrc(20), category: 'smiles', rotation: 1.8 },
  { id: 19, src: getPhotoSrc(19), category: 'adventures', rotation: -1.4 },
  { id: 18, src: getPhotoSrc(18), category: 'dates', rotation: 2.0 },
  { id: 17, src: getPhotoSrc(17), category: 'smiles', rotation: -1.9 },
  { id: 16, src: getPhotoSrc(16), category: 'milestones', rotation: 1.7 },
  { id: 15, src: getPhotoSrc(15), category: 'cozy', rotation: -2.1 },
  { id: 14, src: getPhotoSrc(14), category: 'travel', rotation: 2.2 },
  { id: 13, src: getPhotoSrc(13), category: 'milestones', rotation: -1.3 },
  { id: 12, src: getPhotoSrc(12), category: 'cozy', rotation: 1.9 },
  { id: 11, src: getPhotoSrc(11), category: 'adventures', rotation: -1.7 },
  { id: 10, src: getPhotoSrc(10), category: 'dates', rotation: 1.4 },
  { id: 9, src: getPhotoSrc(9), category: 'travel', rotation: -2.0 },
  { id: 8, src: getPhotoSrc(8), category: 'cozy', rotation: 2.1 },
  { id: 7, src: getPhotoSrc(7), category: 'smiles', rotation: -1.5 },
  { id: 6, src: getPhotoSrc(6), category: 'dates', rotation: 1.6 },
  { id: 5, src: getPhotoSrc(5), category: 'adventures', rotation: -1.2 },
  { id: 4, src: getPhotoSrc(4), category: 'adventures', rotation: 2.0 },
  { id: 3, src: getPhotoSrc(3), category: 'smiles', rotation: -2.2 },
  { id: 2, src: getPhotoSrc(2), category: 'dates', rotation: 1.5 },
  { id: 1, src: getPhotoSrc(1), category: 'milestones', rotation: -1.8 },
];

export const CATEGORIES = [
  { id: 'all', label: 'All Moments' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'dates', label: 'Romantic Dates' },
  { id: 'adventures', label: 'Adventures' },
  { id: 'smiles', label: 'Laughter & Smiles' },
  { id: 'cozy', label: 'Cozy Moments' },
  { id: 'travel', label: 'Travel & Escapes' },
];

export const YEARS = ['all'];
