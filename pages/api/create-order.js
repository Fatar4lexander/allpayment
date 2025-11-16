// DEV: endpoint dummy — ganti dengan panggilan ke aggregator (Xendit/Midtrans) di production
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { amount, method } = req.body

  // Mock response shapes — mirror what real gateway returns (adjust later)
  const orderId = 'ORD-' + Date.now()
  let payload = {
    order_id: orderId,
    status: 'pending',
    payment_method: method
  }

  if (method === 'qris') {
    payload.qr_image = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(orderId)
  } else if (method === 'gopay' || method === 'dana') {
    payload.redirect_url = 'https://example.com/redirect/' + orderId
  } else if (method === 'bank_va') {
    payload.va_number = '700123' + String(Math.floor(Math.random() * 9000) + 1000)
  }

  // Save order to DB here (omitted in starter)
  res.status(200).json(payload)
}
