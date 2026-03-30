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
      <Head title="Bienvenue - SmartExpense" />
      
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white/50 backdrop-blur-md sticky top-0 z-50 border-b border-earth-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-bold text-earth-900 tracking-tight">SmartExpense</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-earth-800 hover:text-sage-600 font-medium transition-colors">Fonctionnalités</a>
          <a href="#about" className="text-earth-800 hover:text-sage-600 font-medium transition-colors">À Propos</a>
          <a href="#contact" className="text-earth-800 hover:text-sage-600 font-medium transition-colors">Contact</a>
          <Link href="/dashboard">
            <Button type="primary" className="bg-sage-600 hover:bg-sage-500 border-none h-10 px-6 rounded-lg font-bold">
              Ouvrir l'App
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-24 md:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100/50 rounded-full mb-8 border border-sage-200">
          <span className="w-2 h-2 bg-sage-500 rounded-full animate-pulse"></span>
          <span className="text-sage-700 font-semibold text-sm">Gestion intelligente depuis 2026</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-earth-900 mb-6 leading-tight max-w-4xl">
          Prenez le Contrôle de vos <br />
          <span className="text-sage-600">Finances avec Style.</span>
        </h1>
        <p className="text-xl text-earth-800/70 max-w-2xl mb-12 leading-relaxed">
          Le gestionnaire de dépenses ultime pour ceux qui valorisent l'esthétique et la précision. 
          Suivez, budgétisez et visualisez votre patrimoine dans un superbe environnement naturel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <Button type="primary" size="large" className="bg-sage-600 hover:bg-sage-500 border-none h-14 px-10 rounded-xl font-bold text-lg shadow-xl">
              Commencer Gratuitement
            </Button>
          </Link>
          <a href="#features">
            <Button size="large" className="h-14 px-10 rounded-xl font-bold text-lg border-earth-200 text-earth-800 hover:border-sage-500 hover:text-sage-600">
              Explorer les Fonctionnalités
            </Button>
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-8 py-24 bg-white/50 border-y border-earth-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-earth-900 mb-4">Fonctionnalités Puissantes</h2>
            <div className="w-20 h-1 bg-sand-500 mx-auto rounded-full"></div>
          </div>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <Card className="premium-card h-full p-6 text-center">
                <div className="w-16 h-16 bg-sage-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChartOutlined className="text-sage-600 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-earth-900 mb-4">Analyses Intelligentes</h3>
                <p className="text-earth-800/70">De superbes graphiques en secteurs et en lignes pour visualiser où va votre argent et comment vos dépenses évoluent.</p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="premium-card h-full p-6 text-center">
                <div className="w-16 h-16 bg-clay-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ThunderboltOutlined className="text-clay-500 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-earth-900 mb-4">Limites de Budget</h3>
                <p className="text-earth-800/70">Définissez des objectifs mensuels et recevez des alertes intelligentes lorsque vous approchez de vos limites.</p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="premium-card h-full p-6 text-center">
                <div className="w-16 h-16 bg-sand-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <SafetyOutlined className="text-sand-500 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-earth-900 mb-4">Sécurisé et Privé</h3>
                <p className="text-earth-800/70">Vos données financières sont cryptées et sécurisées. Nous nous concentrons sur la confidentialité pour que vous puissiez vous concentrer sur vos objectifs.</p>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-8 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-earth-900 mb-8">À Propos du Projet</h2>
          <p className="text-lg text-earth-800/80 leading-relaxed mb-8">
            SmartExpense est né de l'idée que le suivi financier ne devrait pas être ennuyeux ou laid. 
            Nous avons combiné la puissance de Laravel avec React pour créer une expérience premium et naturelle.
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
              <div className="text-3xl font-bold text-sage-600">Propre</div>
              <div className="text-earth-800/60 uppercase text-xs font-bold tracking-widest mt-1">Design UI</div>
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
              "Maîtrisez votre richesse, simplifiez votre vie."
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
          &copy; 2026 SmartExpense Manager. Conçu pour l'Excellence.
        </div>
      </footer>
    </div>
  );
}
