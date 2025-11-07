exports.handler = async function(event, context) {
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
      image: 'https://www.dropbox.com/scl/fi/on41weu1rihfan10m44hx/.png?rlkey=tmxfhv09ohvwgakq2nckzae7b&st=ceoeo7l3&dl=1',
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

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    },
    body: JSON.stringify({ success: true, items: menuItems })
  }
}
