import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import emailjs from "emailjs-com";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

// ---------- HEADER ----------
const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="logo">
          <div className="logo-text">Nexora</div>
        </div>
        <nav>
          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
            {['home', 'about', 'services', 'testimonials', 'contact'].map((section) => (
              <li key={section}>
                <Link to={`#${section}`} onClick={() => scrollToSection(section)}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu" onClick={toggleMobileMenu}>
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
      </div>
    </header>
  );
};

// ---------- HOMEPAGE ----------
interface Particle {
  id: number;
  posX: number;
  posY: number;
  size: number;
  duration: number;
  opacity: number;
}

const HomePage: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        posX: Math.random() * 100,
        posY: Math.random() * 100,
        size: Math.random() * 5 + 1,
        duration: Math.random() * 20 + 10,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <>
      <div className="tech-bg">
        <div className="particles">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.posX}%`,
                top: `${particle.posY}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDuration: `${particle.duration}s`,
                opacity: particle.opacity,
              }}
            />
          ))}
        </div>
      </div>

      <Hero />
      <About />
      <MissionVisionValues />
      <Services />
      <Testimonials />
      <Contact />
    </>
  );
};

// ---------- HERO ----------
const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="container hero-content">
        <h1>Tecnología de Vanguardia para un Mundo Digital</h1>
        <p>
          En Nexora fusionamos innovación y experiencia para crear soluciones tecnológicas que transforman el futuro de las empresas.
        </p>
        <div className="hero-buttons">
          <Link to="#services" onClick={() => scrollToSection('services')} className="btn">Explorar Servicios</Link>
          <Link to="#contact" onClick={() => scrollToSection('contact')} className="btn btn-outline">Contactar Expertos</Link>
        </div>
      </div>
    </section>
  );
};

