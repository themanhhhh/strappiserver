import { createCoreStrapi } from '@strapi/strapi';

const strapi = createCoreStrapi({ distDir: './dist' });

const slides = [
  {
    title: 'Thi công hệ thống F&B theo tư duy vận hành và mở rộng thương hiệu.',
    eyebrow: 'Restaurant Group Construction',
    description: 'Bố cục trang chủ được chuyển sang hướng corporate group site với nhấn mạnh thương hiệu, trách nhiệm xã hội, tuyển dụng và tin tức nổi bật.',
    imageLabel: 'Retail center rollout',
    order: 1,
    stats: [
      { value: '12+', label: 'Thương hiệu phục vụ' },
      { value: '2', label: 'Văn phòng điều hành' },
      { value: '100+', label: 'Dự án F&B đã triển khai' }
    ],
  },
  {
    title: 'Vận hành rollout cho chuỗi nhà hàng cần dữ liệu, kỷ luật và phối hợp kỹ thuật.',
    eyebrow: 'Brand Rollout',
    description: 'Slide thứ hai dùng để mô tả năng lực rollout chuỗi, tiến độ và khả năng lặp lại quy trình giữa các điểm bán.',
    imageLabel: 'Chain rollout system',
    order: 2,
    stats: [
      { value: '08', label: 'Mô hình rollout song song' },
      { value: '72h', label: 'Chu kỳ phản hồi site' },
      { value: 'MEP', label: 'Điều phối xưởng kỹ thuật' }
    ],
  },
  {
    title: 'Từ flagship đến renovation, giao diện mới cần thể hiện rõ năng lực thực thi doanh nghiệp.',
    eyebrow: 'Flagship Delivery',
    description: 'Slide thứ ba đưa người dùng vào nhóm case-study và flagship execution, tạo nháp để đi tiếp vào portfolio.',
    imageLabel: 'Flagship execution',
    order: 3,
    stats: [
      { value: '560', label: 'm2 flagship lớn nhất' },
      { value: '3', label: 'Loại công trình chủ lực' },
      { value: '24/7', label: 'Kênh tiếp nhận lead' }
    ],
  },
];

async function seed() {
  console.log('🔄 Starting Strapi instance...');
  await strapi.load();
  await strapi.server.mount();

  console.log('🧹 Clearing existing Hero Slides...');
  const existingSlides = await strapi.documents('api::hero-slide.hero-slide').findMany();
  for (const slide of existingSlides) {
    await strapi.documents('api::hero-slide.hero-slide').delete({ documentId: slide.documentId });
  }

  console.log('🌱 Creating new Hero Slides...');
  for (const slideData of slides) {
    const slide = await strapi.documents('api::hero-slide.hero-slide').create({
      data: slideData,
      status: 'published',
    });
    console.log(`✅ Created slide: ${slide.title}`);
  }

  console.log('🎉 Done seeding!');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
