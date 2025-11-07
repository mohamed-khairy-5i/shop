// Shopping cart
let cart = []
let menuItems = []
let sidesAndDrinks = []

// Load menu items
async function loadMenu() {
    try {
        const response = await axios.get('/api/menu')
        menuItems = response.data.items
        displayMenu('all')
    } catch (error) {
        console.error('Error loading menu:', error)
    }
}

// Load sides and drinks
async function loadSidesDrinks() {
    try {
        const response = await axios.get('/api/sides-drinks')
        sidesAndDrinks = response.data.items
        displaySidesDrinks()
    } catch (error) {
        console.error('Error loading sides:', error)
    }
}

// Display menu items
function displayMenu(category = 'all') {
    const grid = document.getElementById('menuGrid')
    const filtered = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category)
    
    grid.innerHTML = filtered.map(item => {
        // Determine price display
        let priceDisplay = ''
        if (item.priceSingle && item.priceDouble) {
            priceDisplay = `
                <div class="flex flex-col gap-2">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-400">Double:</span>
                        <span class="price-tag text-sm">${item.priceDouble} ج.م</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-400">Single:</span>
                        <span class="price-tag text-sm">${item.priceSingle} ج.م</span>
                    </div>
                </div>
            `
        } else if (item.priceDouble) {
            priceDisplay = `<span class="price-tag text-lg">${item.priceDouble} ج.م</span>`
        }
        
        return `
            <div class="bg-gray-900 rounded-2xl overflow-hidden card-hover" data-category="${item.category}">
                <div class="relative">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover">
                    ${item.popular ? `
                        <span class="absolute top-3 right-3 popular-badge">
                            <i class="fas fa-fire ml-1"></i>
                            الأكثر طلباً
                        </span>
                    ` : ''}
                </div>
                <div class="p-5">
                    <h3 class="text-xl font-bold mb-2">${item.name}</h3>
                    <p class="text-sm text-gray-400 mb-1">${item.nameEn}</p>
                    <p class="text-gray-400 text-sm mb-4">${item.description}</p>
                    <div class="mb-4">
                        ${priceDisplay}
                    </div>
                    ${item.sizes.length > 1 ? `
                        <div class="flex gap-2">
                            <button onclick="addToCart(${item.id}, 'menu', 'Double')" 
                                    class="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-2 rounded-full font-bold transition text-sm">
                                <i class="fas fa-plus ml-1"></i>
                                Double
                            </button>
                            <button onclick="addToCart(${item.id}, 'menu', 'Single')" 
                                    class="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-2 rounded-full font-bold transition text-sm">
                                <i class="fas fa-plus ml-1"></i>
                                Single
                            </button>
                        </div>
                    ` : `
                        <button onclick="addToCart(${item.id}, 'menu', 'Double')" 
                                class="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full font-bold transition">
                            <i class="fas fa-plus ml-1"></i>
                            إضافة
                        </button>
                    `}
                </div>
            </div>
        `
    }).join('')
}

