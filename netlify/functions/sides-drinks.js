exports.handler = async function(event, context) {
  const sidesAndDrinks = [
    { id: 101, name: 'بطاطس مقلية', price: 25, category: 'sides', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop' },
    { id: 102, name: 'حلقات البصل', price: 30, category: 'sides', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop' },
    { id: 103, name: 'أصابع الموتزاريلا', price: 35, category: 'sides', image: 'https://images.unsplash.com/photo-1548340748-6d2b7d7da4c0?w=400&h=300&fit=crop' },
    { id: 104, name: 'كولا', price: 15, category: 'drinks', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop' },
    { id: 105, name: 'عصير برتقال', price: 20, category: 'drinks', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop' },
    { id: 106, name: 'مياه معدنية', price: 10, category: 'drinks', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop' }
  ]

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    },
    body: JSON.stringify({ success: true, items: sidesAndDrinks })
  }
}
