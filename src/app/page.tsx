"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface SaleItem {
  name: string;
  price: number;
  time: string;
  initials: string;
  color: string;
}

interface StockItem {
  name: string;
  qty: number;
  limit: number;
}

interface ExpenseItem {
  name: string;
  amount: number;
}

interface ChatMessage {
  text: string;
  isSent: boolean;
  time: string;
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Global Intersection Observer for animations ---
  useEffect(() => {
    // Navbar blur effect on scroll
    const navbar = document.querySelector(".navbar");
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    const revealElements = document.querySelectorAll(
      ".reveal, .reveal-delay, .reveal-delay-2"
    );

    const revealOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, revealOptions);

    revealElements.forEach((el) => {
      revealOnScroll.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealOnScroll.disconnect();
    };
  }, []);

  // --- Emulator Tab Control ---
  const [activeTab, setActiveTab] = useState<"sales" | "stock" | "expenses">("sales");

  // --- Sales Emulator State ---
  const [salesList, setSalesList] = useState<SaleItem[]>([
    { name: "MacBook Pro", price: 95000, time: "10:15 AM", initials: "MP", color: "#6366f1" },
    { name: "AirPods Gen 3", price: 29500, time: "11:42 AM", initials: "AP", color: "#d946ef" },
  ]);
  const [salesChartPath, setSalesChartPath] = useState("M10,35 Q30,25 50,30 T90,15 T110,5");
  const [hasAddedSale, setHasAddedSale] = useState(false);

  const totalSales = salesList.reduce((acc, curr) => acc + curr.price, 0);

  const handleAddSaleEmulator = () => {
    if (hasAddedSale) return; // limit to one demonstration add
    const newItem: SaleItem = {
      name: "iPhone 15 Pro",
      price: 120000,
      time: "Just Now",
      initials: "IP",
      color: "#ff7849",
    };
    setSalesList([newItem, ...salesList]);
    setSalesChartPath("M10,35 Q30,28 50,15 T90,8 T110,2");
    setHasAddedSale(true);
  };

  // --- Stock Emulator State ---
  const [stockList, setStockList] = useState<StockItem[]>([
    { name: "MacBook Pro", qty: 2, limit: 3 },
    { name: "AirPods Gen 3", qty: 15, limit: 3 },
    { name: "iPhone 15 Pro", qty: 8, limit: 3 },
  ]);

  const handleSellStock = (index: number) => {
    setStockList(prev => prev.map((item, idx) => {
      if (idx === index && item.qty > 0) {
        return { ...item, qty: item.qty - 1 };
      }
      return item;
    }));
  };

  // --- Expenses Emulator State ---
  const [expenseList, setExpenseList] = useState<ExpenseItem[]>([
    { name: "Shop Rent", amount: 40000 },
    { name: "Fuel & Power", amount: 15000 },
    { name: "Lunch & Refreshment", amount: 8000 },
  ]);
  const [hasAddedExpense, setHasAddedExpense] = useState(false);
  const budgetLimit = 100000;
  const totalExpenses = expenseList.reduce((acc, curr) => acc + curr.amount, 0);
  const expensePercentage = Math.min((totalExpenses / budgetLimit) * 100, 100);

  const handleAddExpenseEmulator = () => {
    if (hasAddedExpense) return;
    const newItem: ExpenseItem = {
      name: "Internet Data",
      amount: 12000,
    };
    setExpenseList([...expenseList, newItem]);
    setHasAddedExpense(true);
  };

  // --- Bento Widget: Keypad widget ---
  const [keypadVal, setKeypadVal] = useState("₦0");
  const [showKeypadToast, setShowKeypadToast] = useState(false);

  const handleKeypadPress = (val: string) => {
    if (val === "C") {
      setKeypadVal("₦0");
      return;
    }
    if (val === "Record") {
      if (keypadVal !== "₦0") {
        setShowKeypadToast(true);
        setTimeout(() => setShowKeypadToast(false), 1200);
        setKeypadVal("₦0");
      }
      return;
    }
    
    // Append number
    const numericStr = keypadVal.replace(/[^\d]/g, "");
    if (numericStr === "0") {
      setKeypadVal(`₦${val}`);
    } else {
      const newVal = parseInt(numericStr + val, 10).toLocaleString();
      setKeypadVal(`₦${newVal}`);
    }
  };