// Display sides and drinks
function displaySidesDrinks() {
    const grid = document.getElementById('sidesGrid')
    grid.innerHTML = sidesAndDrinks.map(item => `
        <div class="bg-gray-900 rounded-2xl overflow-hidden card-hover">
            <img src="${item.image}" alt="${item.name}" class="w-full h-32 object-cover">
            <div class="p-3">
                <h4 class="font-bold mb-2 text-sm">${item.name}</h4>
                <div class="flex items-center justify-between">
                    <span class="text-yellow-500 font-bold text-sm">${item.price} ج.م</span>
                    <button onclick="addToCart(${item.id}, 'sides', 'Single')" 
                            class="bg-yellow-500 hover:bg-yellow-600 text-black p-2 rounded-full transition">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('')
}

// Filter menu by category
function filterMenu(category) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active')
    })
    event.target.closest('.category-btn').classList.add('active')
    
    // Display filtered items
    displayMenu(category)
}

// Add item to cart
function addToCart(itemId, type, size = 'Double') {
    const items = type === 'menu' ? menuItems : sidesAndDrinks
    const item = items.find(i => i.id === itemId)
    
    if (!item) return
    
    // For menu items with sizes, set the price based on size
    let price = item.price || (size === 'Single' ? item.priceSingle : item.priceDouble)
    
    // Create unique identifier including size
    const existingItem = cart.find(i => i.id === itemId && i.type === type && i.size === size)
    
    if (existingItem) {
        existingItem.quantity++
    } else {
        cart.push({
            ...item,
            type,
            size,
            price,
            displayName: type === 'menu' && item.sizes.length > 1 ? `${item.name} (${size})` : item.name,
            quantity: 1
        })
    }
    
    updateCart()
    showNotification('تمت الإضافة إلى السلة!', 'success')
}

// Remove from cart
function removeFromCart(itemId, type, size) {
    const index = cart.findIndex(i => i.id === itemId && i.type === type && i.size === size)
    if (index > -1) {
        cart.splice(index, 1)
        updateCart()
        showNotification('تم الحذف من السلة', 'info')
    }
}

// Update cart quantity
function updateQuantity(itemId, type, size, change) {
    const item = cart.find(i => i.id === itemId && i.type === type && i.size === size)
    if (item) {
        item.quantity += change
        if (item.quantity <= 0) {
            removeFromCart(itemId, type, size)
        } else {
            updateCart()
        }
    }
}

// Update cart display
function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems')
    const cartCount = document.getElementById('cartCount')
    const floatingCartCount = document.getElementById('floatingCartCount')
    const cartTotal = document.getElementById('cartTotal')
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    // Update count badges
    if (totalItems > 0) {
        cartCount.textContent = totalItems
        cartCount.style.display = 'block'
        floatingCartCount.textContent = totalItems
        floatingCartCount.style.display = 'block'
    } else {
        cartCount.style.display = 'none'
        floatingCartCount.style.display = 'none'
    }
    
    // Update total
    cartTotal.textContent = total + ' ج.م'
    
    // Update cart items
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <div class="text-center py-12 text-gray-400">
                <i class="fas fa-shopping-cart text-6xl mb-4 opacity-50"></i>
                <p class="text-xl">السلة فارغة</p>
                <p class="text-sm mt-2">ابدأ بإضافة منتجات للطلب</p>
            </div>
        `
    } else {
        cartItemsDiv.innerHTML = cart.map(item => `
            <div class="bg-gray-800 rounded-xl p-4 flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover">
                    <div>
                        <h4 class="font-bold">${item.displayName || item.name}</h4>
                        <p class="text-yellow-500 font-bold">${item.price} ج.م</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <button onclick="updateQuantity(${item.id}, '${item.type}', '${item.size}', -1)" 
                            class="bg-gray-700 hover:bg-gray-600 w-8 h-8 rounded-full">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="text-xl font-bold w-8 text-center">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, '${item.type}', '${item.size}', 1)" 
                            class="bg-gray-700 hover:bg-gray-600 w-8 h-8 rounded-full">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button onclick="removeFromCart(${item.id}, '${item.type}', '${item.size}')"
                            class="bg-red-600 hover:bg-red-700 w-8 h-8 rounded-full mr-2">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('')
    }
}

// Toggle cart modal
function toggleCart() {
    const modal = document.getElementById('cartModal')
    modal.classList.toggle('active')
}

// Toggle mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu')
    menu.classList.toggle('hidden')
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('السلة فارغة! أضف منتجات أولاً', 'error')
        return
    }
    
    // Get customer information
    const customerName = document.getElementById('customerName').value.trim()
    const customerPhone = document.getElementById('customerPhone').value.trim()
    const customerAddress = document.getElementById('customerAddress').value.trim()
    
    // Validate customer information
    if (!customerName) {
        showNotification('الرجاء إدخال الاسم', 'error')
        document.getElementById('customerName').focus()
        return
    }
    
    if (!customerPhone) {
        showNotification('الرجاء إدخال رقم الهاتف', 'error')
        document.getElementById('customerPhone').focus()
        return
    }
    
    if (!customerAddress) {
        showNotification('الرجاء إدخال العنوان بالتفصيل', 'error')
        document.getElementById('customerAddress').focus()
        return
    }
    
    // Get payment method
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')
    if (!paymentMethod) {
        showNotification('الرجاء اختيار طريقة الدفع', 'error')
        return
    }
    
    const paymentMethods = {
        'cash': '💵 الدفع عند الاستلام (كاش)',
        'vodafone': '📱 فودافون كاش',
        'instapay': '🏦 انستا باي',
        'wallet': '👛 محفظة إلكترونية'
    }
    
    // Get order notes
    const orderNotes = document.getElementById('orderNotes').value.trim()
    
    // Create order message
    let message = '🍔 *طلب جديد من موقع برجر تست*\n\n'
    
    // Add customer information
    message += '👤 *بيانات العميل:*\n'
    message += `الاسم: ${customerName}\n`
    message += `رقم الهاتف: ${customerPhone}\n`
    message += `العنوان: ${customerAddress}\n\n`
    
    message += '━━━━━━━━━━━━━━━━━━━━\n\n'
    message += '📋 *تفاصيل الطلب:*\n'
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.displayName || item.name}\n`
        message += `   الكمية: ${item.quantity}\n`
        message += `   السعر: ${item.price} ج.م\n`
        message += `   الإجمالي: ${item.price * item.quantity} ج.م\n\n`
    })
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    message += `💰 *الإجمالي الكلي: ${total} ج.م*\n\n`
    
    // Add payment method
    message += `💳 *طريقة الدفع المختارة:*\n${paymentMethods[paymentMethod.value]}\n\n`
    
    // Add order notes if available
    if (orderNotes) {
        message += `📝 *ملاحظات إضافية:*\n${orderNotes}\n\n`
    }
    
    message += '✨ شكراً لاختيارك برجر تست!\n'
    message += 'سنتواصل معك قريباً للتأكيد والتوصيل 📞'
    
    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/994406656738?text=${encodedMessage}`
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank')
    
    // Clear cart after sending
    setTimeout(() => {
        cart = []
        updateCart()
        toggleCart()
        // Reset form
        document.getElementById('customerName').value = ''
        document.getElementById('customerPhone').value = ''
        document.getElementById('customerAddress').value = ''
        document.querySelector('input[name="paymentMethod"][value="cash"]').checked = true
        document.getElementById('orderNotes').value = ''
        showNotification('تم إرسال الطلب! سنتواصل معك قريباً', 'success')
    }, 1000)
}

// Show notification
function showNotification(message, type = 'info') {
    const colors = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        info: 'bg-blue-600'
    }
    
    const notification = document.createElement('div')
    notification.className = `fixed top-20 left-1/2 transform -translate-x-1/2 ${colors[type]} text-white px-6 py-3 rounded-full shadow-2xl z-50 transition-all duration-300`
    notification.style.opacity = '0'
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} ml-2"></i>
        ${message}
    `
    
    document.body.appendChild(notification)
    
    setTimeout(() => {
        notification.style.opacity = '1'
    }, 100)
    
    setTimeout(() => {
        notification.style.opacity = '0'
        setTimeout(() => {
            document.body.removeChild(notification)
        }, 300)
    }, 3000)
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu')
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden')
            }
        }
    })
})

// Close modal when clicking outside
document.getElementById('cartModal').addEventListener('click', function(e) {
    if (e.target === this) {
        toggleCart()
    }
})

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadMenu()
    loadSidesDrinks()
    updateCart()
})
