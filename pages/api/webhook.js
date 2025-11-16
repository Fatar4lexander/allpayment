// DEV: contoh webhook handler skeleton — verify signature from gateway in production
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  // TODO: verify signature / secret header from payment provider
  const event = req.body

  // Example: update order status in DB
  // const orderId = event.order_id
  // const newStatus = event.status

  console.log('Webhook received:', JSON.stringify(event).slice(0, 500))
  // Acknowledge quickly
  res.status(200).json({ received: true })
}
