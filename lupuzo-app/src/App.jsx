import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaGlobe, FaMobileAlt, FaBullhorn, FaRobot,
  FaComments, FaPalette, FaVideo, FaMapMarkerAlt,
  FaPhoneAlt, FaEnvelope, FaWhatsapp, FaArrowRight,
  FaBars, FaTimes, FaShieldAlt, FaRocket, FaStar,
  FaCheckCircle, FaCode, FaBolt, FaUsers, FaLightbulb,
  FaInstagram, FaLinkedin, FaTelegramPlane
} from 'react-icons/fa';
import logoImg from './assets/logo.jpg';
import p1 from './assets/p1.png';
import p2 from './assets/p2.png';
import p3 from './assets/p3.png';
import p4 from './assets/p4.png';
import p5 from './assets/p5.png';
import p6 from './assets/p6.png';
import './App.css';
import ClientSlideshow from './ClientSlideshow';

/* ─── DATA ─── */
const services = [
  { id: 1, title: 'Web Development',       icon: <FaGlobe />,   desc: 'Lightning-fast, modern websites built with React, Next.js & cutting-edge tech that convert visitors into customers.',    color: 'purple' },
  { id: 2, title: 'Mobile Apps',           icon: <FaMobileAlt />, desc: 'Sleek native & cross-platform iOS/Android apps with buttery-smooth UX that users love.',                               color: 'cyan'   },
  { id: 3, title: 'App Reskin & Setup',    icon: <FaCode />,    desc: 'We fully rebrand existing apps with your colors, assets & identity — ready to publish on App Store & Play Store.',        color: 'gold'   },
  { id: 4, title: 'Social Media Marketing',icon: <FaBullhorn />, desc: 'Data-driven campaigns that skyrocket your brand engagement, reach, and ROI across all platforms.',                       color: 'cyan'   },
  { id: 5, title: 'AI Agents',             icon: <FaRobot />,   desc: 'Custom intelligent AI agents that automate business workflows and give you a competitive edge.',                          color: 'purple' },
  { id: 6, title: 'Smart Chatbots',        icon: <FaComments />, desc: '24/7 AI-powered chatbots that handle customer support, qualify leads, and drive sales automatically.',                   color: 'gold'   },
  { id: 7, title: 'Logo & Branding',       icon: <FaPalette />, desc: 'Premium, memorable brand identities — logos, color systems, and guidelines that stand out.',                              color: 'purple' },
  { id: 8, title: 'Video Editing',         icon: <FaVideo />,   desc: 'Cinematic video production and editing that tells your brand story and captivates audiences.',                            color: 'cyan'   },
];

const processSteps = [
  { num: '01', title: 'Discovery', desc: 'We deep-dive into your goals, audience, and vision to define the perfect strategy.' },
  { num: '02', title: 'Design',    desc: 'Stunning UI/UX wireframes and prototypes crafted to maximise engagement.' },
  { num: '03', title: 'Build',     desc: 'Engineered with the latest tech stack for performance, security, and scalability.' },
  { num: '04', title: 'Launch',    desc: 'Full deployment, testing, and post-launch support to ensure flawless delivery.' },
];

/* Portfolio — images imported above, no external links */
const portfolioItems = [
  { id: 1, img: p1, title: 'E-Commerce Platform',       cat: 'Web',       desc: 'Full-stack online store with AI-powered product recommendations and seamless checkout.',   tags: ['React', 'Node.js', 'AI']     },
  { id: 2, img: p2, title: 'FinTech Mobile App',         cat: 'Mobile',    desc: 'Cross-platform banking app with biometric authentication and real-time transactions.',     tags: ['Flutter', 'Firebase']         },
  { id: 3, img: p3, title: 'AI Customer Service Bot',    cat: 'AI',        desc: 'Intelligent chatbot handling 10K+ customer queries per day with 95% resolution rate.',     tags: ['GPT-4', 'Python', 'NLP']     },
  { id: 4, img: p4, title: 'Brand Identity System',      cat: 'Branding',  desc: 'Complete brand identity package — logo, guidelines, and assets for a Saudi startup.',     tags: ['Branding', 'Figma']           },
  { id: 5, img: p5, title: 'Restaurant SaaS Dashboard',  cat: 'Web',       desc: 'Real-time analytics and order management dashboard serving 50+ restaurant branches.',      tags: ['Vue.js', 'PostgreSQL']        },
  { id: 6, img: p6, title: 'Social Media Campaign',      cat: 'Marketing', desc: 'Multi-platform social campaign that drove 500% engagement growth for a fashion brand.',  tags: ['Meta Ads', 'Analytics']       },
];

