function submitOrder(event) {
    event.preventDefault();
    
    // 取得表單資料
    const formData = new FormData(event.target);
    
    // 取得所有商品和數量
    const products = formData.getAll('product[]');
    const quantities = formData.getAll('quantity[]');
    
    // 組合訂購商品清單
    let orderItems = products.map((product, index) => {
        return `${product} x ${quantities[index]}`;
    }).join('\n');

    const orderData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email') || '無',
        delivery: formData.get('delivery'),
        message: formData.get('message')
    };

    // 使用 EmailJS 發送郵件
    emailjs.send('service_9or6e5q', 'template_h1ifm8t', {
        to_name: "雪Q兔創意甜點坊",
        from_name: orderData.name,
        reply_to: orderData.email === '無' ? 'noreply@example.com' : orderData.email,
        phone_number: orderData.phone,
        order_details: orderItems,
        delivery_method: orderData.delivery,
        message: orderData.message || "無",
        customer_email: orderData.email
    })
    .then(function(response) {
        alert('訂單已成功送出！我們會盡快與您聯繫。');
        document.getElementById('orderForm').reset();
    })
    .catch(function(error) {
        alert('訂單送出失敗，請稍後再試或直接聯繫我們。');
        console.error('Error:', error);
    });

    return false;
}
