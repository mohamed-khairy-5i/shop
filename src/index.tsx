import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))

// Menu items data
const menuItems = [
  {
    id: 1,
    name: 'جوسي لوسي',
    nameEn: 'Juicy Lucy',
    description: 'خس + خيار مخلل + قطعة 180 جرام على الفحم + صوص تيست المميز + شيدر + بطاطس',
    priceDouble: 100,
    priceSingle: 70,
    sizes: ['Double', 'Single'],
    category: 'beef',
    image: 'https://cdn1.genspark.ai/user-upload-image/5_generated/436ec3e8-220f-4616-a416-73762c8550b1.jpeg',
    popular: true
  },
  {
    id: 2,
    name: 'هوت فاير',
    nameEn: 'Hot Fire',
    description: 'خس + خيار مخلل + برجر على الفحم + مايو + فلفل ألوان + أناناس + بطاطس',
    priceDouble: 110,
    priceSingle: 80,
    sizes: ['Double', 'Single'],
    category: 'beef',
    image: 'https://cdn1.genspark.ai/user-upload-image/5_generated/8b910823-cf8b-4027-b20c-e9d7d4663226.jpeg',
    popular: true
  },
  {
    id: 3,
    name: 'بيج تيست المميز',
    nameEn: 'Big Taste Special',
    description: 'خس + خيار مخلل + 2 استربس + 2 قطعة برجر على الفحم + صوص تيست المميز + جبنة سايحة + بطاطس',
    priceDouble: 130,
    priceSingle: null,
    sizes: ['Double'],
    category: 'beef',
    image: 'https://cdn1.genspark.ai/user-upload-image/5_generated/dea4bbea-18bf-44f4-96e3-98bae1ad722b.jpeg',
    popular: true
  },
  {
    id: 4,
    name: 'سنوبي',
    nameEn: 'Snoopy',
    description: 'خس + قطعة برجر 180 جرام على الفحم + سجق شرقي + بيف بيكون',
    priceDouble: 110,
    priceSingle: null,
    sizes: ['Double'],
    category: 'beef',
    image: 'https://cdn1.genspark.ai/user-upload-image/5_generated/4f075414-c6a2-4382-81ff-120b71b8adc1.jpeg',
    popular: false
  },
  {
    id: 5,
    name: 'أورجينال',
    nameEn: 'Original',
    description: 'خس + خيار مخلل + قطعة 180 جرام على الفحم + رانش + تستي جبنة موتزاريلا سايحة + بطاطس',
    priceDouble: 105,
    priceSingle: 75,
    sizes: ['Double', 'Single'],
    category: 'beef',
    image: 'https://cdn1.genspark.ai/user-upload-image/5_generated/cf50d73f-cf25-47aa-aa25-9d497cdf45d9.jpeg',
    popular: true
  }
]

