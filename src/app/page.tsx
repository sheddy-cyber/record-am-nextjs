"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    // Navbar blur effect on scroll
    const navbar = document.querySelector(".navbar");
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }

      // Parallax effect for the background canvas
      const bgImage = document.querySelector(".bg-image") as HTMLElement;
      if (bgImage) {
        bgImage.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for scroll-triggered animations
    const revealElements = document.querySelectorAll(
      ".reveal, .reveal-delay, .reveal-delay-2"
    );

    const revealOptions = {
      threshold: 0.15,
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

  return (
    <main>
      {/* Background Canvas */}
      <div className="bg-canvas">
        <img src="/bg.png" alt="Abstract Background" className="bg-image" />
        <div className="bg-overlay"></div>
      </div>

      <nav className="navbar reveal">
        <div className="nav-container">
          <div className="logo-group">
            <div className="logo-wrapper">
              <img src="/logo.png" alt="Record Am Logo" className="logo" />
            </div>
            <span className="brand-name">Record Am</span>
          </div>
          <a href="#download" className="btn btn-nav">
            Get Started
          </a>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content reveal">
          <div className="hero-badge">Now Available on Android</div>
          <h1 className="hero-title">
            <span className="text-gradient">Sales, stocks, expenses?</span>
            <br />
            Record Am.
          </h1>
          <p className="hero-subtitle">
            Track sales, manage inventory, and monitor your daily revenue seamlessly.
            Works completely offline so you never miss a beat.
          </p>

          <div className="hero-actions" id="download">
            <button className="btn btn-primary pulse">Download APK</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>

        <div className="hero-visual reveal-delay">
          <div className="phone-frame float">
            <img
              src="/dashboard.png"
              alt="App Dashboard"
              className="screenshot"
            />
          </div>
        </div>
      </header>

      <section className="features" id="features">
        <div className="section-header reveal">
          <h2>
            Everything you need, <br />
            nothing you don't.
          </h2>
        </div>

        <div className="bento-grid">
          {/* Feature 1: Record Sales */}
          <div className="bento-item glass reveal">
            <div className="bento-content">
              <h3>Record Sales</h3>
              <p>
                Log daily transactions instantly. Keep track of what you sold, when,
                and how much revenue you've made today.
              </p>
            </div>
            <div className="bento-visual overflow-hidden">
               <img src="/dashboard.png" alt="Sales Tracking" className="mockup-slice" />
            </div>
          </div>

          {/* Feature 2: Inventory Alerts */}
          <div className="bento-item glass reveal-delay">
            <div className="bento-content">
              <h3>Inventory Alerts</h3>
              <p>
                Get instantly notified when products run low. Never run out of your
                best sellers again.
              </p>
            </div>
            <div className="bento-visual overflow-hidden">
              <img
                src="/inventory.png"
                alt="Inventory Mockup"
                className="mockup-slice"
              />
            </div>
          </div>

          {/* Feature 3: Debt Tracking */}
          <div className="bento-item glass reveal-delay-2">
            <div className="bento-content">
              <h3>Debt Tracking</h3>
              <p>
                Log customers who owe you, track partial repayments, and settle
                balances easily without manual math.
              </p>
            </div>
          </div>

          {/* Feature 4: Offline-First (Large Box) */}
          <div className="bento-item glass bento-large reveal">
            <div className="bento-content">
              <h3>Offline-First Architecture</h3>
              <p>
                Whether you're in a busy market with no signal or on the go, Record Am
                works flawlessly offline. Your data syncs automatically the moment
                you reconnect to the internet.
              </p>
            </div>
            <div className="bento-visual">
              <div className="sync-animation">
                <div className="circle c1"></div>
                <div className="circle c2"></div>
                <div class="circle c3"></div>
              </div>
            </div>
          </div>

          {/* Feature 5: Expense Management */}
          <div className="bento-item glass reveal-delay">
            <div className="bento-content">
              <h3>Expense Logging</h3>
              <p>
                Record your daily business expenses as they happen. Always know exactly where your money is going.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="glass reveal">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/logo.png" alt="Record Am Logo" />
            <span>Record Am</span>
          </div>
          <p className="creator">
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
