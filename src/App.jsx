import React, { useState, useEffect } from 'react';
import './App.css';

const HOTELS_DATA = [
  { id: 1, name: "Grand Plaza Hotel & Spa", location: "Tashkent, Uzbekistan", price: 120, rating: 4.9, category: "Luxury", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", amenities: ["Free WiFi", "Swimming Pool", "Spa & Wellness", "Breakfast"] },
  { id: 2, name: "Silk Road Boutique Hotel", location: "Samarkand, Uzbekistan", price: 75, rating: 4.7, category: "Budget", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", amenities: ["Free WiFi", "Air Conditioning", "City View"] },
  { id: 3, name: "Registan View Luxury Resort", location: "Samarkand, Uzbekistan", price: 210, rating: 5.0, category: "Resort", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80", amenities: ["Free WiFi", "Pool", "Bar & Lounge", "Parking"] },
  { id: 4, name: "Bukhara Oasis Family Villa", location: "Bukhara, Uzbekistan", price: 150, rating: 4.8, category: "Villa", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80", amenities: ["Private Pool", "Kitchen", "Free WiFi", "Garden"] }
];

const FOODS_DATA = [
  { id: 101, name: "Toy Palov (Tashkent Plov)", price: 12, rating: 5.0, image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80", description: "An'anaviy O'zbek palovi — qo'y go'shti, sariq sabzi va noxat bilan.", recipe: "Go'sht va piyoz qovuriladi, so'ng sariq sabzi va zira solinadi. Suv quyib 40 daqiqa qaynatilgach, guruch solinadi va bug'lab damlanadi." },
  { id: 102, name: "Tandir Somsa", price: 4, rating: 4.9, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", description: "Qatlama xamirdan tayyorlangan, tandirda yopilgan sirli go'shtli somsa.", recipe: "Qatlama xamir yoyiladi, ichiga qiymat solinib issiq tandirda 25 daqiqa pishiriladi." }
];

const SERVICES_DATA = [
  { id: 201, icon: "🛎️", title: "24/7 Room Service", desc: "Istalgan vaqtda xonangizga taom va ichimliklar yetkazish xizmati." },
  { id: 202, icon: "🧘‍♀️", title: "Spa & Massage", desc: "Professional massajchilar va sauna bilan to'liq relax qilish imkoniyati." },
  { id: 203, icon: "🚘", title: "VIP Airport Transfer", desc: "Aeroportdan mehmonxonagacha xavfsiz va qulay VIP transport." }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("hotels");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [authMode, setAuthMode] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', checkIn: '', checkOut: '' });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleBookSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  // Yuklab olish funksiyasi (PDF/TXT bron kvitansiyasi)
  const handleDownloadTicket = () => {
    const textContent = `==== STAYEASE BOOKING TICKET ====\nHotel: ${selectedHotel.name}\nCustomer: ${formData.name}\nEmail: ${formData.email}\nCheck-In: ${formData.checkIn}\nCheck-Out: ${formData.checkOut}\nTotal Paid: $${selectedHotel.price}\n=================================`;
    const element = document.createElement("a");
    const file = new Blob([textContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Booking_${selectedHotel.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (isLoading) {
    return (
      <div className="loader-screen">
        <div className="spinner-glow"></div>
        <h2 className="loading-text">StayEase tayyorlanmoqda...</h2>
      </div>
    );
  }

  return (
    <div className={`app-container ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
      {/* Header / Navbar */}
      <header className="main-navbar">
        <div className="brand-logo">🏨 StayEase</div>
        <nav className="navigation-menu">
          <button className={`nav-link-btn ${activeTab === 'hotels' ? 'active-link' : ''}`} onClick={() => setActiveTab('hotels')}>Hotels</button>
          <button className={`nav-link-btn ${activeTab === 'foods' ? 'active-link' : ''}`} onClick={() => setActiveTab('foods')}>Ovqatlar & Retsept</button>
          <button className={`nav-link-btn ${activeTab === 'services' ? 'active-link' : ''}`} onClick={() => setActiveTab('services')}>Services</button>
        </nav>
        <div className="header-actions">
          <button className="mode-toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button className="login-action-btn" onClick={() => setAuthMode('signin')}>Sign In</button>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-box">
          <h1 className="hero-heading">Find Your Dream Stay & Explore Uzbekistan</h1>
          <p className="hero-subtext">Experience luxurious hotels, scenic mountain resorts, and traditional dining.</p>
        </div>
      </section>

      {/* Content Area */}
      <main className="content-container">
        {activeTab === 'hotels' && (
          <div className="tab-pane animate-fade-in">
            <h2 className="page-heading">Featured Hotels</h2>
            <div className="cards-grid">
              {HOTELS_DATA.map(hotel => (
                <div key={hotel.id} className="custom-card">
                  <div className="image-frame">
                    <img src={hotel.image} alt={hotel.name} />
                    <span className="badge-rating">⭐ {hotel.rating}</span>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{hotel.name}</h3>
                    <p className="card-subtitle">📍 {hotel.location}</p>
                    <div className="card-action-bar">
                      <span className="price-tag"><strong>${hotel.price}</strong> / night</span>
                      <button className="primary-btn" onClick={() => { setSelectedHotel(hotel); setBookingSuccess(false); }}>Book Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'foods' && (
          <div className="tab-pane animate-fade-in">
            <h2 className="page-heading">Restoran Menusi & Retseptlar</h2>
            <div className="cards-grid">
              {FOODS_DATA.map(food => (
                <div key={food.id} className="custom-card">
                  <div className="image-frame">
                    <img src={food.image} alt={food.name} />
                    <span className="badge-rating">⭐ {food.rating}</span>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{food.name}</h3>
                    <p className="card-subtitle">{food.description}</p>
                    <div className="card-action-bar">
                      <span className="price-tag"><strong>${food.price}</strong></span>
                      <button className="secondary-btn" onClick={() => setSelectedRecipe(food)}>📖 Retseptni ko'rish</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="tab-pane animate-fade-in">
            <h2 className="page-heading">Hotel Services</h2>
            <div className="services-list">
              {SERVICES_DATA.map(srv => (
                <div key={srv.id} className="service-box">
                  <div className="service-icon-box">{srv.icon}</div>
                  <h3 className="service-box-title">{srv.title}</h3>
                  <p className="service-box-desc">{srv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Retsept Modali */}
      {selectedRecipe && (
        <div className="modal-backdrop">
          <div className="floating-dialog animate-scale-up">
            <button className="close-dialog-btn" onClick={() => setSelectedRecipe(null)}>✕</button>
            <h2 className="dialog-title">👨‍🍳 {selectedRecipe.name} Retsepti</h2>
            <div className="recipe-content-box">
              <p>{selectedRecipe.recipe}</p>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal & Download Option */}
      {selectedHotel && (
        <div className="modal-backdrop">
          <div className="floating-dialog animate-scale-up">
            <button className="close-dialog-btn" onClick={() => setSelectedHotel(null)}>✕</button>
            {bookingSuccess ? (
              <div className="success-dialog-body">
                <div className="animated-check-icon">🎉</div>
                <h2>Xona Muvaffaqiyatli Band Qilindi!</h2>
                <p>Bron haqidagi ma'lumotlarni fayl shaklida yuklab oling:</p>
                <button className="download-btn" onClick={handleDownloadTicket}>
                  📥 Bron Kvitansiyasini Yuklab Olish (.txt)
                </button>
              </div>
            ) : (
              <>
                <h2 className="dialog-title">Xonani Band Qilish</h2>
                <p className="dialog-subtitle">{selectedHotel.name} - ${selectedHotel.price}/night</p>
                <form className="modal-form" onSubmit={handleBookSubmit}>
                  <div className="form-field">
                    <label>F.I.SH</label>
                    <input type="text" required placeholder="Ismingizni kiriting" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="form-field">
                    <label>Email</label>
                    <input type="email" required placeholder="Emailingizni kiriting" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="form-field-row">
                    <div className="form-field">
                      <label>Check-In</label>
                      <input type="date" required value={formData.checkIn} onChange={e => setFormData({...formData, checkIn: e.target.value})} />
                    </div>
                    <div className="form-field">
                      <label>Check-Out</label>
                      <input type="date" required value={formData.checkOut} onChange={e => setFormData({...formData, checkOut: e.target.value})} />
                    </div>
                  </div>
                  <button type="submit" className="form-submit-btn">Tasdiqlash & To'lash</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* SIGN IN / SIGN UP MODAL */}
      {authMode && (
        <div className="modal-backdrop">
          <div className="floating-dialog animate-scale-up">
            <button className="close-dialog-btn" onClick={() => setAuthMode(null)}>✕</button>
            <h2 className="dialog-title">{authMode === 'signin' ? 'Sign In to StayEase' : 'Create Account'}</h2>
            <p className="dialog-subtitle">Access your bookings and exclusive deals.</p>
            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); alert('Tizimga muvaffaqiyatli kirdingiz!'); setAuthMode(null); }}>
              {authMode === 'signup' && (
                <div className="form-field">
                  <label>Full Name</label>
                  <input type="text" required placeholder="John Doe" />
                </div>
              )}
              <div className="form-field">
                <label>Email Address</label>
                <input type="email" required placeholder="user@example.com" />
              </div>
              <div className="form-field">
                <label>Password</label>
                <input type="password" required placeholder="••••••••" />
              </div>
              <button type="submit" className="form-submit-btn">
                {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
              <div className="auth-toggle-link">
                {authMode === 'signin' ? (
                  <p>Don't have an account? <span onClick={() => setAuthMode('signup')}>Sign Up</span></p>
                ) : (
                  <p>Already have an account? <span onClick={() => setAuthMode('signin')}>Sign In</span></p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}