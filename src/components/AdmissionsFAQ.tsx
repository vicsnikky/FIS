import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Search, 
  MapPin, 
  Globe, 
  GraduationCap, 
  CheckCircle2, 
  FileText, 
  Phone, 
  MessageSquare, 
  ExternalLink,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export interface FAQItem {
  id: string;
  category: 'nigeria' | 'canada' | 'general';
  question: string;
  shortAnswer: string;
  detailedContent?: {
    steps?: string[];
    documents?: string[];
    notes?: string[];
  };
  highlight?: string;
}

const FAQ_DATA: FAQItem[] = [
  // NIGERIA CAMPUS
  {
    id: 'ng-levels',
    category: 'nigeria',
    question: 'What classes and age groups are offered at the Nigeria Campus?',
    shortAnswer: 'Our Nigeria campus provides comprehensive, continuous education spanning Creche & Daycare (3 months - 2 years), Kindergarten/Nursery (3 - 5 years), Primary School (Grades 1 - 6), and Secondary School (Junior JSS1-3 and Senior SSS1-3).',
    detailedContent: {
      notes: [
        'Creche & Early Years: Focuses on sensory development, motor skills, and interactive foundational learning.',
        'Primary Education: Blends the Nigerian National Curriculum with Cambridge primary standards for literacy, numeracy, and STEM.',
        'Secondary Education: Prepares students for WAEC, NECO, JAMB, as well as Cambridge IGCSE for international readiness.'
      ]
    },
    highlight: 'Ages 3 months to 18 years'
  },
  {
    id: 'ng-process',
    category: 'nigeria',
    question: 'What is the step-by-step admission process for the Nigeria Campus?',
    shortAnswer: 'Enrollment follows a straightforward 4-stage process designed to assess learning needs and warmly integrate every child.',
    detailedContent: {
      steps: [
        'Step 1 - Application: Obtain and complete the admission form online or directly at our Agbado, Ogun State campus administrative office.',
        'Step 2 - Diagnostic Assessment: Prospective pupils/students sit for a friendly diagnostic test (English, Mathematics & General Ability) to gauge placement.',
        'Step 3 - Interview & Offer: Brief interactive session with the parents and child, followed by the formal Offer of Admission letter and fee schedule.',
        'Step 4 - Registration & Uniforms: Tuition payment confirmation, submission of medical/academic files, collection of school uniforms, books, and orientation.'
      ]
    },
    highlight: '4-step fast enrollment'
  },
  {
    id: 'ng-documents',
    category: 'nigeria',
    question: 'What documents are required to register a student in Nigeria?',
    shortAnswer: 'Parents need to provide standard identification, health, and previous school records during the final registration phase.',
    detailedContent: {
      documents: [
        'Original birth certificate (with photocopy) or valid international passport',
        'Last two terms of academic report sheets from previous school (for primary and secondary transfer applicants)',
        'Transfer certificate / letter of recommendation from former school principal or headteacher',
        'Medical fitness report and immunization/vaccination records',
        'Four recent passport-sized photographs of the child',
        'Passport photograph and valid ID of parent or legal guardian'
      ]
    }
  },
  {
    id: 'ng-sessions',
    category: 'nigeria',
    question: 'When do admissions open, and can students transfer mid-session?',
    shortAnswer: 'Major admissions open in June through September for the First Term (Autumn start). However, transfer admissions are accepted at the beginning of the Second Term (January) and Third Term (April), subject to space availability.',
    detailedContent: {
      notes: [
        'Early bird registration begins in May with special uniform and book pack incentives.',
        'Examination classes (JSS3 and SSS3) have special transfer evaluation requirements due to external exam registrations.'
      ]
    }
  },
  {
    id: 'ng-curriculum',
    category: 'nigeria',
    question: 'How does FIS blend local curriculum with international standards?',
    shortAnswer: 'We deliver a hybrid dual-curriculum model. While students thoroughly cover the Nigerian NERDC curriculum to guarantee distinctions in WAEC and NECO, our syllabus integrates British Cambridge benchmarks, digital literacy, coding, and robotics from the primary grades.',
    detailedContent: {
      notes: [
        'Students gain strong cultural identity and local academic competitiveness.',
        'International standard examinations build seamless transitions for higher studies abroad.'
      ]
    }
  },
  {
    id: 'ng-fees',
    category: 'nigeria',
    question: 'Can school fees be paid in flexible installments?',
    shortAnswer: 'Yes. We understand family budgeting and offer structured termly installment plans upon discussion with our Bursary Department. Full payments at the start of the session also qualify for prompt payment discounts.',
    detailedContent: {
      notes: [
        'Tuition invoices can be split into up to 2–3 tranches per term upon approval.',
        'All official fee payments are made strictly via designated corporate bank accounts with receipts issued.'
      ]
    }
  },

  // CANADA PATHWAYS
  {
    id: 'ca-overview',
    category: 'canada',
    question: 'How does the Fenster International School Canada Pathway program work?',
    shortAnswer: 'Our dedicated Canada office in Edmonton, Alberta, alongside our academic team, facilitates structured academic placement, study permits, post-secondary transfers, and holistic settlement counseling for students and families aspiring to study, live, and work in Canada.',
    detailedContent: {
      steps: [
        'Step 1 - Profile Assessment & Program Selection: Tailoring choices according to academic background, career goals, and budget across designated Canadian colleges and universities.',
        'Step 2 - Application & Letter of Acceptance (LOA): Securing official admission and Provincial Attestation Letters (PAL) required under current Canadian regulations.',
        'Step 3 - Study Permit & Visa Documentation: Professional guidance on proof of funds, statement of purpose (SOP), biometrics, and immigration filing.',
        'Step 4 - Pre-Departure & Edmonton Support: Flight prep, homestay or campus housing arrangements, airport reception, and student mentorship upon arrival.'
      ]
    },
    highlight: 'Edmonton Office Support'
  },
  {
    id: 'ca-eligibility',
    category: 'canada',
    question: 'Who is eligible to apply for the Canada programs?',
    shortAnswer: 'Eligibility spans secondary school graduates, current university/polytechnic students seeking credit transfers, and adult learners/professionals seeking postgraduate diplomas or Master’s degrees in Canada.',
    detailedContent: {
      documents: [
        'Secondary graduates: WAEC/NECO/IGCSE results with minimum credit passes in relevant subjects',
        'Undergraduates & postgraduates: Degree/Diploma certificates and official academic transcripts',
        'Valid International Passport with at least 18 months validity remaining',
        'Proof of financial capability (tuition + cost of living as designated by IRCC)'
      ]
    }
  },
  {
    id: 'ca-ielts',
    category: 'canada',
    question: 'Is IELTS or TOEFL mandatory for admission to Canadian institutions?',
    shortAnswer: 'In many cases, No. Because Fenster International School instructs entirely in English, several partner colleges and universities in Alberta, Ontario, and other provinces accept our English Language Proficiency Attestation or WAEC English grades (C6 or higher).',
    detailedContent: {
      notes: [
        'Where specific graduate programs mandate IELTS Academic or PTE, our counselors provide targeted test prep resources.',
        'Duolingo English Test (DET) is also accepted by a growing list of affiliated Canadian colleges.'
      ]
    }
  },
  {
    id: 'ca-permit-rules',
    category: 'canada',
    question: 'How do recent Canadian immigration changes (caps & PAL) affect applicants?',
    shortAnswer: 'Our licensed educational advisors remain strictly aligned with Immigration, Refugees and Citizenship Canada (IRCC) updates, including securing the mandatory Provincial Attestation Letter (PAL) from province governments to guarantee compliant and successful submissions.',
    detailedContent: {
      notes: [
        'We ensure applications are submitted only to reputable Designated Learning Institutions (DLIs) with verified PGWP eligibility.',
        'We review financial documentation thoroughly to meet revised living expense thresholds.'
      ]
    }
  },
  {
    id: 'ca-work-rights',
    category: 'canada',
    question: 'Can students work while studying in Canada, and what happens after graduation?',
    shortAnswer: 'Yes. Eligible international students in Canada can work up to 20–24 hours per week off-campus during academic sessions and full-time during scheduled breaks. After completing an eligible program (1–4 years), graduates qualify for a Post-Graduation Work Permit (PGWP) for up to 3 years.',
    detailedContent: {
      notes: [
        'PGWP provides open Canadian work authorization with any employer in Canada.',
        'Valuable Canadian work experience qualifies graduates for permanent residency pathways such as the Canadian Experience Class (Express Entry) and Provincial Nominee Programs (PNP).'
      ]
    },
    highlight: 'Up to 3-Year PGWP'
  },
  {
    id: 'ca-family',
    category: 'canada',
    question: 'Can parents or spouses accompany students to Canada?',
    shortAnswer: 'Yes. Spouses of students enrolled in master’s, doctoral, and select professional programs can apply for an open work permit, and minor children can access free public primary/secondary schooling in Canada under their parent’s study permit.',
    detailedContent: {
      notes: [
        'For minor students attending secondary pathways in Canada, a parent or legal guardian may accompany them on a Temporary Resident Visa (TRV) or designate a Canadian custodian.',
        'Our Edmonton office provides direct support with custodianship declarations and family accommodation.'
      ]
    }
  },

  // GENERAL & PORTAL
  {
    id: 'gen-portal',
    category: 'general',
    question: 'How do parents monitor their child’s academic records and results?',
    shortAnswer: 'Fenster International School provides a secure 24/7 web-based School Portal (fisresult.vercel.app). Parents receive unique login credentials to track termly report cards, continuous assessments, attendance, and official announcements.',
    detailedContent: {
      steps: [
        'Visit the portal link: fisresult.vercel.app (also accessible directly from the top navigation bar)',
        'Enter the student registration ID and secure pin issued by the school registrar',
        'View term grades, teacher comments, subject score breakdowns, and downloadable PDF result slips'
      ]
    },
    highlight: 'Direct portal: fisresult.vercel.app'
  },
  {
    id: 'gen-visitation',
    category: 'general',
    question: 'Can prospective parents tour the campus or schedule an in-person meeting?',
    shortAnswer: 'Absolutely! We encourage parents to visit our Nigeria campus in Agbado, Ogun State on weekdays between 8:30 AM and 3:30 PM. For Canadian pathway inquiries, parents can visit our Edmonton office or schedule a video conference with our lead advisors.',
    detailedContent: {
      notes: [
        'Campus tours include visits to our ICT labs, science laboratories, creative arts studio, and sports facilities.',
        'Walk-ins are welcome, but advance booking via WhatsApp (+234 805 806 1296) ensures dedicated time with the head of admissions.'
      ]
    }
  }
];