// ---------- ABOUT ----------
const About: React.FC = () => {
  return (
    <section className="about" id="about">
      <div className="containern">
        <div className="section-title">
          <h2>Sobre Nexora</h2>
          <p>Líderes en soluciones tecnológicas innovadoras para la transformación digital empresarial.</p>
        </div>
        <div className="about-content">
          <div className="about-text">
            <h3>Pioneros en Innovación Tecnológica</h3>
            <p>Nexora es la rama especializada en tecnología de nuestro grupo corporativo...</p>
            <p>Con un equipo de expertos apasionados por la tecnología...</p>
            <p>Nuestra misión es convertir ideas complejas en soluciones tecnológicas elegantes...</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- MISSION VISION VALUES ----------
interface Value {
  icon: string;
  title: string;
  description: string;
}

const MissionVisionValues: React.FC = () => {
  const values: Value[] = [
    { icon: "fas fa-rocket", title: "Misión", description: "Impulsar la transformación digital..." },
    { icon: "fas fa-eye", title: "Visión", description: "Ser el referente regional en soluciones..." },
    { icon: "fas fa-gem", title: "Valores", description: "Innovación constante, integridad técnica..." },
  ];

  return (
    <section className="mvv">
      <div className="container">
        <div className="section-title">
          <h2>Nuestra Filosofía</h2>
          <p>Los principios que guían cada proyecto y decisión en Nexora.</p>
        </div>
        <div className="mvv-cards">
          {values.map((value, index) => (
            <div key={index} className="mvv-card">
              <i className={value.icon}></i>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- SERVICES ----------
interface Service {
  icon: string;
  title: string;
  description: string;
}

const Services: React.FC = () => {
  const services: Service[] = [
    {
      icon: "fas fa-laptop-code",
      title: "Desarrollo Web Avanzado",
      description: "Plataformas web personalizadas con arquitecturas escalables, optimizadas para rendimiento y experiencia de usuario excepcional."
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Aplicaciones Móviles",
      description: "Soluciones nativas y multiplataforma para iOS y Android, con interfaces intuitivas y funcionalidades de última generación."
    },
    {
      icon: "fas fa-cloud",
      title: "Infraestructura Cloud",
      description: "Diseño e implementación de arquitecturas cloud seguras, escalables y optimizadas para maximizar la eficiencia operativa."
    },
    {
      icon: "fas fa-brain",
      title: "Inteligencia Artificial",
      description: "Soluciones de IA y machine learning para automatizar procesos, analizar datos y crear experiencias personalizadas a escala."
    },
    {
      icon: "fas fa-shield-alt",
      title: "Ciberseguridad",
      description: "Estrategias integrales de protección digital, desde auditorías de vulnerabilidad hasta implementación de sistemas defensivos avanzados."
    },
    {
      icon: "fas fa-cogs",
      title: "Automatización Digital",
      description: "Transformación de procesos empresariales mediante flujos de trabajo automatizados que optimizan recursos y aumentan productividad."
    }
  ];

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-title">
          <h2>Soluciones Tecnológicas</h2>
          <p>Ofrecemos un portfolio integral de servicios digitales para transformar tu negocio.</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  return (
    <div className="service-card">
      <div className="service-card-header">
        <i className={service.icon}></i>
        <h3>{service.title}</h3>
      </div>
      <div className="service-card-body">
        <p>{service.description}</p>
        <Link to="#contact" className="btn">Solicitar Información</Link>
      </div>
    </div>
  );
};

// ---------- TESTIMONIALS ----------
interface Testimonial {
  id: number;
  content: string;
  author: string;
  position: string;
  image: string;
}

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
    const testimonials: Testimonial[] = [
    {
      id: 1,
      content: "La transformación digital que Nexora implementó en nuestra empresa ha revolucionado nuestros procesos internos y mejorado significativamente nuestra competitividad. Su enfoque técnico y visión estratégica son incomparables.",
      author: "Ana Martínez",
      position: "Directora de Innovación",
      image: "https://picsum.photos/seed/person1/100/100.jpg"
    },
    {
      id: 2,
      content: "La solución de inteligencia artificial desarrollada por Nexora ha optimizado nuestros sistemas de recomendación, aumentando nuestras conversiones en un 40%. Su equipo técnico demuestra un conocimiento profundo y una capacidad excepcional.",
      author: "Carlos Rodríguez",
      position: "E-commerce Global",
      image: "https://picsum.photos/seed/person2/100/100.jpg"
    },
    {
      id: 3,
      content: "La migración a la nube gestionada por Nexora no solo mejoró nuestra infraestructura tecnológica, sino que también redujo nuestros costos operativos en un 35%. Su profesionalismo y atención al detalle fueron fundamentales para el éxito del proyecto.",
      author: "Laura Gómez",
      position: "Directora de TI",
      image: "https://picsum.photos/seed/person3/100/100.jpg"
    }
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-title">
          <h2>Testimonios de Clientes</h2>
          <p>La experiencia de quienes confían en nuestras soluciones tecnológicas.</p>
        </div>
        <div className="testimonials-container">
          {testimonials.map((t, i) => (
            <div key={t.id} className={`testimonial-item ${i === activeIndex ? 'active' : ''}`}>
              <p className="testimonial-content">{t.content}</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>{t.author}</h4>
                  <p>{t.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonial-controls">
          {testimonials.map((_, i) => (
            <span key={i} className={`testimonial-btn ${i === activeIndex ? 'active' : ''}`} onClick={() => setActiveIndex(i)}></span>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- CONTACT ----------
interface FormData {
  title: string;
  name: string;
  message: string;
  email: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ title: '', name: '', message: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs.send(
      "service_moy5n36",
      "template_guui0sf",
      formData as any,
      "iTAVENc8IZkD9BRyA"
    ).then(
      (result: any) => { console.log("Correo enviado:", result.text); setSubmitted(true); },
      (error: any) => { console.error("Error:", error.text); }
    );
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', title: '', message: '' });
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-title">
          <h2>Contacto</h2>
          <p>Hablemos sobre cómo podemos transformar tu negocio con tecnología de vanguardia.</p>
        </div>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Conecta con Nuestros Expertos</h3>
            <p>Nuestro equipo de especialistas está listo para analizar tus necesidades y diseñar soluciones tecnológicas personalizadas que impulsen tu crecimiento empresarial.</p>
            <div className="contact-item">
              <i className="fas fa-phone-alt"></i>
              <div><h4>Llámanos</h4><p>+52 55 33465069 (Solo Whatsapp)</p></div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div><h4>Email</h4><p>nexoratecnology@gmail.com</p></div>
            </div>
          </div>
          <div className="contact-form">
            {submitted ? (
              <div className="form-success">
                <i className="fas fa-check-circle"></i>
                <h3>¡Mensaje Enviado!</h3>
                <p>Gracias por contactarnos, {formData.name}. Hemos recibido tu mensaje.</p>
                <button className="btn" onClick={resetForm}>Enviar Otro Mensaje</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nombre Completo</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="title">Asunto</label>
                  <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mensaje</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn">Enviar Mensaje</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- FOOTER ----------
const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Servicios', href: '#services' },
    { name: 'Testimonios', href: '#testimonials' },
    { name: 'Contacto', href: '#contact' },
  ];

  const services = [
    { name: 'Desarrollo Web', href: '#services' },
    { name: 'Aplicaciones Móviles', href: '#services' },
    { name: 'Infraestructura Cloud', href: '#services' },
    { name: 'Inteligencia Artificial', href: '#services' },
    { name: 'Ciberseguridad', href: '#services' },
    { name: 'Automatización Digital', href: '#services' },
  ];

  return (
    <footer>
      <div className="container">
        <div className="footer-container">
          <div className="footer-col">
            <h4>Nexora</h4>
            <p>Líderes en soluciones tecnológicas innovadoras para la transformación digital empresarial.</p>
          </div>
          <div className="footer-col">
            <h4>Enlaces Rápidos</h4>
            <ul>{quickLinks.map((link, i) => <li key={i}><a href={link.href}>{link.name}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Servicios</h4>
            <ul>{services.map((s, i) => <li key={i}><a href={s.href}>{s.name}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li><i className="fas fa-phone-alt"></i> +52 55 33465069 (Solo Whatsapp)</li>
              <li><i className="fas fa-envelope"></i> nexoratecnology@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Nexora. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default App;
