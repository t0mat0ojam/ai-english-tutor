// pages/index.tsx
import Link from 'next/link';
import './globals.css';

const Home = () => {
  return (
    <div>
      {/* Taskbar */}
      <header className="header">
        <div className="logo">
          <h1>AI English Tutor</h1> {/* App logo/name */}
        </div>
        <nav className="navbar">
          <Link href="#about">About</Link>
          <Link href="#features">Features</Link>
          <Link href="#contact">Contact</Link>
        </nav>
      </header>

      {/* Main Section */}
      <main className="main">
        <section className="hero" id="hero">
          <h2>Improve Your English Skills with AI</h2>
          <p>
            Start practicing English with a personalized AI tutor. Perfect for Japanese students aiming to improve their language skills.
          </p>

          {/* Buttons for Sign Up & Log In */}
          <div className="buttonContainer">
            <Link href="/auth/signup">
              <button className="primaryButton getStartedButton">Get Started For Free</button>
            </Link>
            <Link href="/auth/login">
              <button className="primaryButton loginButton">Log In</button>
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="about" id="about">
          <h2>About Us</h2>
          <p>Learn more about our AI-powered English tutoring system.</p>
        </section>

        {/* Features Section */}
        <section className="features" id="features">
          <h2>Features</h2>
          <p>Discover the amazing features of the app that will help you improve your English.</p>
        </section>

        {/* Contact Section */}
        <section className="contact" id="contact">
          <h2>Contact Us</h2>
          <p>If you have any questions, feel free to contact us!</p>
        </section>
      </main>
    </div>
  );
};

export default Home;



