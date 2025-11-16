import { useState } from 'react'
import axios from 'axios'

const methods = [
  { id: 'qris', label: 'QRIS' },
  { id: 'gopay', label: 'GoPay' },
  { id: 'dana', label: 'DANA' },
  { id: 'bank_va', label: 'Transfer Bank (VA)' }
]

export default function Checkout({ amount = 0 }) {
  const [method, setMethod] = useState('qris')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const createOrder = async () => {
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await axios.post('/api/create-order', { amount, method })
      setResult(res.data)
    } catch (err) {
      setError(err?.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="checkout">
      <h3>Pilih Metode Pembayaran</h3>

      <div className="methods">
        {methods.map(m => (
          <button
            key={m.id}
            className={`method ${method === m.id ? 'active' : ''}`}
            onClick={() => setMethod(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="summary">
        <div>Jumlah:</div>
        <div className="amount">Rp {amount.toLocaleString('id-ID')}</div>
      </div>

      <button className="pay-btn" onClick={createOrder} disabled={loading}>
        {loading ? 'Membuat order...' : 'Bayar'}
      </button>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className="result">
          <h4>Status: {result.status}</h4>

          {result.qr_image && (
            <div className="qr-box">
              <img src={result.qr_image} alt="QRIS" />
              <p>Pindai QR untuk bayar</p>
            </div>
          )}

          {result.redirect_url && (
            <div className="redirect">
              <a href={result.redirect_url} target="_blank" rel="noreferrer" className="link">
                Buka aplikasi pembayaran
              </a>
            </div>
          )}

          {result.va_number && (
            <div className="va">
              <p>VA: <strong>{result.va_number}</strong></p>
              <small>Gunakan nomor VA di aplikasi perbankan</small>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