const skillBars = [
  { label: 'Web & App Development', pct: 95 },
  { label: 'AI & Automation',        pct: 88 },
  { label: 'UI/UX & Branding',       pct: 92 },
  { label: 'Digital Marketing',      pct: 85 },
];

const testimonials = [
  { name: 'Ahmed Al-Rashid', role: 'CEO, TechVentures SA',   text: "Lupuzo transformed our digital presence completely. The website they built increased our leads by 300% within the first month. Absolute professionals!", avatar: 'A', color: 'purple', stars: 5 },
  { name: 'Riya Sharma',     role: 'Founder, StyleBox',      text: "The AI chatbot Lupuzo built handles our customer queries 24/7. It's been a game-changer — our support costs dropped 70% immediately.",                     avatar: 'R', color: 'cyan',   stars: 5 },
  { name: 'Omar Abdullah',   role: 'Director, KashVentures', text: "Incredible team. Delivered our mobile app on time, under budget, and it looks absolutely stunning. Our users can't stop complimenting it.",                 avatar: 'O', color: 'gold',   stars: 5 },
];


/* ─── ANIMATED COUNTER ─── */
function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(target);
    const steps = 60, dur = 2000;
    const inc = num / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= num) { setCount(num); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, dur / steps);
    return () => clearInterval(t);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── SKILL BAR ─── */
function SkillBar({ label, pct }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="skill-bar-wrap" ref={ref}>
      <div className="skill-bar-header">
        <span className="skill-label">{label}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  );
}

/* ─── ANIMATION VARIANTS ─── */
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

