-- 1. Create Categories for 'en' and 'vi'
INSERT INTO categories (name, slug, description, lang) VALUES 
('News', 'news', 'Breaking AI intelligence and daily updates.', 'en'),
('Analysis', 'analysis', 'Deep dives into AI trends and industry shifts.', 'en'),
('Guides', 'guides', 'Practical AI mapping and tool walkthroughs.', 'en'),
('Tin tức', 'news', 'Cập nhật tin tức AI hàng ngày.', 'vi'),
('Phân tích', 'analysis', 'Phân tích chuyên sâu về xu hướng AI.', 'vi'),
('Hướng dẫn', 'guides', 'Hướng dẫn sử dụng công cụ AI thực tế.', 'vi');

-- 2. Create Sample Posts for 'en'
-- Note: Replace UUIDs with actual IDs if needed, or use subqueries.
INSERT INTO posts (title, slug, content, excerpt, featured_image, category_id, author_name, lang, is_published) 
SELECT 
  'The Rise of NVIDIA: Mapping the Future of Compute', 
  'nvidia-future-compute', 
  '<p>NVIDIA is dominating the AI landscape...</p>', 
  'How NVIDIA became the backbone of the generative AI revolution.', 
  'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa', 
  id, 
  'Jessica', 
  'en', 
  true 
FROM categories WHERE slug = 'analysis' AND lang = 'en' LIMIT 1;

INSERT INTO posts (title, slug, content, excerpt, featured_image, category_id, author_name, lang, is_published) 
SELECT 
  'Apple Intelligence: A New Era for Siri', 
  'apple-intelligence-siri', 
  '<p>Apple is integrating AI deeply into iOS...</p>', 
  'A look at how Apple is bringing private, on-device intelligence to everyone.', 
  'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7', 
  id, 
  'Jessica', 
  'en', 
  true 
FROM categories WHERE slug = 'news' AND lang = 'en' LIMIT 1;

-- 3. Create Sample Posts for 'vi'
INSERT INTO posts (title, slug, content, excerpt, featured_image, category_id, author_name, lang, is_published) 
SELECT 
  'Tương lai của NVIDIA: Bản đồ hóa kỷ nguyên tính toán', 
  'nvidia-tuong-lai-tinh-toan', 
  '<p>NVIDIA đang thống trị bối cảnh AI...</p>', 
  'Cách NVIDIA trở thành xương sống của cuộc cách mạng AI tạo hình.', 
  'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa', 
  id, 
  'Jessica', 
  'vi', 
  true 
FROM categories WHERE slug = 'analysis' AND lang = 'vi' LIMIT 1;
