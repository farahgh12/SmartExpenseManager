import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button, Row, Col, Card } from 'antd';
import { 
  BarChartOutlined, 
  SafetyOutlined, 
  ThunderboltOutlined, 
  GithubOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-earth-50 font-sans">
      <Head title="Welcome - SmartExpense" />
      
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white/50 backdrop-blur-md sticky top-0 z-50 border-b border-earth-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-bold text-earth-900 tracking-tight">SmartExpense</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-earth-800 hover:text-sage-600 font-medium transition-colors">Features</a>
          <a href="#about" className="text-earth-800 hover:text-sage-600 font-medium transition-colors">About</a>
          <a href="#contact" className="text-earth-800 hover:text-sage-600 font-medium transition-colors">Contact</a>
          <Link href="/dashboard">
            <Button type="primary" className="bg-sage-600 hover:bg-sage-500 border-none h-10 px-6 rounded-lg font-bold">
              Open App
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-24 md:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100/50 rounded-full mb-8 border border-sage-200">
          <span className="w-2 h-2 bg-sage-500 rounded-full animate-pulse"></span>
          <span className="text-sage-700 font-semibold text-sm">Managing Smarter since 2026</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-earth-900 mb-6 leading-tight max-w-4xl">
          Take Control of Your <br />
          <span className="text-sage-600">Finances with Style.</span>
        </h1>
        <p className="text-xl text-earth-800/70 max-w-2xl mb-12 leading-relaxed">
          The ultimate expense manager for people who value aesthetics and precision. 
          Monitor, budget, and visualize your wealth in a beautiful earthy environment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <Button type="primary" size="large" className="bg-sage-600 hover:bg-sage-500 border-none h-14 px-10 rounded-xl font-bold text-lg shadow-xl">
              Get Started for Free
            </Button>
          </Link>
          <a href="#features">
            <Button size="large" className="h-14 px-10 rounded-xl font-bold text-lg border-earth-200 text-earth-800 hover:border-sage-500 hover:text-sage-600">
              Explore Features
            </Button>
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-8 py-24 bg-white/50 border-y border-earth-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-earth-900 mb-4">Powerful Features</h2>
            <div className="w-20 h-1 bg-sand-500 mx-auto rounded-full"></div>
          </div>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <Card className="premium-card h-full p-6 text-center">
                <div className="w-16 h-16 bg-sage-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChartOutlined className="text-sage-600 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-earth-900 mb-4">Smart Analytics</h3>
                <p className="text-earth-800/70">Beautiful pie and line charts to visualize where your money goes and how your spending evolves over time.</p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="premium-card h-full p-6 text-center">
                <div className="w-16 h-16 bg-clay-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ThunderboltOutlined className="text-clay-500 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-earth-900 mb-4">Budget Limits</h3>
                <p className="text-earth-800/70">Set monthly goals and get smart alerts when you're nearing your limit. Stay disciplined with ease.</p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="premium-card h-full p-6 text-center">
                <div className="w-16 h-16 bg-sand-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <SafetyOutlined className="text-sand-500 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-earth-900 mb-4">Secure & Private</h3>
                <p className="text-earth-800/70">Your financial data is encrypted and secure. We focus on privacy so you can focus on your goals.</p>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-8 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-earth-900 mb-8">About the Project</h2>
          <p className="text-lg text-earth-800/80 leading-relaxed mb-8">
            SmartExpense was born from the idea that financial tracking shouldn't be boring or ugly. 
            We've combined powerful Laravel backend technology with a modern React frontend 
            wrapped in a premium earthy aesthetic.
          </p>
          <div className="flex justify-center gap-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-sage-600">100%</div>
              <div className="text-earth-800/60 uppercase text-xs font-bold tracking-widest mt-1">Open Source</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sage-600">Fast</div>
              <div className="text-earth-800/60 uppercase text-xs font-bold tracking-widest mt-1">Vite Powered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sage-600">Clean</div>
              <div className="text-earth-800/60 uppercase text-xs font-bold tracking-widest mt-1">UI Design</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-earth-900 px-8 py-16 text-earth-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-sage-500 rounded flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">SmartExpense</span>
            </div>
            <p className="text-earth-100/60 leading-relaxed italic">
              "Master your wealth, simplify your life."
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Connect</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-earth-100/80">
                <MailOutlined />
                <span>support@smartexpense.com</span>
              </div>
              <div className="flex items-center gap-3 text-earth-100/80">
                <PhoneOutlined />
                <span>+212 600 000 000</span>
              </div>
              <div className="flex items-center gap-3 text-earth-100/80">
                <GithubOutlined />
                <a href="https://github.com/farahgh12/SmartExpenseManager" target="_blank" className="hover:text-sage-500 transition-colors underline decoration-sage-500/30">View on GitHub</a>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-earth-800 mt-16 pt-8 text-center text-earth-100/40 text-sm">
          &copy; 2026 SmartExpense Manager. Built for Excellence.
        </div>
      </footer>
    </div>
  );
}