/* ═══════════════════════════════════════════ APP ═══════════════════════════════════════════ */
export default function App() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [formStatus, setFormStatus] = useState('idle');

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    
    // If external link or generic hash, ignore
    if (!targetId || targetId === '#') return;

    // Remove hash
    const id = targetId.startsWith('#') ? targetId.substring(1) : targetId;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('sent'), 1500);
  };

  /* Duplicate portfolio for seamless infinite scroll */
  const allCards = [...portfolioItems, ...portfolioItems];

  return (
    <div className="app-container">
      <div className="bg-gradient-mesh" />
      <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />

      {/* ══════ NAVBAR ══════ */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <a href="#home" className="logo-container">
            <img src={logoImg} alt="Lupuzo" style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover' }} />
            <span className="logo-text">LUPUZO<span className="dot">.</span></span>
          </a>

          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            {['home','services','about','portfolio','contact'].map(l => (
              <li key={l}><a href={`#${l}`} className="nav-link" onClick={(e) => scrollToSection(e, l)}>{l[0].toUpperCase()+l.slice(1)}</a></li>
            ))}
          </ul>

          <div className="nav-actions">
            <a href="https://wa.me/917006505391" target="_blank" rel="noreferrer" className="btn-primary"><FaWhatsapp /> Let's Talk</a>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FaTimes /> : <FaBars />}</button>
          </div>
        </div>
      </nav>

      {/* ══════ HERO ══════ */}
      <section id="home" className="section hero-section">
        <div className="container">
          <div className="hero-inner">
            <motion.div className="hero-content" initial="hidden" animate="visible" variants={stagger}>
              <motion.div className="hero-badge" variants={fadeUp}>
                <span className="hero-badge-dot" /> Premium Digital Agency · KA &amp; SA
              </motion.div>

              <motion.h1 className="hero-headline" variants={fadeUp}>
                We Build<br /><span className="line-2">Digital Empires.</span>
              </motion.h1>

              <motion.p className="hero-subtext" variants={fadeUp}>
                Lupuzo is an independent agency crafting high-performance websites, mobile apps, AI systems &amp; brands. Operating from Kashmir &amp; Saudi Arabia — delivering world-class digital experiences.
              </motion.p>

              <motion.div className="hero-actions" variants={fadeUp}>
                <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="btn-primary"><FaRocket /> See Our Work</a>
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn-secondary">Start a Project <FaArrowRight /></a>
              </motion.div>

              <motion.div className="hero-stats-row" variants={fadeUp}>
                <div className="hero-stat"><span className="hero-stat-number">150+</span><span className="hero-stat-label">Projects Done</span></div>
                <div className="hero-stat"><span className="hero-stat-number">99%</span><span className="hero-stat-label">Satisfaction</span></div>
                <div className="hero-stat"><span className="hero-stat-number">2</span><span className="hero-stat-label">Global Offices</span></div>
              </motion.div>
            </motion.div>

            {/* Hero visual card */}
            <div className="hero-visual">
              <div className="hero-glow-ring" />
              <div className="hero-card-stack">
                <div className="hero-main-card">
                  <div className="hero-card-header">
                    <img src={logoImg} alt="Lupuzo" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />
                    <div className="hero-card-meta"><strong>Lupuzo Agency</strong><span>Project Dashboard</span></div>
                  </div>
                  {[
                    { label: 'Website Performance',  w: '94%',  color: '' },
                    { label: 'App Development',      w: '87%',  color: 'linear-gradient(90deg,#06b6d4,#22d3ee)' },
                    { label: 'AI Integration',       w: '79%',  color: 'linear-gradient(90deg,#f59e0b,#fcd34d)' },
                  ].map(b => (
                    <div className="hero-card-bar" key={b.label}>
                      <div className="hero-card-bar-label">{b.label}</div>
                      <div className="hero-progress-bar">
                        <div className="hero-progress-fill" style={{ width: b.w, ...(b.color ? { background: b.color } : {}) }} />
                      </div>
                    </div>
                  ))}
                  <div className="hero-card-tags">
                    <span className="hero-tag">React</span>
                    <span className="hero-tag cyan">AI/ML</span>
                    <span className="hero-tag gold">Design</span>
                    <span className="hero-tag">Flutter</span>
                    <span className="hero-tag cyan">Node.js</span>
                  </div>
                </div>
                <div className="hero-float-badge top-right"><span className="badge-icon">🚀</span><span>Live in 7 days</span></div>
                <div className="hero-float-badge bottom-left"><span className="badge-icon">⭐</span><span>99% Client Satisfaction</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ MARQUEE ══════ */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...Array(2)].map((_,i) => (
            <React.Fragment key={i}>
              <div className="marquee-item"><FaRobot /> AI Automation</div>
              <div className="marquee-item"><FaGlobe /> Next.js &amp; React</div>
              <div className="marquee-item"><FaMobileAlt /> iOS &amp; Android</div>
              <div className="marquee-item"><FaShieldAlt /> Enterprise Security</div>
              <div className="marquee-item"><FaPalette /> Premium UI/UX</div>
              <div className="marquee-item"><FaComments /> Smart Chatbots</div>
              <div className="marquee-item"><FaBullhorn /> Social Marketing</div>
              <div className="marquee-item"><FaVideo /> Video Editing</div>
              <div className="marquee-item"><FaCode /> App Reskin &amp; Setup</div>
              <div className="marquee-item"><FaBolt /> Fast Delivery</div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ══════ STATS ══════ */}
      <div className="stats-section">
        <motion.div className="stats-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {[{ num:'150',suffix:'+',label:'Projects Delivered'},{ num:'99',suffix:'%',label:'Client Satisfaction'},{ num:'10',suffix:'+',label:'AI Agents Deployed'},{ num:'5',suffix:'yrs',label:'Industry Experience'}].map((s,i) => (
            <motion.div key={i} className="stat-item" variants={fadeUp}>
              <div className="stat-number"><AnimatedCounter target={s.num} suffix={s.suffix} /></div>
              <p>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ══════ SERVICES ══════ */}
      <section id="services" className="section services-section">
        <div className="container">
          <div className="section-header">
            <motion.span className="section-tag" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><FaBolt /> What We Do</motion.span>
            <motion.h2 className="section-title" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}>Comprehensive <span className="text-gradient">Services</span></motion.h2>
            <motion.p className="section-desc" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.2}}>We craft complete digital ecosystems — from architecture to AI automation. Every pixel, every line of code, built with precision.</motion.p>
          </div>

          <motion.div className="services-grid" initial="hidden" whileInView="visible" viewport={{once:true,margin:'-50px'}} variants={stagger}>
            {services.map(s => (
              <motion.div key={s.id} className="service-card" variants={fadeUp}>
                <div className="service-card-glow" />
                <div className={`service-icon-wrapper ${s.color}`}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="service-arrow">Learn more <FaArrowRight size={12} /></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ PROCESS ══════ */}
      <section className="section process-section">
        <div className="container">
          <div className="section-header">
            <motion.span className="section-tag" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><FaCheckCircle /> How We Work</motion.span>
            <motion.h2 className="section-title" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}>Our <span className="text-gradient">Process</span></motion.h2>
          </div>
          <motion.div className="process-steps" initial="hidden" whileInView="visible" viewport={{once:true}} variants={stagger}>
            {processSteps.map(s => (
              <motion.div key={s.num} className="process-step" variants={fadeUp}>
                <div className="process-number">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ ABOUT ══════ */}
      <section id="about" className="section about-section">
        <div className="container">
          <div className="about-grid">
            {/* Visual / Skill bars side */}
            <motion.div initial={{opacity:0,x:-50}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}>
              <div className="about-main-panel">
                <div className="about-pattern" />
                <div className="about-orb about-orb-1" /><div className="about-orb about-orb-2" />
                <div className="about-inner-content">
                  <p className="about-panel-title">Our Expertise</p>
                  <div className="skill-bars-list">
                    {skillBars.map(s => <SkillBar key={s.label} label={s.label} pct={s.pct} />)}
                  </div>
                  <div className="about-feature-list" style={{marginTop:'2rem'}}>
                    {[
                      { icon:<FaShieldAlt />, title:'Enterprise-Grade Security', sub:'SSL, encryption & secure architecture' },
                      { icon:<FaBolt />,      title:'Lightning Performance',      sub:'99+ Lighthouse scores across all builds' },
                      { icon:<FaUsers />,     title:'Dedicated Team',             sub:'Cross-functional experts for every phase' },
                      { icon:<FaLightbulb />, title:'Innovation First',           sub:'Bleeding-edge tech to future-proof your product' },
                    ].map((f,i) => (
                      <div key={i} className="about-feature-item">
                        <div className="about-feature-icon">{f.icon}</div>
                        <div className="about-feature-text"><strong>{f.title}</strong><small>{f.sub}</small></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="about-float-stat stat-1"><strong>5★</strong><span>Avg Client Rating</span></div>
            </motion.div>

            {/* Content side */}
            <motion.div className="about-content" initial={{opacity:0,x:50}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}>
              <span className="section-tag"><FaUsers /> About Lupuzo</span>
              <h2 className="section-title" style={{textAlign:'left',marginBottom:'1.5rem'}}>Built for brands that<br /><span className="text-gradient">refuse to be ordinary.</span></h2>
              <p className="about-text">Lupuzo is an independent digital agency with offices in <strong style={{color:'white'}}>Saudi Arabia</strong> and <strong style={{color:'white'}}>Kashmir</strong>. We partner with ambitious startups and enterprises to engineer premium digital experiences.</p>
              <p className="about-text">From intelligent AI agents to cinematic video production — we deliver results that move the needle for your business.</p>
              <div className="about-highlights">
                {['Expert Full-Stack Team','On-Time Delivery','Post-Launch Support','Agile Methodology','NDA Protected','Global Clients'].map(h => (
                  <div key={h} className="highlight-item"><div className="highlight-dot" />{h}</div>
                ))}
              </div>
              <div style={{marginTop:'2.5rem',display:'flex',gap:'1rem',flexWrap:'wrap'}}>
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn-primary">Work With Us <FaArrowRight /></a>
                <a href="https://wa.me/917006505391" target="_blank" rel="noreferrer" className="btn-secondary"><FaWhatsapp /> WhatsApp Us</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ PORTFOLIO — AUTO-SCROLL CAROUSEL ══════ */}
      <section id="portfolio" className="section portfolio-section">
        <div className="container">
          <div className="section-header">
            <motion.span className="section-tag" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><FaRocket /> Our Work</motion.span>
            <motion.h2 className="section-title" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}>Projects We've <span className="text-gradient">Built</span></motion.h2>
            <motion.p className="section-desc" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.2}}>A glimpse into the digital products we've crafted for our clients.</motion.p>
          </div>
        </div>

        {/* Infinite scroll belt — no hover links, just showcase */}
        <div className="portfolio-carousel-outer">
          <div className="portfolio-carousel-fade-left" />
          <div className="portfolio-carousel-fade-right" />
          <div className="portfolio-carousel-track">
            {allCards.map((item, idx) => (
              <div className="portfolio-carousel-card" key={idx}>
                <div className="portfolio-carousel-img-wrap">
                  <img src={item.img} alt={item.title} className="portfolio-carousel-img" />
                  <div className="portfolio-carousel-cat">{item.cat}</div>
                </div>
                <div className="portfolio-carousel-info">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="portfolio-carousel-tags">
                    {item.tags.map(t => <span key={t} className="portfolio-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CLIENT SLIDESHOW (DYNAMIC) ══════ */}
      <ClientSlideshow />

      {/* ══════ TESTIMONIALS ══════ */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <motion.span className="section-tag" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><FaStar /> Client Love</motion.span>
            <motion.h2 className="section-title" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}>What clients <span className="text-gradient">say about us</span></motion.h2>
          </div>
          <motion.div className="testimonials-grid" initial="hidden" whileInView="visible" viewport={{once:true}} variants={stagger}>
            {testimonials.map((t,i) => (
              <motion.div key={i} className="testimonial-card" variants={fadeUp}>
                <div className="testimonial-stars">{[...Array(t.stars)].map((_,j) => <FaStar key={j} />)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className={`testimonial-avatar ${t.color}`}>{t.avatar}</div>
                  <div className="testimonial-info"><strong>{t.name}</strong><small>{t.role}</small></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="cta-section">
        <div className="container">
          <motion.div className="cta-inner" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
            <span className="section-tag" style={{marginBottom:'1.5rem'}}><FaRocket /> Ready to scale?</span>
            <h2 className="section-title">Let's build something<br /><span className="text-gradient">extraordinary together.</span></h2>
            <p className="section-desc" style={{marginBottom:'2.5rem'}}>Join 150+ businesses that trusted Lupuzo to craft their digital future.</p>
            <div className="cta-actions">
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn-primary" style={{fontSize:'1rem',padding:'1rem 2.5rem'}}>Start Your Project <FaArrowRight /></a>
              <a href="https://wa.me/917006505391" target="_blank" rel="noreferrer" className="btn-secondary" style={{fontSize:'1rem',padding:'1rem 2.5rem'}}><FaWhatsapp /> Chat on WhatsApp</a>
            </div>
            <div className="cta-trusted">
              <div className="cta-avatars">
                {['A','R','O','M'].map((a,i) => <div key={i} className="cta-avatar" style={{background:['#7c3aed','#06b6d4','#f59e0b','#ec4899'][i]}}>{a}</div>)}
              </div>
              Trusted by 150+ clients across Saudi Arabia, Kashmir &amp; beyond
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ CONTACT ══════ */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}}>
              <span className="section-tag" style={{marginBottom:'1.25rem'}}><FaEnvelope /> Get In Touch</span>
              <h2 className="contact-left-title">Start a<br /><span className="text-gradient">conversation.</span></h2>
              <p className="contact-left-desc">Ready to transform your digital presence? Drop us a message and we'll get back to you within 24 hours.</p>
              <div className="contact-info-cards">
                {[
                  { href:'#', icon:<FaMapMarkerAlt />, cls:'', title:'Our Offices', sub:'Saudi Arabia & Kashmir, India' },
                  { href:'https://wa.me/917006505391', icon:<FaWhatsapp />, cls:'green', title:'WhatsApp', sub:'+91 7006505391' },
                  { href:'mailto:hello@lupuzo.com', icon:<FaEnvelope />, cls:'', title:'Email', sub:'hello@lupuzo.com' },
                  { href:'tel:+917006505391', icon:<FaPhoneAlt />, cls:'', title:'Phone', sub:'+91 7006505391' },
                ].map((c,i) => (
                  <a key={i} href={c.href} target={c.href.startsWith('http')?'_blank':undefined} rel="noreferrer" className="contact-info-card">
                    <div className={`contact-icon ${c.cls}`}>{c.icon}</div>
                    <div className="contact-details"><h4>{c.title}</h4><p>{c.sub}</p></div>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div className="contact-form-panel" initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}}>
              <h3>Send us a message</h3>
              <p>We'll get back to you within 24 hours.</p>
              {formStatus === 'sent' ? (
                <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} style={{textAlign:'center',padding:'3rem 1rem'}}>
                  <div style={{fontSize:'3rem',marginBottom:'1rem'}}>🎉</div>
                  <h3 style={{marginBottom:'0.75rem'}}>Message Sent!</h3>
                  <p style={{color:'var(--text-secondary)',marginBottom:'1.5rem'}}>We'll be in touch within 24 hours.</p>
                  <button className="btn-secondary" onClick={() => setFormStatus('idle')}>Send Another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <div className="form-group"><label className="form-label">Your Name</label><input type="text" className="form-input" placeholder="John Doe" required /></div>
                    <div className="form-group"><label className="form-label">Email Address</label><input type="email" className="form-input" placeholder="hello@email.com" required /></div>
                    <div className="form-group"><label className="form-label">Phone / WhatsApp</label><input type="tel" className="form-input" placeholder="+91 XXXXX XXXXX" /></div>
                    <div className="form-group">
                      <label className="form-label">Service Needed</label>
                      <select className="form-input" defaultValue="">
                        <option value="" disabled>Select a service</option>
                        {['Website Development','Mobile App','AI Agent / Chatbot','App Reskin & Setup','Social Media Marketing','Logo & Branding','Video Editing','Other'].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div className="form-group full"><label className="form-label">Tell us about your project</label><textarea className="form-input" placeholder="Describe your project, goals, and timeline..." required /></div>
                  </div>
                  <div className="form-submit">
                    <button type="submit" className="btn-primary" disabled={formStatus==='sending'}>
                      {formStatus==='sending' ? 'Sending…' : <><FaRocket /> Send Message</>}
                    </button>
                  </div>
                  <p className="form-note"><FaShieldAlt /> Your information is 100% secure and never shared.</p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#home" className="logo-container" style={{marginBottom:'1rem',display:'inline-flex'}}>
                <img src={logoImg} alt="Lupuzo" style={{width:36,height:36,borderRadius:8,objectFit:'cover'}} />
                <span className="logo-text" style={{fontSize:'1.25rem'}}>LUPUZO<span className="dot">.</span></span>
              </a>
              <p>A specialized digital agency building premium websites, apps, AI systems &amp; brands. Saudi Arabia &amp; Kashmir.</p>
              <div className="footer-social-links">
                {[{icon:<FaWhatsapp />,href:'https://wa.me/917006505391'},{icon:<FaInstagram />,href:'#'},{icon:<FaLinkedin />,href:'#'},{icon:<FaTelegramPlane />,href:'#'}].map((s,i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer" className="footer-social">{s.icon}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="footer-col-title">Services</h4>
              <ul className="footer-links">
                {['Web Development','Mobile Apps','App Reskin & Setup','AI Agents','Social Marketing','Video Editing'].map(s => <li key={s}><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="footer-link">{s}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="footer-col-title">Company</h4>
              <ul className="footer-links">
                {['About Us','Our Work','Testimonials','Saudi Arabia Office','Kashmir Office','Contact'].map(s => <li key={s}><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="footer-link">{s}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="footer-col-title">Standards</h4>
              {[<><FaShieldAlt /> Enterprise-Grade Security</>,<><FaBolt /> 99%+ Performance Score</>,<><FaRocket /> On-Time Delivery</>,<><FaStar /> 5-Star Client Rated</>].map((b,i) => (
                <div key={i} className="footer-badge">{b}</div>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Lupuzo. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Privacy Policy</a>
              <a href="#" className="footer-bottom-link">Terms of Service</a>
              <a href="#contact" className="footer-bottom-link">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
