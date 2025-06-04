// apps/web/app/page.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// --- Helper: Countdown Timer Component ---
const CountdownTimer = ({ launchDate }: { launchDate: Date }) => {
  const calculateTimeLeft = () => {
    const difference = +launchDate - +new Date();
    let timeLeft: { days?: number; hours?: number; minutes?: number; seconds?: number } = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

const timerComponents: React.ReactElement[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft] && timeLeft[interval as keyof typeof timeLeft] !==0) { // Allow 0 to show
      return;
    }
    timerComponents.push(
      <div key={interval} className="countdown-item">
        <span className="countdown-value">{timeLeft[interval as keyof typeof timeLeft]?.toString().padStart(2, '0')}</span>
        <span className="countdown-label">{interval.charAt(0).toUpperCase() + interval.slice(1)}</span>
      </div>
    );
  });

  return (
    <div className="countdown-timer d-flex justify-content-center align-items-center gap-3 my-4">
      {timerComponents.length ? timerComponents : <span className="fw-bold fs-5">Nous sommes lancés !</span>}
    </div>
  );
};

// --- Main Page Component ---
export default function HomePage() {
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 21); // 3 weeks from now

  const whyPlatformDevJobsItems = [
    {
      icon: "🎯", // Consider using SVG icons or an icon library like react-icons
      title: "Niche Ultra-Ciblée",
      desc: "Exclusivement pour les développeurs et experts des plateformes d'entreprise: Salesforce, SAP, HubSpot, Workday, et plus.",
    },
    {
      icon: "🧠",
      title: "Matching IA Avancé",
      desc: "Notre IA (Gemini + LangChain) analyse en profondeur profils et offres pour des connexions pertinentes.",
    },
    {
      icon: "📱",
      title: "Expérience Fluide",
      desc: "Une UX optimisée pour recruteurs et candidats, accessible sur mobile et desktop, pour une efficacité maximale.",
    },
  ];

  const recruiterFeatures = [
    "Créez votre espace recruteur en moins d'une minute.",
    "Publiez vos offres d'emploi via un processus simple et sécurisé (Stripe).",
    "Recevez instantanément des candidatures qualifiées et compatibles.",
    "Boostez la visibilité de vos annonces grâce à nos outils IA.",
    "Accédez à un tableau de bord intuitif pour gérer vos recrutements.",
  ];

  const candidateFeatures = [
    "Explorez des offres exclusives par technologie, localisation ou type de contrat.",
    "Filtrez et triez les opportunités en temps réel selon vos critères.",
    "Téléversez votre CV et créez un profil attractif en quelques clics.",
    "Bénéficiez d'un score de compatibilité IA pour chaque offre.",
    "Postulez facilement et suivez l'avancement de vos candidatures.",
  ];

  return (
    <main className="page-container bg-white text-dark" style={{ fontFamily: "var(--font-geist-sans)" }}>
    {/* Navbar – Enhanced for Landing Page */}
<nav className="navbar navbar-expand-lg bg-white sticky-top shadow-sm py-3">
  <div className="container">
    {/* Brand */}
    <Link href="/" className="navbar-brand fw-bold fs-4 gradient-text">
      Platform<span className="text-primary">Dev</span>Jobs
    </Link>

    {/* Toggle button for mobile */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarLanding"
      aria-controls="navbarLanding"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Navbar links */}
    <div className="collapse navbar-collapse justify-content-end" id="navbarLanding">
      <ul className="navbar-nav align-items-center gap-2">
        <li className="nav-item">
          <Link href="/dashboard" className="nav-link text-dark fw-medium">
            🎯 Espace Recruteur
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/signup">
            <button className="btn btn-primary-custom px-4 py-2">
              🚀 Lancer votre carrière
            </button>
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>


      {/* Hero Section */}
      <section className="hero-section container py-5 text-center">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <h1 className="display-2 fw-bolder gradient-text mb-3">
              Recrutez ou Postulez :<br /> L'IA au Service des Experts Plateformes.
            </h1>
            <p className="lead text-muted mb-4 fs-5">
              La première plateforme d'emploi spécialisée pour les développeurs et consultants Salesforce, SAP, HubSpot, Workday et autres ESN. Trouvez votre prochain défi ou le talent idéal.
            </p>
            
            <div className="launch-countdown-container p-4 rounded-3 bg-light-accent mb-4 shadow-sm">
                <h3 className="fw-semibold mb-2">Lancement imminent !</h3>
                <p className="text-muted small mb-3">Rejoignez-nous dès le premier jour pour découvrir les meilleures opportunités.</p>
                <CountdownTimer launchDate={launchDate} />
            </div>

            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link href="/login">
                <button className="btn btn-dark btn-lg px-4 py-3">🎯 Accès Recruteur</button>
              </Link>
              <Link href="/signup">
                <button className="btn btn-outline-secondary-custom btn-lg px-4 py-3">👤 Créer Mon Profil Candidat</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
{/* Trusted By - Social Proof */}
<section className="py-5 bg-light">
  <div className="container text-center">
    <h6 className="text-muted text-uppercase fw-bold mb-4">
      🚀 Déjà utilisé par des entreprises visionnaires
    </h6>
    <div className="row justify-content-center g-4">
      <div className="col-6 col-md-3 col-lg-2">
        <div className="d-flex flex-column align-items-center">
          <i className="bi bi-building fs-2 text-primary mb-2"></i>
          <span className="text-muted small">LogoPartenaire1</span>
        </div>
      </div>
      <div className="col-6 col-md-3 col-lg-2">
        <div className="d-flex flex-column align-items-center">
          <i className="bi bi-code-slash fs-2 text-success mb-2"></i>
          <span className="text-muted small">TechSolutions Inc.</span>
        </div>
      </div>
      <div className="col-6 col-md-3 col-lg-2">
        <div className="d-flex flex-column align-items-center">
          <i className="bi bi-cloud-check fs-2 text-info mb-2"></i>
          <span className="text-muted small">Innovate Hub</span>
        </div>
      </div>
      <div className="col-6 col-md-3 col-lg-2">
        <div className="d-flex flex-column align-items-center">
          <i className="bi bi-terminal fs-2 text-warning mb-2"></i>
          <span className="text-muted small">DevCorp Studio</span>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Why PlatformDevJobs - Enhanced */}
      <section className="py-5 section-angled bg-white">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 display-6">✨ Pourquoi choisir <span className="gradient-text">PlatformDevJobs</span> ?</h2>
          <div className="row g-4 justify-content-center">
            {whyPlatformDevJobsItems.map((item, i) => (
              <div className="col-md-6 col-lg-4 d-flex" key={i}>
                <div className="card p-4 shadow-sm h-100 feature-card">
                  <div className="feature-icon display-4 mb-3">{item.icon}</div>
                  <h5 className="fw-bold mb-2">{item.title}</h5>
                  <p className="text-muted mb-0 small">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* How It Works */}
<section className="py-5 bg-light position-relative overflow-hidden">
  <div className="container">
    <h2 className="text-center fw-bold mb-5 display-6 text-dark">
      🚀 Comment ça marche ?
    </h2>

    <div className="row g-4">
      {/* Recruteurs */}
      <div className="col-md-6">
        <div className="p-4 bg-white rounded-4 shadow-sm h-100 border-start border-4 border-primary">
          <h3 className="fw-semibold mb-4 text-primary">
            <i className="bi bi-briefcase-fill me-2"></i> Pour les Recruteurs
          </h3>
          <ol className="ps-3 mb-0">
            <li className="mb-3">
              <strong>Inscription Rapide :</strong> Créez votre compte en quelques clics.
            </li>
            <li className="mb-3">
              <strong>Publication d'Offres :</strong> Détaillez vos besoins pour attirer les meilleurs profils.
            </li>
            <li className="mb-3">
              <strong>Matching IA :</strong> Recevez automatiquement des suggestions de candidats pertinents.
            </li>
            <li>
              <strong>Connexion Directe :</strong> Discutez avec les talents qui vous intéressent.
            </li>
          </ol>
        </div>
      </div>

      {/* Candidats */}
      <div className="col-md-6">
        <div className="p-4 bg-white rounded-4 shadow-sm h-100 border-start border-4 border-success">
          <h3 className="fw-semibold mb-4 text-success">
            <i className="bi bi-person-fill me-2"></i> Pour les Candidats
          </h3>
          <ol className="ps-3 mb-0">
            <li className="mb-3">
              <strong>Profil Optimisé :</strong> Mettez en avant vos compétences clés.
            </li>
            <li className="mb-3">
              <strong>Découverte d'Offres :</strong> Explorez des missions ciblées selon vos technologies préférées.
            </li>
            <li className="mb-3">
              <strong>Analyse IA :</strong> Recevez un score de compatibilité avec chaque offre.
            </li>
            <li>
              <strong>Postulez en Confiance :</strong> Engagez la discussion avec des recruteurs sérieux.
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Enhanced Features Section */}
<section className="py-6 bg-white">
  <div className="container">
    <div className="text-center mb-5">
      <h2 className="fw-bold display-5 mb-3">Fonctionnalités Clés</h2>
      <p className="lead text-muted mx-auto" style={{maxWidth: "700px"}}>
        Découvrez comment PlatformDevJobs révolutionne le recrutement pour les deux côtés du marché
      </p>
    </div>

    <div className="row g-4 justify-content-center">
      {/* Recruiter Benefits Card */}
      <div className="col-md-6 col-lg-5">
        <div className="card h-100 border-0 shadow-sm hover-shadow-lg transition-all">
          <div className="card-body p-4 d-flex flex-column">
            <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-3 mb-4" style={{width: "fit-content"}}>
              <i className="bi bi-building fs-2"></i>
            </div>
            <h3 className="fw-bold mb-4">Pour les Recruteurs</h3>
            
            <ul className="list-unstyled mb-4">
              {[
                "Publiez des offres en 5 minutes chrono",
                "Recevez des candidats pré-qualifiés par notre IA",
                "Tableau de bord analytique en temps réel",
                "Outils de collaboration pour votre équipe RH",
                "Intégration facile avec vos outils existants"
              ].map((feature, i) => (
                <li key={i} className="mb-3 d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success mt-1 me-3"></i>
                  <span className="text-muted">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link href="/dashboard" className="mt-auto">
              <button className="btn btn-dark w-100 py-3 d-flex align-items-center justify-content-center">
                <i className="bi bi-rocket-takeoff me-2"></i> Démarrer maintenant
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Candidate Benefits Card */}
      <div className="col-md-6 col-lg-5">
        <div className="card h-100 border-0 shadow-sm hover-shadow-lg transition-all">
          <div className="card-body p-4 d-flex flex-column">
            <div className="bg-info bg-opacity-10 text-info p-3 rounded-3 mb-4" style={{width: "fit-content"}}>
              <i className="bi bi-person-badge fs-2"></i>
            </div>
            <h3 className="fw-bold mb-4">Pour les Candidats</h3>
            
            <ul className="list-unstyled mb-4">
              {[
                "Profil intelligent avec suggestions d'amélioration",
                "Matching précis avec les offres pertinentes",
                "Alertes personnalisées pour nouvelles opportunités",
                "Score de compatibilité visible pour chaque offre",
                "Processus de candidature en 1 clic"
              ].map((feature, i) => (
                <li key={i} className="mb-3 d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success mt-1 me-3"></i>
                  <span className="text-muted">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link href="/signup" className="mt-auto">
              <button className="btn btn-primary w-100 py-3 d-flex align-items-center justify-content-center">
                <i className="bi bi-person-plus me-2"></i> Créer mon profil
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* Trust Badges */}
    <div className="text-center mt-5 pt-4">
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
        <div className="d-flex align-items-center">
          <i className="bi bi-shield-check text-success fs-4 me-2"></i>
          <span className="text-muted">Données 100% sécurisées</span>
        </div>
        <div className="d-flex align-items-center">
          <i className="bi bi-lightning-charge text-warning fs-4 me-2"></i>
          <span className="text-muted">Mise en relation ultra-rapide</span>
        </div>
        <div className="d-flex align-items-center">
          <i className="bi bi-graph-up-arrow text-primary fs-4 me-2"></i>
          <span className="text-muted">+85% de satisfaction</span>
        </div>
      </div>
    </div>
  </div>
</section>
      
     {/* Enhanced AI Spotlight Section */}
<section className="py-6 bg-dark text-white position-relative overflow-hidden">
  {/* Decorative elements */}
  <div className="position-absolute top-0 end-0 w-50 h-100 opacity-10" style={{
    background: 'radial-gradient(circle, rgba(58,123,213,0.8) 0%, transparent 70%)'
  }}></div>
  
  <div className="container position-relative">
    <div className="row align-items-center g-5">
      <div className="col-lg-6">
        <div className="pe-lg-4">
          <span className="badge bg-primary bg-opacity-25 text-primary mb-3 px-3 py-2 rounded-pill">
            <i className="bi bi-stars me-2"></i>Technologie Exclusive
          </span>
          
          <h2 className="fw-bold display-4 mb-4">
            <span className="text-primary">L'IA Avancée</span> <br />au Service de Votre Recrutement
          </h2>
          
          <p className="lead text-white-75 mb-4">
            Notre système de matching intelligent, alimenté par Gemini et LangChain, analyse le contexte profond des compétences et besoins pour des recommandations d'une précision inégalée.
          </p>
          
          <div className="d-flex flex-column gap-3 mb-5">
            <div className="d-flex align-items-start">
              <div className="bg-primary bg-opacity-10 text-primary p-2 rounded me-3">
                <i className="bi bi-cpu-fill fs-4"></i>
              </div>
              <div>
                <h5 className="fw-bold mb-1">Analyse Sémantique Profonde</h5>
                <p className="text-white-75 mb-0">Compréhension contextuelle des compétences techniques et soft skills.</p>
              </div>
            </div>
            
            <div className="d-flex align-items-start">
              <div className="bg-primary bg-opacity-10 text-primary p-2 rounded me-3">
                <i className="bi bi-graph-up-arrow fs-4"></i>
              </div>
              <div>
                <h5 className="fw-bold mb-1">Apprentissage Continu</h5>
                <p className="text-white-75 mb-0">Le système s'améliore avec chaque interaction pour des résultats toujours plus précis.</p>
              </div>
            </div>
            
            <div className="d-flex align-items-start">
              <div className="bg-primary bg-opacity-10 text-primary p-2 rounded me-3">
                <i className="bi bi-shield-check fs-4"></i>
              </div>
              <div>
                <h5 className="fw-bold mb-1">Sécurité des Données</h5>
                <p className="text-white-75 mb-0">Protection maximale de vos informations avec chiffrement de bout en bout.</p>
              </div>
            </div>
          </div>
          
      
        </div>
      </div>
      
      <div className="col-lg-6">
        <div className="position-relative">
          {/* Animated gradient border */}
          <div className="position-absolute top-0 start-0 w-100 h-100 rounded-4" style={{
            background: 'linear-gradient(45deg, rgba(58,123,213,0.5) 0%, rgba(0,210,255,0.3) 100%)',
            zIndex: 0,
            transform: 'rotate(2deg)'
          }}></div>
          
          {/* AI Illustration */}
          <img 
            src="https://media.istockphoto.com/id/1454952504/fr/vectoriel/chatbot-service-client-concept-abstrait-illustration-vectorielle.jpg?s=612x612&w=0&k=20&c=Im5xuortN2eT9HMzOAPwVQrYoAlimhpVMK9AbJJWxI4=" 
            alt="Technologie IA PlatformDevJobs" 
            className="img-fluid position-relative rounded-4 shadow-lg" 
            style={{zIndex: 1}}
          />
          
          {/* Stats badge */}
          <div className="position-absolute bottom-0 start-0 translate-middle-y bg-white text-dark p-3 rounded-3 shadow-sm" style={{zIndex: 2}}>
            <div className="text-center">
              <div className="fs-2 fw-bold text-primary">95%</div>
              <div className="small">Précision de matching</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Enhanced Testimonials Section */}
<section className="py-5 bg-light-accent">
  <div className="container">
    <div className="text-center mb-5">
      <h2 className="fw-bold display-5 mb-3">Témoignages</h2>
      <p className="lead text-muted">Découvrez ce que nos utilisateurs disent de notre plateforme</p>
    </div>

    <div className="row g-4">
      {[
        {
          quote: "PlatformDevJobs a révolutionné notre recrutement de consultants Salesforce. Nous avons réduit notre temps d'embauche de 60% tout en améliorant la qualité des candidats.",
          name: "Élodie Marchand",
          position: "Directrice RH",
          company: "TechSolutions France",
          avatar: "EM",
          rating: 5
        },
        {
          quote: "En tant que développeur Workday, j'ai trouvé trois opportunités pertinentes en une semaine là où je cherchais depuis des mois sur les plateformes généralistes.",
          name: "Thomas Dubois",
          position: "Développeur Senior",
          company: "Workday Experts",
          avatar: "TD",
          rating: 4
        },
        {
          quote: "Le matching IA est exceptionnellement précis. Nous avons embauché 4 consultants SAP via PlatformDevJobs et tous étaient parfaitement adaptés à nos besoins.",
          name: "Sophie Laurent",
          position: "Responsable Talent",
          company: "SAP Partners Europe",
          avatar: "SL",
          rating: 5
        }
      ].map((testimonial, i) => (
        <div className="col-md-4" key={i}>
          <div className="card h-100 p-4 shadow-sm border-0 rounded-3">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '48px', height: '48px'}}>
                <span className="fw-bold">{testimonial.avatar}</span>
              </div>
              <div className="ms-3">
                <p className="fw-bold mb-0">{testimonial.name}</p>
                <small className="text-muted">{testimonial.position}, {testimonial.company}</small>
              </div>
            </div>
            <p className="text-muted fst-italic mb-4">"{testimonial.quote}"</p>
            <div className="mt-auto">
              <div className="d-flex">
                {[...Array(5)].map((_, star) => (
                  <i 
                    key={star} 
                    className={`bi ${star < testimonial.rating ? 'bi-star-fill text-warning' : 'bi-star text-muted'} me-1`}
                  ></i>
                ))}
              </div>
              <div className="text-end mt-2">
                <i className="bi bi-quote fs-4 text-primary opacity-25"></i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Trust indicators */}
    <div className="text-center mt-5 pt-3">
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
        <div className="d-flex align-items-center">
          <i className="bi bi-check-circle-fill text-success fs-4 me-2"></i>
          <span className="text-muted">+50 entreprises partenaires</span>
        </div>
        <div className="d-flex align-items-center">
          <i className="bi bi-people-fill text-primary fs-4 me-2"></i>
          <span className="text-muted">+500 candidats placés</span>
        </div>
        <div className="d-flex align-items-center">
          <i className="bi bi-award-fill text-warning fs-4 me-2"></i>
          <span className="text-muted">95% de satisfaction</span>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Enhanced FAQ Section */}
{/* FAQ Section */}
<section className="py-5 bg-white">
  <div className="container">
    <h2 className="text-center fw-bold mb-5 display-6">Questions Fréquentes</h2>
    <div className="accordion" id="faqAccordion">
      {[
        { 
          q: "Comment fonctionne le matching IA ?", 
          a: "Notre IA analyse les compétences, l'expérience et les exigences des offres et des profils pour identifier les meilleures correspondances, allant au-delà des simples mots-clés grâce à des modèles de langage avancés.",
          icon: "bi-robot"
        },
        { 
          q: "Quels types de postes sont disponibles ?", 
          a: "Nous nous concentrons sur les rôles de développeurs, consultants, architectes et administrateurs pour les plateformes d'entreprise majeures comme Salesforce, SAP, HubSpot, Workday, etc.",
          icon: "bi-briefcase"
        },
        { 
          q: "La création de compte est-elle gratuite pour les candidats ?", 
          a: "Oui, la création de profil et la postulation aux offres sont entièrement gratuites pour les candidats.",
          icon: "bi-person-check"
        },
        { 
          q: "Comment sont gérées mes données personnelles ?", 
          a: "Nous respectons scrupuleusement le RGPD. Vos données sont sécurisées et utilisées uniquement dans le cadre de la mise en relation avec des opportunités d'emploi. Consultez notre politique de confidentialité pour plus de détails.",
          icon: "bi-shield-lock"
        }
      ].map((faq, i) => (
        <div className="accordion-item border-0 mb-3 shadow-sm rounded-3 overflow-hidden" key={i}>
          <h2 className="accordion-header" id={`faqHeading${i}`}>
            <button 
              className="accordion-button collapsed fw-semibold py-3 px-4 bg-light" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target={`#faqCollapse${i}`}
              aria-expanded="false" 
              aria-controls={`faqCollapse${i}`}
            >
              <i className={`bi ${faq.icon} me-3 text-primary`}></i>
              {faq.q}
            </button>
          </h2>
          <div 
            id={`faqCollapse${i}`} 
            className="accordion-collapse collapse" 
            aria-labelledby={`faqHeading${i}`} 
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body px-4 py-3 bg-white">
              <p className="mb-0 text-muted">{faq.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Load Bootstrap JS directly */}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" async />
  </div>
</section>

      {/* Final CTA */}
     {/* Final CTA - Bootstrap Only */}
<section className="py-5 bg-primary bg-gradient position-relative overflow-hidden">
  <div className="container position-relative py-5">
    <div className="row justify-content-center">
      <div className="col-lg-10 text-center">
        <h2 className="fw-bold display-4 mb-4 text-white">
          Prêt à Transformer Votre Carrière ou Votre Recrutement ?
        </h2>
        
        <p className="lead fs-3 mb-5 text-white-75 mx-auto" style={{ maxWidth: '800px' }}>
          Rejoignez <span className="fw-bold text-white">PlatformDevJobs</span> aujourd'hui et découvrez la puissance de l'IA pour vos ambitions professionnelles.
        </p>
        
        <div className="d-flex justify-content-center gap-4 flex-wrap mb-5">
          <Link href="/dashboard">
            <button className="btn btn-light btn-lg px-5 py-3 fw-bold shadow hover-zoom">
              <span className="d-flex align-items-center justify-content-center gap-2">
                <i className="bi bi-briefcase-fill"></i> Je Recrute
              </span>
            </button>
          </Link>
          
          <Link href="/signup">
            <button className="btn btn-outline-light btn-lg px-5 py-3 fw-bold shadow hover-zoom border-2">
              <span className="d-flex align-items-center justify-content-center gap-2">
                <i className="bi bi-person-plus-fill"></i> Je Cherche un Poste
              </span>
            </button>
          </Link>
        </div>
        
        <div className="text-white-50 small">
          <i className="bi bi-shield-lock-fill me-2"></i> Plateforme 100% sécurisée • Sans engagement
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Footer */}
     <footer className="bg-dark text-white pt-5 pb-4">
  <div className="container">
    <div className="row g-4">
      {/* Branding Column */}
      <div className="col-12 col-lg-4 mb-40">
        <div className="d-flex flex-column h-100">
          <Link href="/" className="navbar-brand mb-3">
            <span className="fs-2 fw-bold text-white d-block">
              Platform<span className="text-primary">Dev</span>Jobs
            </span>
          </Link>
          <p className="text-white-50 mb-4 pe-lg-5 pe-0">
            La plateforme premium de recrutement spécialisée pour les développeurs et consultants Salesforce, SAP, HubSpot, Workday et autres plateformes d'entreprise.
          </p>
          <div className="mt-auto">
            <div className="d-flex gap-3">
              <a href="#" className="btn btn-outline-light btn-sm rounded-circle p-2">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
              <a href="#" className="btn btn-outline-light btn-sm rounded-circle p-2">
                <i className="bi bi-twitter-x fs-5"></i>
              </a>
              <a href="#" className="btn btn-outline-light btn-sm rounded-circle p-2">
                <i className="bi bi-facebook fs-5"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Columns */}
      <div className="col-6 col-md-4 col-lg-2">
        <h5 className="text-uppercase fw-bold mb-4 text-primary">Entreprise</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link href="/a-propos" className="nav-link p-0 text-white-50 hover-text-white">
              À Propos
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link href="/carrieres" className="nav-link p-0 text-white-50 hover-text-white">
              Carrières
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link href="/blog" className="nav-link p-0 text-white-50 hover-text-white">
              Blog
            </Link>
          </li>
        </ul>
      </div>

      <div className="col-6 col-md-4 col-lg-2">
        <h5 className="text-uppercase fw-bold mb-4 text-primary">Ressources</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link href="/contact" className="nav-link p-0 text-white-50 hover-text-white">
              Contact
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link href="/faq" className="nav-link p-0 text-white-50 hover-text-white">
              FAQ
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link href="/guides" className="nav-link p-0 text-white-50 hover-text-white">
              Guides
            </Link>
          </li>
        </ul>
      </div>

      <div className="col-md-4 col-lg-2">
        <h5 className="text-uppercase fw-bold mb-4 text-primary">Légal</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link href="/confidentialite" className="nav-link p-0 text-white-50 hover-text-white">
              Confidentialité
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link href="/cgu" className="nav-link p-0 text-white-50 hover-text-white">
              CGU
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link href="/cookies" className="nav-link p-0 text-white-50 hover-text-white">
              Cookies
            </Link>
          </li>
        </ul>
      </div>

      <div className="col-md-4 col-lg-2">
        <h5 className="text-uppercase fw-bold mb-4 text-primary">Solutions</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link href="/recruteurs" className="nav-link p-0 text-white-50 hover-text-white">
              Pour recruteurs
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link href="/candidats" className="nav-link p-0 text-white-50 hover-text-white">
              Pour candidats
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link href="/entreprises" className="nav-link p-0 text-white-50 hover-text-white">
              Pour entreprises
            </Link>
          </li>
        </ul>
      </div>
    </div>

    {/* Divider */}
    <hr className="my-4 border-secondary" />

    {/* Bottom Row */}
    <div className="row align-items-center">
      <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
        <small className="text-white-50">
          © {new Date().getFullYear()} PlatformDevJobs. Tous droits réservés.
        </small>
      </div>
      <div className="col-md-6 text-center text-md-end">
        <div className="d-flex justify-content-center justify-content-md-end gap-3">
          <small className="text-white-50">
            <Link href="/confidentialite" className="text-white-50 text-decoration-none">
              Confidentialité
            </Link>
          </small>
          <small className="text-white-50">
            <Link href="/cgu" className="text-white-50 text-decoration-none">
              CGU
            </Link>
          </small>
          <small className="text-white-50">
            <Link href="/cookies" className="text-white-50 text-decoration-none">
              Cookies
            </Link>
          </small>
        </div>
      </div>
    </div>
  </div>
</footer>
    </main>
  );
}