interface AdmissionsFAQProps {
  initialCategory?: 'all' | 'nigeria' | 'canada' | 'general';
  showTitle?: boolean;
  className?: string;
}

export default function AdmissionsFAQ({ 
  initialCategory = 'all', 
  showTitle = true,
  className = ''
}: AdmissionsFAQProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'nigeria' | 'canada' | 'general'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'ng-process': true,
    'ca-overview': true
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    filteredFAQs.forEach(faq => {
      allOpen[faq.id] = true;
    });
    setOpenItems(allOpen);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter(faq => {
      // Category filter
      if (activeTab !== 'all' && faq.category !== activeTab) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() === '') return true;

      const q = searchQuery.toLowerCase();
      const inQuestion = faq.question.toLowerCase().includes(q);
      const inAnswer = faq.shortAnswer.toLowerCase().includes(q);
      const inHighlight = faq.highlight?.toLowerCase().includes(q);
      const inSteps = faq.detailedContent?.steps?.some(s => s.toLowerCase().includes(q));
      const inDocs = faq.detailedContent?.documents?.some(d => d.toLowerCase().includes(q));
      const inNotes = faq.detailedContent?.notes?.some(n => n.toLowerCase().includes(q));

      return inQuestion || inAnswer || inHighlight || inSteps || inDocs || inNotes;
    });
  }, [activeTab, searchQuery]);

  const categoryCounts = useMemo(() => {
    return {
      all: FAQ_DATA.length,
      nigeria: FAQ_DATA.filter(f => f.category === 'nigeria').length,
      canada: FAQ_DATA.filter(f => f.category === 'canada').length,
      general: FAQ_DATA.filter(f => f.category === 'general').length,
    };
  }, []);

  return (
    <div className={`w-full ${className}`}>
      {showTitle && (
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs tracking-wider uppercase">
            <HelpCircle size={15} />
            <span>Parent Admissions Guide</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            Everything you need to know about enrolling your child at our <span className="text-primary font-bold">Nigeria Campus</span> and progressing through our <span className="text-accent font-bold">Canada Pathways</span>.
          </p>
        </div>
      )}

      {/* Program Summary Cards - Visual Quick Reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
        {/* Nigeria Campus Overview Card */}
        <div className="bg-gradient-to-br from-primary/5 via-white to-primary/10 border-2 border-primary/20 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xl shadow-md">
                NG
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Agbado, Ogun State</span>
                <h3 className="text-xl font-bold text-primary">Nigeria Campus</h3>
              </div>
            </div>
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
              Creche – SSS3
            </span>
          </div>
          <p className="text-slate-600 text-sm mb-5 leading-relaxed">
            Local & British hybrid curriculum. Prepares students for WAEC, NECO, JAMB, and Cambridge IGCSE with state-of-the-art facilities.
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 mb-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Diagnostic Assessment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Flexible Fee Plans</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Online Result Portal</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Robotics & ICT Lab</span>
            </div>
          </div>
          <button 
            onClick={() => { setActiveTab('nigeria'); setSearchQuery(''); }}
            className="w-full text-center py-2.5 px-4 rounded-xl font-bold text-sm bg-primary text-white hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <span>View Nigeria Enrollment FAQs</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Canada Pathways Overview Card */}
        <div className="bg-gradient-to-br from-accent/5 via-white to-accent/10 border-2 border-accent/20 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center font-bold text-xl shadow-md">
                CA
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Edmonton, Alberta</span>
                <h3 className="text-xl font-bold text-primary">Canada Pathways</h3>
              </div>
            </div>
            <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full">
              Higher Ed & Migration
            </span>
          </div>
          <p className="text-slate-600 text-sm mb-5 leading-relaxed">
            Full-service educational placement, study permit application guidance, pre-departure briefings, and post-graduation settlement support.
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 mb-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Letter of Acceptance (LOA)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>IRCC PAL Compliance</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Post-Grad Work Permit</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Family & Guardian Advisory</span>
            </div>
          </div>
          <button 
            onClick={() => { setActiveTab('canada'); setSearchQuery(''); }}
            className="w-full text-center py-2.5 px-4 rounded-xl font-bold text-sm bg-accent text-white hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
          >
            <span>View Canada Pathway FAQs</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="max-w-5xl mx-auto space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          {/* Category Tabs */}
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl overflow-x-auto scrollbar-none gap-1 border border-slate-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'all'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>All Questions</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {categoryCounts.all}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('nigeria')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'nigeria'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>Nigeria Campus</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === 'nigeria' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {categoryCounts.nigeria}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('canada')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'canada'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>Canada Programs</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === 'canada' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {categoryCounts.canada}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('general')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'general'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>Portal & General</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === 'general' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {categoryCounts.general}
              </span>
            </button>
          </div>

          {/* Expand / Collapse Controls */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 self-end sm:self-center">
            <button
              onClick={expandAll}
              className="hover:text-primary px-2 py-1 rounded hover:bg-slate-100 transition-colors"
            >
              Expand All
            </button>
            <span>•</span>
            <button
              onClick={collapseAll}
              className="hover:text-primary px-2 py-1 rounded hover:bg-slate-100 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Live Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search enrollment questions (e.g., fees, documents, WAEC, study permit, age, portal)..."
            className="w-full pl-11 pr-24 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Accordion List */}
      <div className="max-w-5xl mx-auto space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-16 px-6 bg-slate-50 border border-dashed border-slate-200 rounded-3xl">
            <HelpCircle className="mx-auto text-slate-400 mb-3" size={40} />
            <h4 className="text-lg font-bold text-slate-800 mb-1">No matching questions found</h4>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              We couldn't find any FAQs matching "{searchQuery}". You can try searching with different keywords or contact our admissions team directly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors"
              >
                Clear Search
              </button>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent('Hello Fenster International School, I have a question about enrollment: ' + searchQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                <MessageSquare size={14} />
                Ask Us on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          filteredFAQs.map((faq) => {
            const isOpen = !!openItems[faq.id];
            const isNigeria = faq.category === 'nigeria';
            const isCanada = faq.category === 'canada';

            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden bg-white ${
                  isOpen 
                    ? 'border-primary/40 shadow-md ring-1 ring-primary/10' 
                    : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 md:p-6 flex items-start justify-between gap-4 select-none focus:outline-none"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isNigeria 
                          ? 'bg-primary/10 text-primary' 
                          : isCanada 
                            ? 'bg-accent/10 text-accent' 
                            : 'bg-slate-100 text-slate-700'
                      }`}>
                        {isNigeria ? 'Nigeria Campus' : isCanada ? 'Canada Pathway' : 'General & Portal'}
                      </span>

                      {faq.highlight && (
                        <span className="text-[10px] font-semibold bg-gold/20 text-slate-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles size={11} className="text-amber-600" />
                          {faq.highlight}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base md:text-lg font-bold text-primary leading-snug">
                      {faq.question}
                    </h4>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-primary text-white rotate-180' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 md:px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 space-y-4">
                        <p className="font-normal text-slate-700">
                          {faq.shortAnswer}
                        </p>

                        {/* Step by step lists if available */}
                        {faq.detailedContent?.steps && (
                          <div className="bg-slate-50 p-4 md:p-5 rounded-2xl border border-slate-100 space-y-3">
                            <h5 className="font-bold text-xs uppercase tracking-wider text-primary flex items-center gap-1.5">
                              <Clock size={14} />
                              Enrollment Pathway Steps:
                            </h5>
                            <div className="space-y-2">
                              {faq.detailedContent.steps.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-700">
                                  <div className="w-5 h-5 rounded-full bg-primary text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                                    {idx + 1}
                                  </div>
                                  <div className="flex-1">{step}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Required Documents list */}
                        {faq.detailedContent?.documents && (
                          <div className="bg-slate-50 p-4 md:p-5 rounded-2xl border border-slate-100 space-y-3">
                            <h5 className="font-bold text-xs uppercase tracking-wider text-primary flex items-center gap-1.5">
                              <FileText size={14} />
                              Document Checklist:
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {faq.detailedContent.documents.map((doc, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-700">
                                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{doc}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Additional Notes */}
                        {faq.detailedContent?.notes && (
                          <ul className="space-y-2 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                            {faq.detailedContent.notes.map((note, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></span>
                                <span>{note}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Quick contextual action button if related to portal or whatsapp */}
                        <div className="pt-2 flex flex-wrap items-center gap-3">
                          {faq.id === 'gen-portal' ? (
                            <a
                              href={CONTACT_INFO.portalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-xl transition-colors shadow-sm"
                            >
                              <span>Open School Portal (fisresult.vercel.app)</span>
                              <ExternalLink size={13} />
                            </a>
                          ) : (
                            <a
                              href={`https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent(`Hello, I have a question regarding: "${faq.question}"`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-1.5 rounded-xl transition-colors"
                            >
                              <MessageSquare size={13} />
                              <span>Clarify on WhatsApp</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions Banner */}
      <div className="max-w-5xl mx-auto mt-12 bg-primary rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Direct Parent Advisory</span>
            <h3 className="text-2xl md:text-3xl font-bold">Have a specific question not listed here?</h3>
            <p className="text-white/80 text-sm md:text-base max-w-xl">
              Our admissions team is available daily to answer questions regarding campus enrollment, tuition schedules, or Canadian study permits.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent('Hello Fenster International School admissions, I would like to inquire about enrolling my child.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent/90 text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-accent/30"
            >
              <MessageSquare size={16} />
              <span>Chat with Admissions</span>
            </a>

            <a
              href={CONTACT_INFO.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Access School Portal</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
