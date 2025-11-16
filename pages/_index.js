import { useState } from 'react'
import Checkout from '../components/Checkout'

export default function Home() {
  return (
    <main className="page">
      <header className="header">
        <h1 className="brand">AllPayment — Checkout</h1>
        <p className="subtitle">QRIS, GoPay, DANA, Bank — semua di satu tempat</p>
      </header>

      <section className="content">
        <div className="product-card">
          <h2>Produk Demo</h2>
          <p className="price">Rp 50.000</p>
          <p className="desc">Contoh produk untuk testing integrasi payment.</p>
        </div>

        <Checkout amount={50000} />
      </section>

      <footer className="footer">
        <small>Built with love — Starter untuk integrasi aggregator</small>
      </footer>
    </main>
  )
}