  // --- Bento Widget: Stock alert slider ---
  const [sliderStock, setSliderStock] = useState(5);

  // --- Bento Widget: WhatsApp reminder ---
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { text: "Hello Kofi, this is a record of your purchases at Amadi's Store. Remaining balance: ₦50,000.", isSent: false, time: "11:20 AM" }
  ]);
  const [hasSentReminder, setHasSentReminder] = useState(false);

  const handleSendReminder = () => {
    if (hasSentReminder) return;
    const newMsg: ChatMessage = {
      text: "Hi Kofi, this is a friendly reminder to settle your balance of ₦50,000 at your earliest convenience. Thanks! 🙏",
      isSent: true,
      time: "Just Now",
    };
    setChatMessages([...chatMessages, newMsg]);
    setHasSentReminder(true);
  };

  // --- Bento Widget: Offline syncing toggle ---
  const [isOnline, setIsOnline] = useState(true);

  // --- Leakage Calculator State ---
  const [dailySales, setDailySales] = useState(80000);
  const [leakagePercent, setLeakagePercent] = useState(8);

  const annualRevenue = dailySales * 300; // 300 working days
  const projectedLeakage = annualRevenue * (leakagePercent / 100);
  const savedLeakage = Math.round(projectedLeakage * 0.85);

  // --- FAQ Accordions State ---
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <main>
      {/* Background Grid Canvas */}
      <div className="bg-canvas">
        <div className="bg-glow-1"></div>
        <div className="bg-glow-2"></div>
        <div className="bg-overlay"></div>
      </div>

      {/* Floating Glass Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo-group" onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <div className="logo-wrapper">
              <Image src="/logo.png" alt="Record Am Logo" className="logo" width={32} height={32} />
            </div>
            <span className="brand-name">Record Am</span>
          </div>
          
          <div className="nav-menu">
            <a href="#features" className="nav-link">Features</a>
            <a href="#calculator" className="nav-link">P&L Estimator</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </div>

          <div className="nav-actions">
            <a href="#download" className="btn btn-nav">
              Download APK
            </a>
            
            <button 
              className={`mobile-hamburger ${mobileMenuOpen ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-nav-links">
            <a href="#features" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#calculator" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>P&L Estimator</a>
            <a href="#faq" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="#download" className="btn btn-primary mobile-download-btn" onClick={() => setMobileMenuOpen(false)}>
              Download APK (109.5 MB)
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-badge">Offline bookkeeping made simple</div>
          <h1 className="hero-title">
            Sales, stocks, <br />
            expenses? <br />
            <span className="text-gradient">Record Am.</span>
          </h1>
          <p className="hero-subtitle">
            Log sales, track inventory levels, monitor business expenses, and manage debt. 
            Works completely offline, saving data securely on your device, with cloud backups.
          </p>

          <div className="hero-actions">
            <a href="#download" className="btn btn-primary">Get Started Now</a>
            <a href="#features" className="btn btn-secondary">Explore Features</a>
          </div>
        </div>

        {/* Interactive Phone Emulator */}
        <div className="hero-visual">
          <div className="phone-frame float-slow">
            <div className="phone-notch">
              <div className="phone-speaker"></div>
            </div>
            <div className="phone-screen">
              {/* Status Bar */}
              <div className="phone-status-bar">
                <span>13:24</span>
                <div className="phone-status-icons">
                  <span>LTE</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Header */}
              <div className="phone-app-header">
                <div className="phone-app-logo">
                  <Image src="/logo.png" alt="Icon" width={20} height={20} />
                  <span>Record Am</span>
                </div>
                <div className="phone-app-sync">
                  <span>●</span> Sync active
                </div>
              </div>

              {/* App Main Body */}
              <div className="phone-app-body">
                {activeTab === "sales" && (
                  <>
                    <div className="phone-sales-total">
                      <span className="phone-sales-lbl">Today&apos;s Revenue</span>
                      <span className="phone-sales-val">₦{totalSales.toLocaleString()}</span>
                      
                      {/* Interactive Sparkline Chart */}
                      <div className="phone-chart-container">
                        <svg viewBox="0 0 120 40" className="phone-sparkline">
                          <path
                            d={salesChartPath}
                            className="phone-spark-path"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="phone-action-bar">
                      <span className="phone-section-title">Transactions</span>
                      <button 
                        onClick={handleAddSaleEmulator} 
                        className="phone-action-btn"
                        disabled={hasAddedSale}
                        style={{ opacity: hasAddedSale ? 0.6 : 1 }}
                      >
                        {hasAddedSale ? "Logged" : "+ Add Sale"}
                      </button>
                    </div>

                    <div className="phone-list">
                      {salesList.map((sale, i) => (
                        <div className="phone-list-item" key={i}>
                          <div 
                            className="phone-list-icon" 
                            style={{ backgroundColor: `${sale.color}15`, color: sale.color }}
                          >
                            {sale.initials}
                          </div>
                          <div className="phone-list-details">
                            <span className="phone-list-name">{sale.name}</span>
                            <span className="phone-list-time">{sale.time}</span>
                          </div>
                          <span className="phone-list-amount">₦{sale.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === "stock" && (
                  <>
                    <div className="phone-sales-total" style={{ border: "1px solid rgba(16, 185, 129, 0.15)" }}>
                      <span className="phone-sales-lbl">Inventory Summary</span>
                      <span className="phone-sales-val" style={{ color: "#34d399" }}>
                        {stockList.filter(item => item.qty <= item.limit).length} Warning Alerts
                      </span>
                    </div>

                    <div className="phone-action-bar">
                      <span className="phone-section-title">Stock Levels</span>
                    </div>

                    <div className="phone-list">
                      {stockList.map((item, i) => {
                        const isLow = item.qty <= item.limit;
                        return (
                          <div className="phone-list-item" key={i}>
                            <div className="phone-list-details">
                              <span className="phone-list-name">{item.name}</span>
                              <div style={{ display: "flex", gap: "6px", marginTop: "2px", alignItems: "center" }}>
                                <span className="phone-list-time">Qty: {item.qty}</span>
                                <span className={isLow ? "phone-stock-badge-low" : "phone-stock-badge-ok"}>
                                  {isLow ? "Low Stock" : "Healthy"}
                                </span>
                              </div>
                            </div>
                            <button 
                              onClick={() => handleSellStock(i)}
                              className="phone-action-btn"
                              style={{ 
                                background: isLow ? "rgba(239, 68, 68, 0.2)" : "rgba(255,255,255,0.06)",
                                border: isLow ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid rgba(255,255,255,0.1)",
                                color: isLow ? "#f87171" : "#fff",
                                padding: "4px 8px",
                                fontSize: "0.65rem",
                                boxShadow: "none"
                              }}
                              disabled={item.qty === 0}
                            >
                              Sell 1
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {activeTab === "expenses" && (
                  <>
                    <div className="phone-expense-summary">
                      <span className="phone-sales-lbl">Expense Budget</span>
                      <span className="phone-sales-val" style={{ color: "#f472b6" }}>₦{totalExpenses.toLocaleString()}</span>
                      <div className="phone-progress-bg">
                        <div className="phone-progress-fill" style={{ width: `${expensePercentage}%` }}></div>
                      </div>
                      <span className="phone-sales-lbl" style={{ alignSelf: "flex-end", fontSize: "0.6rem", marginTop: "4px" }}>
                        {expensePercentage.toFixed(0)}% of limit (₦{budgetLimit.toLocaleString()})
                      </span>
                    </div>

                    <div className="phone-action-bar">
                      <span className="phone-section-title">Expense Log</span>
                      <button 
                        onClick={handleAddExpenseEmulator} 
                        className="phone-action-btn"
                        disabled={hasAddedExpense}
                        style={{ 
                          background: "linear-gradient(135deg, var(--accent-secondary) 0%, #c084fc 100%)",
                          boxShadow: "0 4px 10px rgba(217, 70, 239, 0.3)",
                          opacity: hasAddedExpense ? 0.6 : 1 
                        }}
                      >
                        {hasAddedExpense ? "Logged" : "+ Add Expense"}
                      </button>
                    </div>

                    <div className="phone-list">
                      {expenseList.map((expense, i) => (
                        <div className="phone-list-item" key={i}>
                          <div 
                            className="phone-list-icon" 
                            style={{ backgroundColor: "rgba(217, 70, 239, 0.15)", color: "var(--accent-secondary)" }}
                          >
                            ₦
                          </div>
                          <div className="phone-list-details">
                            <span className="phone-list-name">{expense.name}</span>
                            <span className="phone-list-time">Daily overhead</span>
                          </div>
                          <span className="phone-list-amount">₦{expense.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Tab Bar */}
              <div className="phone-tab-bar">
                <button 
                  onClick={() => setActiveTab("sales")} 
                  className={`phone-tab-btn ${activeTab === "sales" ? "active" : ""}`}
                >
                  <svg viewBox="0 0 24 24">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  <span>Sales</span>
                </button>
                <button 
                  onClick={() => setActiveTab("stock")} 
                  className={`phone-tab-btn ${activeTab === "stock" ? "active" : ""}`}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                  <span>Stock</span>
                </button>
                <button 
                  onClick={() => setActiveTab("expenses")} 
                  className={`phone-tab-btn ${activeTab === "expenses" ? "active" : ""}`}
                >
                  <svg viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                    <line x1="12" y1="4" x2="12" y2="20" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                  </svg>
                  <span>Expenses</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Bento Section */}
      <section className="features" id="features">
        <div className="section-header reveal">
          <h2>Everything you need, nothing you don&apos;t.</h2>
          <p className="section-subtitle">
            Say goodbye to physical paper books and calculators. 
            Track all transactions in one place.
          </p>
        </div>

        <div className="bento-grid">
          {/* Bento Item 1: Record Sales (Interactive Keyboard) */}
          <div className="bento-item glass reveal">
            <div className="bento-content">
              <h3>Record Sales</h3>
              <p>
                Log daily transactions instantly. Keep track of what you sold, when,
                and how much revenue you&apos;ve made today.
              </p>
            </div>
            <div className="bento-visual">
              {showKeypadToast && (
                <div className="sales-keypad-toast">
                  Saved!
                </div>
              )}
              <div className="sales-keypad-widget">
                <div className="sales-keypad-screen">
                  <span>{keypadVal}</span>
                  <div className="sales-keypad-indicator"></div>
                </div>
                <div className="sales-keypad-grid">
                  {["1", "2", "3", "4", "5", "6", "7", "C", "Record"].map((val) => (
                    <button 
                      key={val} 
                      onClick={() => handleKeypadPress(val)}
                      className={`sales-keypad-btn ${val === "Record" ? "action" : ""}`}
                      style={{ gridColumn: val === "Record" ? "span 2" : "span 1" }}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bento Item 2: Inventory Alerts (Interactive Stock Level) */}
          <div className="bento-item glass reveal-delay">
            <div className="bento-content">
              <h3>Inventory Alerts</h3>
              <p>
                Get instantly notified when products run low. Never run out of your
                best sellers again.
              </p>
            </div>
            <div className="bento-visual">
              <div className="stock-slider-widget">
                <div className="stock-slider-info">
                  <span className="stock-slider-item-name">MacBook Stock</span>
                  <span className={`stock-slider-count ${sliderStock <= 3 ? "low" : ""}`}>
                    {sliderStock} units
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  value={sliderStock} 
                  onChange={(e) => setSliderStock(parseInt(e.target.value, 10))}
                  className="stock-slider-control"
                />
                {sliderStock <= 3 && (
                  <div className="stock-slider-alert">
                    ⚠️ LOW STOCK WARNING
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bento Item 3: Debt Tracking (Interactive WhatsApp Reminder) */}
          <div className="bento-item glass reveal-delay-2">
            <div className="bento-content">
              <h3>Debt Tracking</h3>
              <p>
                Log customers who owe you, track partial repayments, and send quick 
                reminders easily without manual math.
              </p>
            </div>
            <div className="bento-visual">
              <div className="debt-chat-widget">
                <div className="debt-chat-header">
                  <div className="debt-chat-avatar">K</div>
                  <div className="debt-chat-userinfo">
                    <span className="debt-chat-name">Kofi Debtor</span>
                    <span className="debt-chat-status">Online</span>
                  </div>
                </div>
                <div className="debt-chat-messages">
                  {chatMessages.map((msg, i) => (
                    <div className={`debt-msg ${msg.isSent ? "sent" : "received"}`} key={i}>
                      {msg.text}
                      <div className="debt-msg-time">{msg.time}</div>
                    </div>
                  ))}
                </div>
                <div className="debt-chat-action">
                  <button 
                    onClick={handleSendReminder}
                    className="debt-btn-send"
                    disabled={hasSentReminder}
                    style={{ opacity: hasSentReminder ? 0.6 : 1 }}
                  >
                    <span>💬</span> {hasSentReminder ? "Sent Reminder" : "Remind Kofi"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Item 4: Offline-First Architecture (Large Box with sync particle toggle) */}
          <div className="bento-item glass bento-large reveal">
            <div className="bento-content">
              <h3>Offline-First Architecture</h3>
              <p>
                Whether you&apos;re in a busy market with no signal or on the go, Record Am
                works flawlessly offline. Toggle the switch below to see how local data syncs 
                to the cloud automatically the moment you reconnect.
              </p>
            </div>
            <div className="bento-visual">
              <div className="offline-sync-widget">
                <div className="offline-toggle-container">
                  <span className="offline-toggle-lbl">Simulate Internet</span>
                  <label className="offline-switch">
                    <input 
                      type="checkbox" 
                      checked={isOnline} 
                      onChange={(e) => setIsOnline(e.target.checked)} 
                    />
                    <span className="offline-slider"></span>
                  </label>
                </div>

                <div className="offline-flow-diagram">
                  <div className="offline-node">
                    <div className={`offline-node-icon ${isOnline ? "success" : "active"}`}>
                      📱
                    </div>
                    <span className="offline-node-lbl">SQLite Local</span>
                  </div>
                  
                  <div className={`offline-conn-line ${isOnline ? "connected" : "offline"}`}></div>

                  <div className="offline-node">
                    <div className={`offline-node-icon ${isOnline ? "success" : ""}`}>
                      ☁️
                    </div>
                    <span className="offline-node-lbl">Cloud DB</span>
                  </div>
                </div>

                <div className={`offline-status-banner ${isOnline ? "online" : "offline"}`}>
                  {isOnline 
                    ? "✓ ONLINE - Synced in real-time" 
                    : "⚡ OFFLINE - Saving changes locally (Safe)"
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Bento Item 5: Expense Management (Expense pie doughnut) */}
          <div className="bento-item glass reveal-delay">
            <div className="bento-content">
              <h3>Expense Logging</h3>
              <p>
                Record your daily business expenses as they happen. Always know exactly where your money is going.
              </p>
            </div>
            <div className="bento-visual">
              <div className="expense-chart-widget">
                <svg viewBox="0 0 100 100" className="expense-doughnut">
                  <circle cx="50" cy="50" r="40" className="expense-doughnut-bg" />
                  <circle cx="50" cy="50" r="40" className="expense-doughnut-slice-1" />
                  <circle cx="50" cy="50" r="40" className="expense-doughnut-slice-2" />
                  <circle cx="50" cy="50" r="40" className="expense-doughnut-slice-3" />
                </svg>
                <div className="expense-chart-center">
                  <span className="expense-chart-val">₦63,000</span>
                  <span className="expense-chart-lbl">Total</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* P&L Leakage Calculator Section */}
      <section className="calculator-section" id="calculator">
        <div className="section-header reveal">
          <h2>Revenue Leakage Estimator</h2>
          <p className="section-subtitle">
            See how much money slips through the cracks in your business due to forgotten debt logs and inventory issues.
          </p>
        </div>

        <div className="calculator-container glass reveal">
          <div className="calculator-sliders">
            <div className="calc-group">
              <div className="calc-label-row">
                <span className="calc-label">Average Daily Sales</span>
                <span className="calc-value-display">₦{dailySales.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min={10000} 
                max={500000} 
                step={5000}
                value={dailySales} 
                onChange={(e) => setDailySales(parseInt(e.target.value, 10))}
                className="calc-slider"
              />
            </div>

            <div className="calc-group">
              <div className="calc-label-row">
                <span className="calc-label">Estimated Leakage Rate</span>
                <span className="calc-value-display" style={{ color: "var(--accent-secondary)" }}>
                  {leakagePercent}%
                </span>
              </div>
              <p className="phone-list-time" style={{ margin: "-8px 0 6px 0", fontSize: "0.75rem" }}>
                Unlogged credits, stockout cancellations, and calculation errors typically cost small businesses 5% to 15%.
              </p>
              <input 
                type="range" 
                min={2} 
                max={20} 
                step={1}
                value={leakagePercent} 
                onChange={(e) => setLeakagePercent(parseInt(e.target.value, 10))}
                className="calc-slider"
              />
            </div>
          </div>

          <div className="calculator-results">
            <div className="result-card-row">
              <div className="result-box">
                <span className="result-box-title">Projected Annual Revenue</span>
                <span className="result-box-val">₦{annualRevenue.toLocaleString()}</span>
              </div>
              <div className="result-box result-box-leakage">
                <span className="result-box-title">Estimated Annual Leakage</span>
                <span className="result-box-val">₦{projectedLeakage.toLocaleString()}</span>
              </div>
            </div>

            <div className="result-savings-hero">
              <div className="result-savings-details">
                <span className="result-savings-title">Recoverable with Record Am</span>
                <span className="result-savings-val">₦{savedLeakage.toLocaleString()}</span>
                <span className="phone-list-time" style={{ color: "#a5b4fc", fontSize: "0.7rem", marginTop: "4px" }}>
                  *Assumes 85% reduction in leakages through digital tracking
                </span>
              </div>
              <div className="result-savings-badge">
                Save 85%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="faq-section" id="faq">
        <div className="section-header reveal">
          <h2>Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about the app structure and support.
          </p>
        </div>

        <div className="faq-list reveal-delay">
          {[
            {
              q: "Does Record Am work without any internet access?",
              a: "Yes, Record Am is built offline-first. It saves all your sales, inventory, expenses, and customer debts locally on your phone so you can keep recording transactions in the market even without mobile data or WiFi.",
            },
            {
              q: "Where is my data stored and is it secure?",
              a: "Your records are saved locally on your device and automatically synced with a secure Supabase cloud database protected by Row Level Security (RLS). You never lose your business records, even if you switch phones.",
            },
            {
              q: "How do I install the app after downloading the APK?",
              a: "Once downloaded, tap the record-am.apk file on your phone. If Android shows a security prompt, tap 'Settings', enable 'Allow from this source', and tap 'Install'. The app opens instantly with zero loading screen delays.",
            },
            {
              q: "How large is the APK and what Android version is required?",
              a: "The standalone APK is ~109 MB, containing the complete offline database engine, native libraries, and Hermes bytecode optimizer. It runs smoothly on any Android phone running Android 7.0 (Nougat) or higher.",
            },
            {
              q: "Can I manage multiple business branches?",
              a: "Yes! Record Am supports multi-branch management and branch switching directly within your workspace.",
            },
            {
              q: "Is the app free to use?",
              a: "Yes, all core bookkeeping features—including sales logging, stock tracking, debt management, and profit analytics—are 100% free.",
            },
          ].map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeFaq === index ? "active" : ""}`}
            >
              <button 
                className="faq-question-btn" 
                onClick={() => toggleFaq(index)}
              >
                <span>{item.q}</span>
                <svg className="faq-icon" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* APK CTA & Download Section */}
      <section className="cta-banner" id="download">
        <div className="cta-container glass reveal">
          <div className="cta-text">
            <h2 className="cta-title">Start bookkeeping smart today.</h2>
            <p className="cta-description">
              Stop guessing your sales. Track profits, stocks, and debts accurately, offline.
              Download the APK directly and install in under a minute.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
              <a href="/record-am.apk" download="record-am.apk" className="btn btn-primary">
                <span>⬇</span> Download APK
              </a>
              <div className="cta-meta">
                <div className="cta-meta-item">
                  <span className="cta-meta-lbl">File Size</span>
                  <span className="cta-meta-val">109.5 MB</span>
                </div>
                <div className="cta-meta-item">
                  <span className="cta-meta-lbl">Version</span>
                  <span className="cta-meta-val">v1.0.0 (Stable)</span>
                </div>
                <div className="cta-meta-item">
                  <span className="cta-meta-lbl">Platform</span>
                  <span className="cta-meta-val">Android 7.0+</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cta-visual">
            <div className="qr-card">
              <div className="qr-code-wrapper">
                {/* Clean SVG QR code layout */}
                <svg viewBox="0 0 100 100">
                  <rect x="0" y="0" width="25" height="25" fill="#090c14" />
                  <rect x="5" y="5" width="15" height="15" fill="#fff" />
                  <rect x="8" y="8" width="9" height="9" fill="#090c14" />
                  
                  <rect x="75" y="0" width="25" height="25" fill="#090c14" />
                  <rect x="80" y="5" width="15" height="15" fill="#fff" />
                  <rect x="83" y="8" width="9" height="9" fill="#090c14" />
                  
                  <rect x="0" y="75" width="25" height="25" fill="#090c14" />
                  <rect x="5" y="80" width="15" height="15" fill="#fff" />
                  <rect x="8" y="83" width="9" height="9" fill="#090c14" />
                  
                  {/* Random pixels to simulate QR */}
                  <rect x="35" y="5" width="5" height="10" fill="#090c14" />
                  <rect x="45" y="15" width="10" height="5" fill="#090c14" />
                  <rect x="60" y="5" width="5" height="5" fill="#090c14" />
                  <rect x="65" y="15" width="5" height="10" fill="#090c14" />
                  <rect x="30" y="30" width="15" height="5" fill="#090c14" />
                  <rect x="50" y="35" width="5" height="15" fill="#090c14" />
                  <rect x="60" y="30" width="10" height="10" fill="#090c14" />
                  <rect x="80" y="35" width="5" height="5" fill="#090c14" />
                  <rect x="90" y="45" width="5" height="10" fill="#090c14" />
                  <rect x="10" y="40" width="10" height="5" fill="#090c14" />
                  <rect x="5" y="50" width="5" height="5" fill="#090c14" />
                  <rect x="25" y="55" width="5" height="10" fill="#090c14" />
                  <rect x="35" y="65" width="10" height="5" fill="#090c14" />
                  <rect x="30" y="80" width="5" height="15" fill="#090c14" />
                  <rect x="40" y="75" width="15" height="5" fill="#090c14" />
                  <rect x="60" y="85" width="10" height="5" fill="#090c14" />
                  <rect x="65" y="65" width="5" height="10" fill="#090c14" />
                  <rect x="50" y="55" width="15" height="5" fill="#090c14" />
                  <rect x="75" y="60" width="20" height="5" fill="#090c14" />
                  <rect x="85" y="75" width="5" height="15" fill="#090c14" />
                  <rect x="90" y="90" width="10" height="5" fill="#090c14" />
                </svg>
              </div>
              <span className="qr-lbl">Scan with phone camera to download APK</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass reveal">
        <div className="footer-content">
          <div className="footer-logo">
            <Image src="/logo.png" alt="Record Am Logo" width={24} height={24} />
            <span>Record Am</span>
          </div>
          <p className="creator" style={{ marginTop: "12px" }}>
            Created by{" "}
            <a href="https://krisshedrach.dev" target="_blank" rel="noopener noreferrer">
              Kris Shedrach
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