// Sides and drinks
const sidesAndDrinks = [
  { id: 101, name: 'بطاطس مقلية', price: 25, category: 'sides', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop' },
  { id: 102, name: 'حلقات البصل', price: 30, category: 'sides', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop' },
  { id: 103, name: 'أصابع الموتزاريلا', price: 35, category: 'sides', image: 'https://images.unsplash.com/photo-1548340748-6d2b7d7da4c0?w=400&h=300&fit=crop' },
  { id: 104, name: 'كولا', price: 15, category: 'drinks', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop' },
  { id: 105, name: 'عصير برتقال', price: 20, category: 'drinks', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop' },
  { id: 106, name: 'مياه معدنية', price: 10, category: 'drinks', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop' }
]

// API Routes
app.get('/api/menu', (c) => {
  return c.json({ success: true, items: menuItems })
})

app.get('/api/sides-drinks', (c) => {
  return c.json({ success: true, items: sidesAndDrinks })
})

// Main page
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Burger Taste - برجر تست | أفضل برجر في مصر</title>
    <meta name="description" content="برجر تست - أشهى البرجر الطازج في مصر. اطلب الآن واستمتع بأفضل الأسعار!">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        * {
            font-family: 'Cairo', sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        }
        
        .hero-section {
            background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), 
                        url('https://images.unsplash.com/photo-1550547660-d9450f859349?w=1920&h=1080&fit=crop');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
        }
        
        .gradient-text {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .card-hover {
            transition: all 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(255, 215, 0, 0.3);
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.4);
        }
        
        .burger-icon {
            animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .cart-badge {
            background: #FF4444;
            color: white;
            border-radius: 50%;
            padding: 2px 8px;
            font-size: 12px;
            position: absolute;
            top: -8px;
            right: -8px;
        }
        
        .category-btn {
            transition: all 0.3s ease;
        }
        
        .category-btn.active {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            color: #000;
            font-weight: bold;
        }
        
        .sticky-header {
            position: sticky;
            top: 0;
            z-index: 50;
            backdrop-filter: blur(10px);
            background: rgba(26, 26, 26, 0.95);
        }
        
        .floating-cart {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 9999;
            align-items: center;
            justify-content: center;
        }
        
        .modal.active {
            display: flex;
        }
        
        .price-tag {
            background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-weight: bold;
        }
        
        .popular-badge {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            color: #000;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
        }
    </style>
</head>
<body class="text-white">
    <!-- Header -->
    <header class="sticky-header border-b border-gray-800">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4 space-x-reverse">
                    <img src="https://www.dropbox.com/scl/fi/x8x2jea9fq5xvw2uk4l1w/c0bd7e5d-1447-4b0d-a6d4-80a71b86d5a4_20251107_083427_.png?rlkey=alcz90s3hh7r2e3ooy0dvwvju&st=dnd41d42&dl=1" alt="Burger Taste Logo" class="h-16 w-16 object-contain">
                    <div>
                        <h1 class="text-2xl font-bold gradient-text">Burger Taste</h1>
                        <p class="text-sm text-gray-400">برجر تست - أشهى البرجر الطازج</p>
                    </div>
                </div>
                <nav class="hidden md:flex items-center space-x-6 space-x-reverse">
                    <a href="#home" class="hover:text-yellow-500 transition">الرئيسية</a>
                    <a href="#menu" class="hover:text-yellow-500 transition">المنيو</a>
                    <a href="#about" class="hover:text-yellow-500 transition">من نحن</a>
                    <a href="#contact" class="hover:text-yellow-500 transition">تواصل معنا</a>
                    <button onclick="toggleCart()" class="relative btn-primary text-black px-6 py-2 rounded-full font-bold">
                        <i class="fas fa-shopping-cart ml-2"></i>
                        السلة
                        <span id="cartCount" class="cart-badge" style="display: none;">0</span>
                    </button>
                </nav>
                <button onclick="toggleMobileMenu()" class="md:hidden text-2xl">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
            <!-- Mobile Menu -->
            <div id="mobileMenu" class="hidden md:hidden mt-4 space-y-2">
                <a href="#home" class="block py-2 hover:text-yellow-500 transition">الرئيسية</a>
                <a href="#menu" class="block py-2 hover:text-yellow-500 transition">المنيو</a>
                <a href="#about" class="block py-2 hover:text-yellow-500 transition">من نحن</a>
                <a href="#contact" class="block py-2 hover:text-yellow-500 transition">تواصل معنا</a>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section id="home" class="hero-section min-h-screen flex items-center justify-center text-center py-20">
        <div class="container mx-auto px-4">
            <img src="https://www.dropbox.com/scl/fi/x8x2jea9fq5xvw2uk4l1w/c0bd7e5d-1447-4b0d-a6d4-80a71b86d5a4_20251107_083427_.png?rlkey=alcz90s3hh7r2e3ooy0dvwvju&st=dnd41d42&dl=1" alt="Burger Taste Logo" class="h-32 w-32 mx-auto mb-6 object-contain">
            <h2 class="text-5xl md:text-7xl font-bold mb-6">
                مرحباً بك في <span class="gradient-text">برجر تست</span>
            </h2>
            <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
                أشهى البرجر الطازج المحضر بعناية فائقة 🍔
                <br>
                اطلب الآن واستمتع بتجربة لا تُنسى!
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="#menu" class="btn-primary text-black px-8 py-4 rounded-full text-lg font-bold inline-flex items-center">
                    <i class="fas fa-utensils ml-2"></i>
                    شاهد المنيو
                </a>
                <a href="tel:+994406656738" class="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-full text-lg font-bold inline-flex items-center transition">
                    <i class="fab fa-whatsapp ml-2"></i>
                    اطلب الآن
                </a>
            </div>
            <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div class="bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-2xl">
                    <i class="fas fa-fire text-4xl text-orange-500 mb-3"></i>
                    <h3 class="text-xl font-bold mb-2">طازج دائماً</h3>
                    <p class="text-gray-400">مكونات طازجة يومياً</p>
                </div>
                <div class="bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-2xl">
                    <i class="fas fa-truck-fast text-4xl text-yellow-500 mb-3"></i>
                    <h3 class="text-xl font-bold mb-2">توصيل سريع</h3>
                    <p class="text-gray-400">نصلك في أقل من 30 دقيقة</p>
                </div>
                <div class="bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-2xl">
                    <i class="fas fa-star text-4xl text-yellow-500 mb-3"></i>
                    <h3 class="text-xl font-bold mb-2">جودة عالية</h3>
                    <p class="text-gray-400">أفضل الخامات والطعم</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Menu Section -->
    <section id="menu" class="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <i class="fas fa-utensils text-5xl gradient-text mb-4"></i>
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    منيو <span class="gradient-text">برجر تست</span>
                </h2>
                <p class="text-xl text-gray-400">اختر وجبتك المفضلة واستمتع بأشهى الأطعم</p>
            </div>
            
            <!-- Category Filter -->
            <div class="flex flex-wrap justify-center gap-4 mb-12">
                <button onclick="filterMenu('all')" class="category-btn active px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700">
                    <i class="fas fa-th-large ml-2"></i>
                    جميع البرجر
                </button>
            </div>
            
            <!-- Menu Items -->
            <div id="menuGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                <!-- Items will be loaded here -->
            </div>
            
            <!-- Sides and Drinks -->
            <div class="mt-16">
                <h3 class="text-3xl font-bold text-center mb-8">
                    <i class="fas fa-plus-circle gradient-text ml-2"></i>
                    إضافات ومشروبات
                </h3>
                <div id="sidesGrid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <!-- Sides will be loaded here -->
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-black">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
                <i class="fas fa-heart text-5xl text-red-500 mb-6"></i>
                <h2 class="text-4xl md:text-5xl font-bold mb-6">
                    من نحن؟
                </h2>
                <p class="text-xl text-gray-300 leading-relaxed mb-8">
                    نحن <span class="gradient-text font-bold">برجر تست</span> - رواد صناعة البرجر الطازج في مصر.
                    نؤمن بأن الطعام الجيد يبدأ من المكونات الطازجة والعناية الفائقة في التحضير.
                    كل برجر نقدمه هو نتيجة شغف وحب لما نقوم به.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div class="bg-gray-900 p-6 rounded-2xl">
                        <i class="fas fa-clock text-4xl text-yellow-500 mb-4"></i>
                        <h3 class="text-xl font-bold mb-2">مواعيد العمل</h3>
                        <p class="text-gray-400">يومياً من 12 ظهراً - 2 صباحاً</p>
                    </div>
                    <div class="bg-gray-900 p-6 rounded-2xl">
                        <i class="fas fa-map-marker-alt text-4xl text-red-500 mb-4"></i>
                        <h3 class="text-xl font-bold mb-2">الموقع</h3>
                        <p class="text-gray-400">القاهرة، مصر</p>
                    </div>
                    <div class="bg-gray-900 p-6 rounded-2xl">
                        <i class="fas fa-phone text-4xl text-green-500 mb-4"></i>
                        <h3 class="text-xl font-bold mb-2">الهاتف</h3>
                        <p class="text-gray-400" dir="ltr">+994406656738</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div class="container mx-auto px-4">
            <div class="max-w-2xl mx-auto text-center">
                <i class="fas fa-comment-dots text-5xl gradient-text mb-6"></i>
                <h2 class="text-4xl md:text-5xl font-bold mb-6">
                    تواصل معنا
                </h2>
                <p class="text-xl text-gray-300 mb-8">
                    نحن هنا للإجابة على جميع استفساراتك واستقبال طلباتك
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="https://wa.me/994406656738" target="_blank" 
                       class="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-full text-lg font-bold inline-flex items-center justify-center transition">
                        <i class="fab fa-whatsapp text-2xl ml-2"></i>
                        واتساب
                    </a>
                    <a href="https://www.facebook.com/share/17W2sW23XM/" target="_blank"
                       class="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full text-lg font-bold inline-flex items-center justify-center transition">
                        <i class="fab fa-facebook text-2xl ml-2"></i>
                        فيسبوك
                    </a>
                    <a href="tel:+994406656738"
                       class="bg-yellow-600 hover:bg-yellow-700 px-8 py-4 rounded-full text-lg font-bold inline-flex items-center justify-center transition">
                        <i class="fas fa-phone text-2xl ml-2"></i>
                        اتصل بنا
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-black py-8 border-t border-gray-800">
        <div class="container mx-auto px-4 text-center">
            <div class="flex items-center justify-center space-x-4 space-x-reverse mb-4">
                <img src="https://www.dropbox.com/scl/fi/x8x2jea9fq5xvw2uk4l1w/c0bd7e5d-1447-4b0d-a6d4-80a71b86d5a4_20251107_083427_.png?rlkey=alcz90s3hh7r2e3ooy0dvwvju&st=dnd41d42&dl=1" alt="Burger Taste Logo" class="h-12 w-12 object-contain">
                <h3 class="text-2xl font-bold gradient-text">Burger Taste</h3>
            </div>
            <p class="text-gray-400 mb-4">برجر تست - أشهى البرجر الطازج في مصر</p>
            <div class="flex justify-center space-x-6 space-x-reverse mb-4">
                <a href="https://www.facebook.com/share/17W2sW23XM/" target="_blank" class="text-2xl hover:text-yellow-500 transition">
                    <i class="fab fa-facebook"></i>
                </a>
                <a href="https://wa.me/994406656738" target="_blank" class="text-2xl hover:text-yellow-500 transition">
                    <i class="fab fa-whatsapp"></i>
                </a>
                <a href="tel:+994406656738" class="text-2xl hover:text-yellow-500 transition">
                    <i class="fas fa-phone"></i>
                </a>
            </div>
            <p class="text-sm text-gray-500">© 2024 Burger Taste. جميع الحقوق محفوظة.</p>
        </div>
    </footer>

    <!-- Cart Modal -->
    <div id="cartModal" class="modal">
        <div class="bg-gray-900 rounded-3xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-3xl font-bold gradient-text">
                    <i class="fas fa-shopping-cart ml-2"></i>
                    سلة المشتريات
                </h3>
                <button onclick="toggleCart()" class="text-3xl hover:text-yellow-500">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div id="cartItems" class="space-y-4 mb-6">
                <!-- Cart items will be here -->
            </div>
            <div class="border-t border-gray-700 pt-6">
                <!-- Customer Information -->
                <div class="mb-6">
                    <h4 class="text-lg font-bold mb-4">
                        <i class="fas fa-user ml-2 text-yellow-500"></i>
                        بيانات العميل:
                    </h4>
                    <div class="space-y-3">
                        <div>
                            <label class="block text-sm font-bold mb-2">الاسم <span class="text-red-500">*</span></label>
                            <input type="text" id="customerName" placeholder="أدخل اسمك الكامل" 
                                   class="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:border-yellow-500 focus:outline-none" required>
                        </div>
                        <div>
                            <label class="block text-sm font-bold mb-2">رقم الهاتف <span class="text-red-500">*</span></label>
                            <input type="tel" id="customerPhone" placeholder="مثال: 01012345678" 
                                   class="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:border-yellow-500 focus:outline-none" required>
                        </div>
                        <div>
                            <label class="block text-sm font-bold mb-2">العنوان بالتفصيل <span class="text-red-500">*</span></label>
                            <textarea id="customerAddress" placeholder="المنطقة، الشارع، رقم المبنى، الدور، الشقة..." 
                                      class="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:border-yellow-500 focus:outline-none resize-none" 
                                      rows="3" required></textarea>
                        </div>
                    </div>
                </div>
                <!-- Payment Method Selection -->
                <div class="mb-6">
                    <label class="block text-lg font-bold mb-4">
                        <i class="fas fa-credit-card ml-2 text-yellow-500"></i>
                        اختر طريقة الدفع:
                    </label>
                    <div class="grid grid-cols-2 gap-3">
                        <label class="flex items-center gap-3 bg-gray-800 p-4 rounded-xl cursor-pointer hover:bg-gray-700 transition">
                            <input type="radio" name="paymentMethod" value="cash" class="w-5 h-5 text-yellow-500" checked>
                            <div>
                                <i class="fas fa-money-bill-wave text-green-500"></i>
                                <span class="mr-2 font-bold">كاش</span>
                                <p class="text-xs text-gray-400">الدفع عند الاستلام</p>
                            </div>
                        </label>
                        <label class="flex items-center gap-3 bg-gray-800 p-4 rounded-xl cursor-pointer hover:bg-gray-700 transition">
                            <input type="radio" name="paymentMethod" value="vodafone" class="w-5 h-5 text-yellow-500">
                            <div>
                                <i class="fas fa-mobile-alt text-red-500"></i>
                                <span class="mr-2 font-bold">فودافون كاش</span>
                            </div>
                        </label>
                        <label class="flex items-center gap-3 bg-gray-800 p-4 rounded-xl cursor-pointer hover:bg-gray-700 transition">
                            <input type="radio" name="paymentMethod" value="instapay" class="w-5 h-5 text-yellow-500">
                            <div>
                                <i class="fas fa-university text-blue-500"></i>
                                <span class="mr-2 font-bold">انستا باي</span>
                            </div>
                        </label>
                        <label class="flex items-center gap-3 bg-gray-800 p-4 rounded-xl cursor-pointer hover:bg-gray-700 transition">
                            <input type="radio" name="paymentMethod" value="wallet" class="w-5 h-5 text-yellow-500">
                            <div>
                                <i class="fas fa-wallet text-yellow-500"></i>
                                <span class="mr-2 font-bold">محفظة إلكترونية</span>
                            </div>
                        </label>
                    </div>
                </div>
                
                <!-- Additional Notes -->
                <div class="mb-6">
                    <label class="block text-lg font-bold mb-3">
                        <i class="fas fa-comment-dots ml-2 text-yellow-500"></i>
                        ملاحظات إضافية (اختياري):
                    </label>
                    <textarea 
                        id="orderNotes" 
                        placeholder="مثال: زيادة ملح، تقليل صوص، بدون بصل، إلخ..."
                        class="w-full bg-gray-800 text-white p-4 rounded-xl border border-gray-700 focus:border-yellow-500 focus:outline-none resize-none"
                        rows="3"
                    ></textarea>
                </div>
                
                <div class="flex justify-between items-center text-2xl font-bold mb-6">
                    <span>الإجمالي:</span>
                    <span class="gradient-text" id="cartTotal">0 جنيه</span>
                </div>
                <button onclick="checkout()" class="w-full btn-primary text-black py-4 rounded-full text-xl font-bold">
                    <i class="fas fa-check-circle ml-2"></i>
                    إتمام الطلب عبر واتساب
                </button>
            </div>
        </div>
    </div>

    <!-- Floating Cart Button (Mobile) -->
    <button onclick="toggleCart()" class="floating-cart md:hidden btn-primary text-black w-16 h-16 rounded-full shadow-2xl flex items-center justify-center">
        <i class="fas fa-shopping-cart text-2xl"></i>
        <span id="floatingCartCount" class="cart-badge" style="display: none;">0</span>
    </button>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="/static/app.js"></script>
</body>
</html>
  `)
})

export default app
