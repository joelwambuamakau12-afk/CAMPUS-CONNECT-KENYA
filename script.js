/* =================================================================
   CAMPUSCONNECT KENYA — SCRIPT.JS
   Modules:
   1.  Data (opportunities, stats, resources, events, testimonials, faqs, feed)
   2.  Utilities (toast, ripple, debounce)
   3.  Loader
   4.  Theme (dark/light mode)
   5.  Navigation (scroll state, mobile menu, scroll progress)
   6.  Cursor glow
   7.  Scroll reveal
   8.  Animated counters (stats)
   9.  Opportunities (render, search, filter, sort, save/bookmark/share, pagination)
   10. Resources render
   11. Community feed render
   12. Events render + live countdown
   13. Testimonials slider
   14. FAQ accordion
   15. Newsletter + Contact form validation
   16. Back to top
   ================================================================= */

/* ---------------------------------------------------------------
   1. DATA
   New opportunities can be added by pushing a new object into
   OPPORTUNITIES below — every other part of the UI (cards, search,
   filters, sorting) reads from this single array.
   ----------------------------------------------------------------*/
const OPPORTUNITIES = [
  {
    id: 'saf-intern-data',
    company: 'Safaricom',
    initials: 'SF',
    position: 'Data Analytics Intern',
    category: 'Internship',
    location: 'Nairobi',
    workMode: 'Hybrid',
    salary: 'KES 25,000/mo',
    salaryValue: 25000,
    deadline: '2026-08-15',
    postedDaysAgo: 2,
    popularity: 980,
    skills: ['SQL', 'Python', 'Power BI'],
    applyUrl: 'https://www.safaricom.co.ke/careers'
  },
  {
    id: 'equity-intern-finance',
    company: 'Equity Bank',
    initials: 'EQ',
    position: 'Finance & Risk Internship',
    category: 'Internship',
    location: 'Nairobi',
    workMode: 'Physical',
    salary: 'KES 20,000/mo',
    salaryValue: 20000,
    deadline: '2026-07-30',
    postedDaysAgo: 5,
    popularity: 720,
    skills: ['Excel', 'Financial Modeling'],
    applyUrl: 'https://www.equitygroupholdings.com/careers'
  },
  {
    id: 'ncba-graduate-trainee',
    company: 'NCBA Bank',
    initials: 'NC',
    position: 'Graduate Trainee Programme',
    category: 'Graduate Programme',
    location: 'Nairobi',
    workMode: 'Physical',
    salary: 'KES 60,000/mo',
    salaryValue: 60000,
    deadline: '2026-08-05',
    postedDaysAgo: 1,
    popularity: 1120,
    skills: ['Leadership', 'Banking Ops'],
    applyUrl: 'https://ncbagroup.com/careers'
  },
  {
    id: 'kcb-attachment-it',
    company: 'KCB Group',
    initials: 'KC',
    position: 'IT Attachment',
    category: 'Attachment',
    location: 'Nairobi',
    workMode: 'Physical',
    salary: 'Stipend provided',
    salaryValue: 12000,
    deadline: '2026-07-20',
    postedDaysAgo: 8,
    popularity: 640,
    skills: ['Networking', 'Java', 'Support'],
    applyUrl: 'https://kcbgroup.com/careers'
  },
  {
    id: 'microsoft-internship-swe',
    company: 'Microsoft ADC',
    initials: 'MS',
    position: 'Software Engineering Intern',
    category: 'Internship',
    location: 'Nairobi',
    workMode: 'Hybrid',
    salary: 'Competitive',
    salaryValue: 90000,
    deadline: '2026-09-01',
    postedDaysAgo: 3,
    popularity: 1560,
    skills: ['C#', 'Azure', 'DSA'],
    applyUrl: 'https://careers.microsoft.com'
  },
  {
    id: 'mastercard-fellowship',
    company: 'Mastercard Foundation',
    initials: 'MF',
    position: 'Young Leaders Fellowship',
    category: 'Fellowship',
    location: 'Remote',
    workMode: 'Remote',
    salary: 'Fully Funded',
    salaryValue: 0,
    deadline: '2026-08-25',
    postedDaysAgo: 6,
    popularity: 890,
    skills: ['Leadership', 'Community Impact'],
    applyUrl: 'https://mastercardfdn.org/fellowship'
  },
  {
    id: 'uon-scholarship-stem',
    company: 'University of Nairobi',
    initials: 'UN',
    position: 'STEM Merit Scholarship',
    category: 'Scholarship',
    location: 'Nairobi',
    workMode: 'Physical',
    salary: 'Full Tuition',
    salaryValue: 0,
    deadline: '2026-07-25',
    postedDaysAgo: 4,
    popularity: 540,
    skills: ['Academic Excellence'],
    applyUrl: 'https://uonbi.ac.ke/scholarships'
  },
  {
    id: 'andela-remote-frontend',
    company: 'Andela',
    initials: 'AN',
    position: 'Remote Frontend Developer',
    category: 'Remote Job',
    location: 'Remote',
    workMode: 'Remote',
    salary: 'KES 150,000/mo',
    salaryValue: 150000,
    deadline: '2026-07-18',
    postedDaysAgo: 9,
    popularity: 1340,
    skills: ['React', 'JavaScript', 'CSS'],
    applyUrl: 'https://andela.com/careers'
  },
  {
    id: 'jkuat-campus-lab-assistant',
    company: 'JKUAT',
    initials: 'JK',
    position: 'Campus Lab Assistant',
    category: 'Campus Job',
    location: 'Juja',
    workMode: 'Physical',
    salary: 'KES 8,000/mo',
    salaryValue: 8000,
    deadline: '2026-07-12',
    postedDaysAgo: 11,
    popularity: 310,
    skills: ['Lab Safety', 'Reporting'],
    applyUrl: 'https://jkuat.ac.ke/jobs'
  },
  {
    id: 'un-habitat-volunteer',
    company: 'UN-Habitat',
    initials: 'UH',
    position: 'Youth Volunteer Programme',
    category: 'Volunteer',
    location: 'Nairobi',
    workMode: 'Hybrid',
    salary: 'Unpaid + Stipend',
    salaryValue: 0,
    deadline: '2026-08-10',
    postedDaysAgo: 7,
    popularity: 460,
    skills: ['Communication', 'Project Support'],
    applyUrl: 'https://unhabitat.org/volunteer'
  },
  {
    id: 'moringa-bootcamp',
    company: 'Moringa School',
    initials: 'MO',
    position: 'Software Engineering Bootcamp',
    category: 'Bootcamp',
    location: 'Nairobi',
    workMode: 'Hybrid',
    salary: 'Paid Placement After',
    salaryValue: 0,
    deadline: '2026-07-28',
    postedDaysAgo: 3,
    popularity: 780,
    skills: ['JavaScript', 'Problem Solving'],
    applyUrl: 'https://moringaschool.com/apply'
  },
  {
    id: 'kemri-research-assistant',
    company: 'KEMRI',
    initials: 'KM',
    position: 'Public Health Research Assistant',
    category: 'Research',
    location: 'Kisumu',
    workMode: 'Physical',
    salary: 'KES 30,000/mo',
    salaryValue: 30000,
    deadline: '2026-08-02',
    postedDaysAgo: 5,
    popularity: 410,
    skills: ['Research Methods', 'Data Collection'],
    applyUrl: 'https://kemri.go.ke/careers'
  },
  {
    id: 'hackathon-devfest',
    company: 'Google Developer Groups',
    initials: 'GD',
    position: 'DevFest Nairobi Hackathon',
    category: 'Competition',
    location: 'Nairobi',
    workMode: 'Physical',
    salary: 'Prizes up to KES 200,000',
    salaryValue: 0,
    deadline: '2026-09-10',
    postedDaysAgo: 1,
    popularity: 1020,
    skills: ['Any Stack', 'Teamwork'],
    applyUrl: 'https://gdg.community.dev/devfest-nairobi'
  },
  {
    id: 'britam-attachment-actuarial',
    company: 'Britam',
    initials: 'BR',
    position: 'Actuarial Science Attachment',
    category: 'Attachment',
    location: 'Nairobi',
    workMode: 'Physical',
    salary: 'Stipend provided',
    salaryValue: 15000,
    deadline: '2026-07-22',
    postedDaysAgo: 6,
    popularity: 380,
    skills: ['Statistics', 'Excel'],
    applyUrl: 'https://britam.com/careers'
  },
  {
    id: 'twiga-remote-parttime',
    company: 'Twiga Foods',
    initials: 'TW',
    position: 'Part-time Growth Associate',
    category: 'Remote Job',
    location: 'Remote',
    workMode: 'Remote',
    salary: 'KES 35,000/mo',
    salaryValue: 35000,
    deadline: '2026-07-16',
    postedDaysAgo: 10,
    popularity: 500,
    skills: ['Sales', 'CRM Tools'],
    applyUrl: 'https://twiga.com/careers'
  }
];

/* Brand-toned gradients for each company's letter-mark logo. Add an entry
   here whenever a new employer is added to OPPORTUNITIES — anything missing
   automatically falls back to a deterministic green/gold gradient below. */
const COMPANY_COLORS = {
  'Safaricom':               ['#0FA34A', '#0A5C2A'],
  'Equity Bank':              ['#7A1F2B', '#43101A'],
  'NCBA Bank':                ['#F58220', '#B85800'],
  'KCB Group':                ['#00447C', '#002B50'],
  'Microsoft ADC':            ['#3A7BD5', '#5C2D91'],
  'Mastercard Foundation':    ['#EB6020', '#F7A823'],
  'University of Nairobi':    ['#6E1423', '#3A0A12'],
  'Andela':                   ['#173B45', '#0B2024'],
  'JKUAT':                    ['#0E6B3A', '#0A4526'],
  'UN-Habitat':               ['#4B8ED1', '#1D5A9C'],
  'Moringa School':           ['#F2994A', '#C9720F'],
  'KEMRI':                    ['#0E7C7B', '#0A4F4E'],
  'Google Developer Groups':  ['#4285F4', '#EA4335'],
  'Britam':                   ['#0B4F9E', '#062F60'],
  'Twiga Foods':              ['#2FA84F', '#1B6B32']
};

/* Deterministic fallback so any newly added company (without a manual
   entry above) still gets a consistent, good-looking logo color. */
function getCompanyColor(company){
  if(COMPANY_COLORS[company]) return COMPANY_COLORS[company];
  let hash = 0;
  for(let i = 0; i < company.length; i++) hash = company.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return [`hsl(${hue}, 55%, 38%)`, `hsl(${hue}, 60%, 20%)`];
}

/* Explicit logo path mapping for each company. Add file paths here if you
   want to control exactly which SVG is used for each employer. */
const LOGO_PATHS = {
  'Safaricom': 'images (1).jpg',
  'Equity Bank': 'unnamed.png',
  'NCBA Bank': 'NCBA_Group_Logo_2019.jpg',
  'KCB Group': 'download.png',
  'Microsoft ADC': 'download.png',
  'Mastercard Foundation': 'download.png',
  'University of Nairobi': 'images (3).jpg',
  'Andela': 'images (2).png',
  'JKUAT': 'images (4).jpg',
  'UN-Habitat': 'images (3).png',
  'Moringa School': 'images (4).png',
  'KEMRI': 'images (5).jpg',
  'Google Developer Groups': 'images.jpg',
  'Britam': 'download.jpg',
  'Twiga Foods': 'images (6).jpg'
};

function companyLogoPath(company){
  return LOGO_PATHS[company] || 'default.svg';
}

const FILTER_TAGS = ['All', 'Remote', 'Internship', 'Scholarship', 'Attachment', 'Graduate Programme', 'Part-time', 'Full-time', 'Volunteer'];

const STATS = [
  { label: 'Students Registered', value: 12400, suffix: '+' },
  { label: 'Universities', value: 62, suffix: '' },
  { label: 'Partner Companies', value: 340, suffix: '+' },
  { label: 'Opportunities Posted', value: 5800, suffix: '+' },
  { label: 'Jobs Filled', value: 1900, suffix: '+' },
  { label: 'Scholarships Awarded', value: 430, suffix: '' },
  { label: 'Active Mentors', value: 260, suffix: '' },
  { label: 'Counties Reached', value: 47, suffix: '' }
];

const RESOURCES = [
  {
    icon: '📄', title: 'CV Builder', desc: 'Build a Kenyan-employer-ready CV in minutes.',
    steps: [
      { title: 'Pick a one-page format', desc: 'Kenyan recruiters skim. Name, contact, one-line profile, then experience — no photo, no age, no marital status.' },
      { title: 'Lead with impact, not duties', desc: 'Swap "Responsible for records" for "Digitised 400+ records, cutting retrieval time by 60%."' },
      { title: 'Match the job advert\'s language', desc: 'If the advert says "stakeholder management," use that exact phrase where it\'s true of your experience.' },
      { title: 'List skills employers actually search for', desc: 'Excel, SQL, Canva, CRM tools — specific tools beat vague words like "hardworking."' },
      { title: 'Export as PDF, name it properly', desc: 'Save as "FirstName-LastName-CV.pdf" — never "Document1.pdf" or "CV final final 2.pdf."' }
    ],
    notes: [
      'Keep it to 1 page as a student or fresh graduate — 2 pages max with 3+ years experience.',
      'Re-order sections so your strongest section sits right under your profile summary.',
      'Have someone else proofread it. Typos are the #1 reason CVs get rejected before they\'re even read.'
    ]
  },
  {
    icon: '✉️', title: 'Cover Letter Guide', desc: 'Templates and tips that get replies.',
    steps: [
      { title: 'Address a real person', desc: '"Dear Hiring Manager" beats "To Whom It May Concern." Check LinkedIn or the company site for a name.' },
      { title: 'Open with why, not who', desc: 'Skip "I am writing to apply for..." — open with the one achievement that makes you right for this role.' },
      { title: 'Mirror the job description', desc: 'Pick 2–3 requirements from the advert and show, briefly, where you\'ve already done exactly that.' },
      { title: 'Close with a clear ask', desc: 'End with availability for an interview, not just "I hope to hear from you."' }
    ],
    notes: [
      'Keep it under 350 words — three short paragraphs, not an essay.',
      'Never copy-paste the same letter for every company. Recruiters can tell.',
      'Save it as a PDF alongside your CV, not as a separate Word file.'
    ]
  },
  {
    icon: '🎤', title: 'Interview Questions', desc: 'Real questions asked by top employers.',
    steps: [
      { title: '"Tell me about yourself"', desc: 'Answer in under 90 seconds: current status, one relevant achievement, why this role.' },
      { title: '"Why do you want to work here?"', desc: 'Reference something specific — a product, a value, a recent announcement — not just "growth opportunities."' },
      { title: '"Describe a time you handled conflict"', desc: 'Use the STAR method: Situation, Task, Action, Result. Keep it to one clear story.' },
      { title: '"What are your salary expectations?"', desc: 'Research the range beforehand and give a band, not a fixed number, and tie it to the role\'s scope.' },
      { title: '"Do you have any questions for us?"', desc: 'Always have two ready — about the team\'s current priorities, and what success looks like in 6 months.' }
    ],
    notes: [
      'Practice answers out loud, not just in your head — it changes how confident you sound.',
      'For virtual interviews, test your camera, mic and internet 15 minutes early.',
      'Send a short thank-you email within 24 hours of the interview.'
    ]
  },
  {
    icon: '🧠', title: 'Aptitude Tests', desc: 'Practice tests used in graduate assessments.',
    steps: [
      { title: 'Numerical reasoning', desc: 'Practice interpreting tables, percentages and ratios under time pressure — most tests give under a minute per question.' },
      { title: 'Verbal reasoning', desc: 'Work on "true / false / cannot say" style passages, common in bank and telco graduate tests.' },
      { title: 'Logical & abstract reasoning', desc: 'Pattern and sequence questions — practice daily for a week before a scheduled test.' },
      { title: 'Situational judgement', desc: 'These ask "what would you do" — answer as the ideal employee, not with what feels most natural.' }
    ],
    notes: [
      'Most graduate aptitude tests are timed — practice under a timer, not untimed.',
      'Retake practice sets after 48 hours to check retention, not just first-attempt speed.',
      'Get a good night\'s sleep before test day — fatigue affects reasoning scores more than people expect.'
    ]
  },
  {
    icon: '🗺️', title: 'Career Roadmaps', desc: 'Step-by-step paths for 20+ career tracks.',
    steps: [
      { title: 'Pick a track', desc: 'Choose from Software Engineering, Data, Finance, Marketing, Design, Public Health and 15 more, each with milestones.' },
      { title: 'Check the entry requirements', desc: 'Every track lists the minimum skills, certificates and portfolio pieces employers expect at entry level.' },
      { title: 'Follow the 6-month milestone plan', desc: 'Roadmaps break the first two years into 6-month blocks so progress is measurable, not vague.' },
      { title: 'Track against real job adverts', desc: 'Cross-check your roadmap progress against 3 live job adverts in your track every month.' }
    ],
    notes: [
      'Roadmaps are a guide, not a ladder — skip steps you\'ve already covered through coursework.',
      'Revisit your roadmap every semester; entry requirements shift as the market changes.'
    ]
  },
  {
    icon: '📚', title: 'Learning Resources', desc: 'Curated reading lists by field.',
    steps: [
      { title: 'Choose your field', desc: 'Reading lists exist for tech, finance, agribusiness, health sciences, law and media.' },
      { title: 'Start with the foundations list', desc: 'Each field opens with 3–5 foundational reads before branching into specialisations.' },
      { title: 'Add one practical resource per week', desc: 'Balance theory with a hands-on resource — a dataset, a case study, a past exam paper.' }
    ],
    notes: [
      'Reading lists link only to free or already-licensed university resources — no pirated PDFs.',
      'Set a realistic pace: one solid resource finished beats five started.'
    ]
  },
  {
    icon: '🎓', title: 'Free Courses', desc: 'Score 80%+ on the test, get a certificate. Fully free.',
    steps: [
      { title: 'Filter by relevance, not popularity', desc: 'A niche, relevant certificate beats a generic one nobody in your target company recognises.' },
      { title: 'Check the time commitment upfront', desc: 'Course pages list expected hours so you can plan around exams and attachments.' },
      { title: 'Complete the assessment, not just the videos', desc: 'Only completed, assessed courses are worth adding to your CV.' },
      { title: 'Add it to your CV correctly', desc: 'List the issuing platform, the exact certificate name and completion date — recruiters do check.' }
    ],
    notes: [
      'Two completed, relevant free courses look stronger than ten half-finished ones.',
      'Free doesn\'t mean low value — some of the highest-regarded certificates in tech and finance are free.'
    ]
  },
  {
    icon: '🏆', title: 'Certifications', desc: 'Which certificates actually matter in Kenya.',
    steps: [
      { title: 'Start with sector-recognised ones', desc: 'CPA and ACCA for finance, CCNA/CompTIA for IT support, PMP for project management — these get noticed.' },
      { title: 'Check what your target employer lists', desc: 'Scan 5 job adverts from companies you want to work for and note which certificates repeat.' },
      { title: 'Budget realistically', desc: 'Certification guide flags which exams have student discounts and local sitting centres.' },
      { title: 'Sequence them', desc: 'Some certifications require others first (e.g. CPA sections) — the guide lays out the correct order.' }
    ],
    notes: [
      'A certificate without practical evidence to back it up raises questions in interviews — be ready to demonstrate it.',
      'Some "certifications" are just marketing — the guide flags which ones carry real industry weight in Kenya.'
    ]
  },
  {
    icon: '💻', title: 'Tech Learning', desc: 'Coding tracks from beginner to job-ready.',
    steps: [
      { title: 'Pick one language, not five', desc: 'Beginners: start with Python or JavaScript. Depth beats breadth in your first 3 months.' },
      { title: 'Build, don\'t just watch', desc: 'For every hour of tutorial, spend two hours building something small from scratch.' },
      { title: 'Push code publicly', desc: 'Host projects on GitHub with a clear README — this is often checked before an interview is even booked.' },
      { title: 'Apply before you feel "ready"', desc: 'Start applying to internships once you can build a basic CRUD app — waiting for "ready" delays you unnecessarily.' }
    ],
    notes: [
      'A messy but working project on GitHub beats a perfect one that\'s only ever run on your laptop.',
      'Join a study group or campus dev club — debugging alone burns people out fast.'
    ]
  },
  {
    icon: '📊', title: 'Business Learning', desc: 'Finance, marketing and operations basics.',
    steps: [
      { title: 'Learn the vocabulary first', desc: 'Gross margin, CAC, churn, cash flow — understanding the terms unlocks everything else faster.' },
      { title: 'Study real Kenyan case studies', desc: 'M-Pesa, Twiga Foods and Jumia case studies teach more about local business than generic global ones.' },
      { title: 'Practice with spreadsheets', desc: 'Build one simple budget and one simple forecast model in Excel or Google Sheets — a real, testable skill.' },
      { title: 'Shadow a small business if you can', desc: 'A weekend helping a small business with its books teaches more than a month of theory alone.' }
    ],
    notes: [
      'Business fundamentals transfer across every track — even engineers benefit from understanding margins and budgets.',
      'Keep a running glossary of terms you learn; recruiters notice when you use them correctly in interviews.'
    ]
  }
];

/* Free course catalog — each course links to its real provider, and includes
   a 5-question certification test. A score of 4/5 (80%) or higher passes and
   unlocks a downloadable CampusConnect certificate. Add a new course by
   pushing an object here; the catalog modal reads straight from this array. */
/* Category-level "lesson" content — Cisco NetAcad style: read the modules,
   track coverage, then the test unlocks only once every module is marked
   complete. Kept per-category (rather than duplicated 18 times) so it's
   easy to maintain; module titles reference the specific course title. */
const COURSE_MODULE_TEMPLATES = {
  Tech: [
    { title: 'Getting Started', notes: [
      'Set up whatever tool or environment the course needs before writing any code.',
      'Confirm you meet the prerequisites — most of these need only basic computer literacy.',
      'Skim the full syllabus on the provider\'s site first so you know where each lesson is headed.'
    ]},
    { title: 'Core Concepts & Practice', notes: [
      'Work through every hands-on exercise yourself — reading code is not the same as writing it.',
      'Redo at least one exercise from a blank file without checking the solution.',
      'Keep a running notes file of new syntax or terms as you meet them.'
    ]},
    { title: 'Apply & Build', notes: [
      'Build one small project using only what this course covered.',
      'Push the project to GitHub with a short README, even if it\'s rough.',
      'Compare your approach with someone else\'s solution online and note one thing you\'d do differently.'
    ]}
  ],
  Data: [
    { title: 'Getting Started', notes: [
      'Install or open the tool this course uses (spreadsheet, SQL console, or notebook).',
      'Load a small sample dataset so you have something real to practice on.',
      'Note the three or four questions you\'d like this dataset to answer.'
    ]},
    { title: 'Core Techniques', notes: [
      'Practice each function or query pattern the course teaches on your own sample data.',
      'Deliberately break something (a wrong formula, a bad join) so you learn how the error looks.',
      'Write down the one technique from this module you\'re least confident about, and redo it.'
    ]},
    { title: 'Turn Data into Insight', notes: [
      'Produce one chart, pivot, or summary table that answers a question you set earlier.',
      'Write a two-sentence takeaway from your result, in plain language.',
      'Check your numbers against a second method to confirm they\'re right.'
    ]}
  ],
  Business: [
    { title: 'Foundations', notes: [
      'Read through the core definitions and vocabulary before the examples — they unlock everything else.',
      'Note any term you don\'t fully understand and look it up before continuing.',
      'Think of one Kenyan business you know that this topic clearly applies to.'
    ]},
    { title: 'Real-World Application', notes: [
      'Work through the case studies actively — pause and predict the outcome before reading it.',
      'Apply one framework or formula from this module to a real or hypothetical small business.',
      'Discuss what you\'ve learned with someone else — explaining it back is the fastest way to retain it.'
    ]},
    { title: 'Putting It Into Practice', notes: [
      'Draft one real document (a budget, a pitch line, a simple plan) using this module\'s ideas.',
      'Identify one thing you would change about how you currently handle this area.',
      'Write down two ways you\'ll use this in the next 30 days.'
    ]}
  ],
  Design: [
    { title: 'Foundations', notes: [
      'Study a handful of real examples before starting any exercises — pattern-spotting comes first.',
      'Learn the core vocabulary (hierarchy, contrast, alignment) so feedback later makes sense.',
      'Save three designs you personally admire, and note why they work.'
    ]},
    { title: 'Hands-on Practice', notes: [
      'Recreate one existing design from scratch to understand the decisions behind it.',
      'Get feedback from at least one other person before considering an exercise finished.',
      'Redo your weakest exercise a second time — first attempts rarely show real learning.'
    ]},
    { title: 'Build Your Own', notes: [
      'Design one original piece using only what this course covered.',
      'Add it to a simple portfolio, even a single folder or webpage.',
      'Write one sentence explaining the design decision you\'re proudest of.'
    ]}
  ],
  'Soft Skills': [
    { title: 'Understand the Framework', notes: [
      'Read through the core model or framework this course introduces before trying to apply it.',
      'Think of a recent situation where this skill would have helped.',
      'Note the one habit you most want to change by the end of this course.'
    ]},
    { title: 'Practice Deliberately', notes: [
      'Rehearse out loud or on paper — this skill doesn\'t build from reading alone.',
      'Ask someone to observe or listen and give you one honest piece of feedback.',
      'Identify the specific moment in your practice that felt weakest, and repeat just that part.'
    ]},
    { title: 'Use It for Real', notes: [
      'Apply the skill in one real conversation, meeting, or task this week.',
      'Write down what worked and what you\'d adjust next time.',
      'Set one small, specific goal for using this skill again within a week.'
    ]}
  ],
  Health: [
    { title: 'Foundations', notes: [
      'Read the core definitions and background before the applied examples.',
      'Note how this topic shows up in your own community or campus.',
      'List two questions you hope this course will answer.'
    ]},
    { title: 'Evidence & Application', notes: [
      'Look at how the evidence or data behind each recommendation was gathered.',
      'Connect at least one lesson to a real situation you\'ve seen or experienced.',
      'Write a plain-language summary of one concept, as if explaining it to a friend.'
    ]},
    { title: 'Putting It Into Practice', notes: [
      'Identify one action you could realistically take based on this course.',
      'Share one useful fact from this course with someone else this week.',
      'Note where you\'d go to learn more if you wanted to go deeper on this topic.'
    ]}
  ],
  Agriculture: [
    { title: 'Foundations', notes: [
      'Read the core concepts before the practical examples — the "why" makes the "how" stick.',
      'Think about how this applies to a farm or plot you know, even a small one.',
      'Note any local practice you\'ve seen that either matches or contradicts this module.'
    ]},
    { title: 'Practical Techniques', notes: [
      'Work through each technique step by step rather than skimming for the summary.',
      'Sketch or note how you\'d adapt this technique to a small-scale Kenyan farm.',
      'Identify the resource or tool constraint that would matter most in practice.'
    ]},
    { title: 'Applying It', notes: [
      'Write a simple one-page plan applying this module to a real or hypothetical plot.',
      'List the two most useful ideas from this course you\'d actually try first.',
      'Note one thing you\'d want to learn next to go further on this topic.'
    ]}
  ]
};

function getCourseModules(course){
  return COURSE_MODULE_TEMPLATES[course.category] || COURSE_MODULE_TEMPLATES.Tech;
}

/* Course progress (module completion, pass status, best score) persists in
   localStorage so the catalog can show real coverage across visits. */
const PROGRESS_KEY = 'cck-course-progress';

function loadAllProgress(){
  try{
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
  } catch(e){ return {}; }
}

function saveAllProgress(all){
  try{ localStorage.setItem(PROGRESS_KEY, JSON.stringify(all)); } catch(e){ /* storage unavailable — fail silently */ }
}

function getCourseProgress(courseId){
  const all = loadAllProgress();
  const moduleCount = getCourseModules(FREE_COURSES.find(c => c.id === courseId) || FREE_COURSES[0]).length;
  return all[courseId] || { completed: Array(moduleCount).fill(false), passed: false, bestScore: 0 };
}

function setCourseProgress(courseId, progress){
  const all = loadAllProgress();
  all[courseId] = progress;
  saveAllProgress(all);
}

function courseCoveragePct(courseId){
  const progress = getCourseProgress(courseId);
  const done = progress.completed.filter(Boolean).length;
  return Math.round((done / progress.completed.length) * 100);
}

const FREE_COURSES = [
  {
    id: 'fcc-responsive-web-design',
    title: 'Responsive Web Design',
    provider: 'freeCodeCamp',
    category: 'Tech',
    hours: '20 hrs',
    url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
    quiz: [
      { q: 'Which HTML tag is used to link an external CSS file?', options: ['the style tag', 'the link tag', 'the script tag', 'the css tag'], answer: 1 },
      { q: 'Which CSS property controls the space between an element\'s border and its content?', options: ['margin', 'padding', 'spacing', 'gap'], answer: 1 },
      { q: 'What does "responsive design" primarily aim to achieve?', options: ['Faster server response times', 'Layouts that adapt to different screen sizes', 'Better SEO rankings only', 'Smaller HTML files'], answer: 1 },
      { q: 'Which unit is relative to the viewport width?', options: ['px', 'em', 'vw', 'pt'], answer: 2 },
      { q: 'Flexbox is primarily used for arranging items in:', options: ['3D space', 'A single dimension (row or column)', 'A database', 'A grid only'], answer: 1 }
    ]
  },
  {
    id: 'fcc-js-algorithms',
    title: 'JavaScript Algorithms and Data Structures',
    provider: 'freeCodeCamp',
    category: 'Tech',
    hours: '30 hrs',
    url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
    quiz: [
      { q: 'Which keyword declares a variable that cannot be reassigned?', options: ['var', 'let', 'const', 'static'], answer: 2 },
      { q: 'What does Array.prototype.map() return?', options: ['The original array, mutated', 'A new array with transformed elements', 'A single value', 'undefined'], answer: 1 },
      { q: 'Which data structure follows First-In-First-Out (FIFO)?', options: ['Stack', 'Queue', 'Tree', 'Graph'], answer: 1 },
      { q: 'What is the time complexity of searching an unsorted array?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 2 },
      { q: 'Which of these is NOT a JavaScript primitive type?', options: ['string', 'boolean', 'object', 'number'], answer: 2 }
    ]
  },
  {
    id: 'coursera-python-everybody',
    title: 'Python for Everybody',
    provider: 'Coursera (audit for free)',
    category: 'Tech',
    hours: '25 hrs',
    url: 'https://www.coursera.org/specializations/python',
    quiz: [
      { q: 'Which symbol starts a single-line comment in Python?', options: ['//', '#', 'HTML-style comment markers', '/*'], answer: 1 },
      { q: 'What does len() return when called on a list?', options: ['The last item', 'The number of items', 'The first item', 'The list type'], answer: 1 },
      { q: 'Which of these correctly defines a function in Python?', options: ['function myFunc():', 'def myFunc():', 'func myFunc():', 'method myFunc():'], answer: 1 },
      { q: 'What data type is the result of 7 / 2 in Python 3?', options: ['int', 'float', 'string', 'boolean'], answer: 1 },
      { q: 'Which loop is best for iterating over a known range of numbers?', options: ['while', 'for', 'do-while', 'repeat'], answer: 1 }
    ]
  },
  {
    id: 'msft-learn-git-github',
    title: 'Git & GitHub Basics',
    provider: 'Microsoft Learn',
    category: 'Tech',
    hours: '6 hrs',
    url: 'https://learn.microsoft.com/en-us/training/modules/introduction-to-github/',
    quiz: [
      { q: 'What command saves staged changes to the local repository?', options: ['git push', 'git commit', 'git clone', 'git merge'], answer: 1 },
      { q: 'What is a "fork" on GitHub?', options: ['A merge conflict', 'A personal copy of someone else\'s repository', 'A deleted branch', 'A commit history'], answer: 1 },
      { q: 'Which command uploads local commits to a remote repository?', options: ['git pull', 'git fetch', 'git push', 'git status'], answer: 2 },
      { q: 'What is the purpose of a .gitignore file?', options: ['To list collaborators', 'To specify files Git should not track', 'To store commit messages', 'To configure branches'], answer: 1 },
      { q: 'What does "cloning" a repository do?', options: ['Deletes it', 'Creates a full local copy of it', 'Renames it', 'Archives it'], answer: 1 }
    ]
  },
  {
    id: 'kaggle-sql',
    title: 'SQL for Data Analysis',
    provider: 'Kaggle Learn',
    category: 'Data',
    hours: '4 hrs',
    url: 'https://www.kaggle.com/learn/intro-to-sql',
    quiz: [
      { q: 'Which SQL clause filters rows before grouping?', options: ['HAVING', 'WHERE', 'GROUP BY', 'ORDER BY'], answer: 1 },
      { q: 'Which keyword combines rows from two tables based on a related column?', options: ['UNION', 'JOIN', 'MERGE', 'LINK'], answer: 1 },
      { q: 'What does COUNT(*) return?', options: ['The sum of a column', 'The number of rows', 'The average value', 'The maximum value'], answer: 1 },
      { q: 'Which clause sorts query results?', options: ['SORT BY', 'ORDER BY', 'ARRANGE BY', 'GROUP BY'], answer: 1 },
      { q: 'What does the DISTINCT keyword do?', options: ['Deletes duplicate rows from the table', 'Returns only unique values in the result', 'Sorts results descending', 'Filters null values only'], answer: 1 }
    ]
  },
  {
    id: 'coursera-excel-business',
    title: 'Excel Skills for Business',
    provider: 'Coursera (audit for free)',
    category: 'Data',
    hours: '15 hrs',
    url: 'https://www.coursera.org/specializations/excel',
    quiz: [
      { q: 'Which function adds up a range of cells?', options: ['=TOTAL()', '=SUM()', '=ADD()', '=PLUS()'], answer: 1 },
      { q: 'What does VLOOKUP primarily do?', options: ['Sorts a column', 'Searches for a value and returns related data from another column', 'Deletes duplicate rows', 'Formats currency'], answer: 1 },
      { q: 'Which symbol locks a cell reference when copying a formula?', options: ['#', '$', '%', '&'], answer: 1 },
      { q: 'What is a PivotTable used for?', options: ['Writing macros', 'Summarising and analysing large datasets', 'Spell-checking', 'Password protection'], answer: 1 },
      { q: 'Which chart type is best for showing trends over time?', options: ['Pie chart', 'Line chart', 'Scatter plot only', 'Donut chart'], answer: 1 }
    ]
  },
  {
    id: 'coursera-google-data-analytics',
    title: 'Google Data Analytics Foundations',
    provider: 'Coursera (audit for free)',
    category: 'Data',
    hours: '10 hrs',
    url: 'https://www.coursera.org/professional-certificates/google-data-analytics',
    quiz: [
      { q: 'What is the first step in the data analysis process?', options: ['Visualise', 'Ask questions and define the problem', 'Clean the data', 'Share results'], answer: 1 },
      { q: 'What is "data cleaning"?', options: ['Deleting a whole dataset', 'Fixing or removing incorrect, incomplete or duplicate data', 'Encrypting data', 'Formatting fonts in a report'], answer: 1 },
      { q: 'Which of these is a qualitative data example?', options: ['Customer age', 'Monthly sales figures', 'Customer feedback comments', 'Number of units sold'], answer: 2 },
      { q: 'Why do analysts use data visualisation?', options: ['To hide outliers', 'To make patterns and insights easier to understand', 'To increase file size', 'To replace raw data entirely'], answer: 1 },
      { q: 'What does "data integrity" refer to?', options: ['How fast data loads', 'The accuracy, consistency and reliability of data', 'The color scheme of a dashboard', 'The number of columns in a table'], answer: 1 }
    ]
  },
  {
    id: 'kaggle-data-viz',
    title: 'Intro to Data Visualization',
    provider: 'Kaggle Learn',
    category: 'Data',
    hours: '4 hrs',
    url: 'https://www.kaggle.com/learn/data-visualization',
    quiz: [
      { q: 'Which chart is best for comparing parts of a whole?', options: ['Line chart', 'Pie or donut chart', 'Scatter plot', 'Histogram'], answer: 1 },
      { q: 'What is a common mistake in bar chart design?', options: ['Starting the y-axis at zero', 'Truncating the y-axis to exaggerate differences', 'Labeling the axes', 'Using consistent colors'], answer: 1 },
      { q: 'A scatter plot is most useful for showing:', options: ['A single category\'s total', 'The relationship between two numeric variables', 'A timeline of events', 'Text-based data'], answer: 1 },
      { q: 'What does a histogram show?', options: ['The frequency distribution of a numeric variable', 'A comparison of two categories only', 'Geographic data', 'A ranked list'], answer: 0 },
      { q: 'Why is color choice important in data visualization?', options: ['It has no real impact', 'It affects readability and can mislead if used poorly', 'It only matters for print', 'It should always be random'], answer: 1 }
    ]
  },
  {
    id: 'google-digital-garage-marketing',
    title: 'Digital Marketing Fundamentals',
    provider: 'Google Digital Garage',
    category: 'Business',
    hours: '40 hrs',
    url: 'https://learndigital.withgoogle.com/digitalgarage',
    quiz: [
      { q: 'What does SEO stand for?', options: ['Search Engine Optimisation', 'Site Element Ordering', 'Server Efficiency Output', 'Social Engagement Overview'], answer: 0 },
      { q: 'What is a "conversion" in digital marketing?', options: ['Any website visit', 'A visitor completing a desired action, like a purchase', 'A page loading slowly', 'A social media follow only'], answer: 1 },
      { q: 'Which metric measures the percentage of people who click an ad after seeing it?', options: ['CTR (Click-Through Rate)', 'CPM', 'ROI', 'Bounce rate'], answer: 0 },
      { q: 'What is "content marketing"?', options: ['Paying for banner ads only', 'Creating valuable content to attract and engage an audience', 'Sending unsolicited emails', 'Buying followers'], answer: 1 },
      { q: 'What does "organic reach" mean on social media?', options: ['Reach gained without paid promotion', 'Reach from paid ads only', 'The total number of employees', 'A type of hashtag'], answer: 0 }
    ]
  },
  {
    id: 'alison-financial-literacy',
    title: 'Financial Literacy Basics',
    provider: 'Alison',
    category: 'Business',
    hours: '8 hrs',
    url: 'https://alison.com/courses/financial-literacy',
    quiz: [
      { q: 'What is a "budget"?', options: ['A type of loan', 'A plan for how you will spend and save money', 'A bank statement', 'A tax form'], answer: 1 },
      { q: 'What does "compound interest" mean?', options: ['Interest calculated only on the original amount', 'Interest calculated on both the principal and accumulated interest', 'A one-time bank fee', 'Interest that decreases over time'], answer: 1 },
      { q: 'What is an emergency fund typically used for?', options: ['Luxury purchases', 'Unexpected expenses like medical bills or job loss', 'Daily entertainment', 'Investing in stocks only'], answer: 1 },
      { q: 'What does a good credit score generally help you get?', options: ['Higher taxes', 'Better loan interest rates', 'Free insurance', 'Automatic salary increases'], answer: 1 },
      { q: 'Diversification in investing means:', options: ['Putting all money into one stock', 'Spreading investments across different assets to reduce risk', 'Only saving in cash', 'Borrowing to invest'], answer: 1 }
    ]
  },
  {
    id: 'edx-entrepreneurship',
    title: 'Entrepreneurship Essentials',
    provider: 'edX (audit for free)',
    category: 'Business',
    hours: '12 hrs',
    url: 'https://www.edx.org/learn/entrepreneurship',
    quiz: [
      { q: 'What is a "minimum viable product" (MVP)?', options: ['The final, fully-featured product', 'The simplest version of a product to test an idea', 'A product with no customers', 'A legal business document'], answer: 1 },
      { q: 'Why do startups seek "product-market fit"?', options: ['To match legal requirements', 'To confirm the product satisfies strong market demand', 'To reduce staff', 'To avoid taxes'], answer: 1 },
      { q: 'What is a "pivot" in a startup context?', options: ['Firing the founding team', 'A significant change in business strategy or direction', 'Closing the company', 'Filing for a patent'], answer: 1 },
      { q: 'What does "bootstrapping" a business mean?', options: ['Raising millions from venture capital first', 'Building a business using personal finances with minimal outside help', 'Outsourcing all operations', 'Franchising immediately'], answer: 1 },
      { q: 'A "value proposition" mainly describes:', options: ['The company\'s tax bracket', 'Why a customer should choose your product over alternatives', 'The office location', 'The founder\'s job title'], answer: 1 }
    ]
  },
  {
    id: 'alison-bookkeeping',
    title: 'Bookkeeping & Accounting Basics',
    provider: 'Alison',
    category: 'Business',
    hours: '10 hrs',
    url: 'https://alison.com/courses/bookkeeping',
    quiz: [
      { q: 'What is the basic accounting equation?', options: ['Assets = Liabilities + Equity', 'Profit = Revenue only', 'Assets = Revenue - Expenses', 'Equity = Liabilities only'], answer: 0 },
      { q: 'What does "accounts receivable" represent?', options: ['Money a business owes to suppliers', 'Money owed to the business by customers', 'Cash on hand', 'Employee salaries'], answer: 1 },
      { q: 'What is a balance sheet used for?', options: ['Showing a snapshot of assets, liabilities and equity at a point in time', 'Tracking daily sales only', 'Listing employee names', 'Recording customer complaints'], answer: 0 },
      { q: 'What is "depreciation"?', options: ['An increase in an asset\'s value over time', 'The gradual reduction in value of an asset over time', 'A type of tax refund', 'A bank fee'], answer: 1 },
      { q: 'What does "net profit" mean?', options: ['Total revenue before any expenses', 'Revenue remaining after all expenses are deducted', 'The amount owed to the bank', 'Total assets minus cash'], answer: 1 }
    ]
  },
  {
    id: 'google-uiux-fundamentals',
    title: 'UI/UX Design Fundamentals',
    provider: 'Coursera (audit for free)',
    category: 'Design',
    hours: '18 hrs',
    url: 'https://www.coursera.org/professional-certificates/google-ux-design',
    quiz: [
      { q: 'What does UX stand for?', options: ['User Extension', 'User Experience', 'Universal Exchange', 'Unified Xylography'], answer: 1 },
      { q: 'What is a "wireframe"?', options: ['A finished, high-fidelity design', 'A simple visual outline of a page\'s structure', 'A piece of marketing copy', 'A type of database'], answer: 1 },
      { q: 'What is the purpose of user research in design?', options: ['To guess what looks nice', 'To understand real user needs and behaviours before designing', 'To copy competitor designs exactly', 'To speed up development only'], answer: 1 },
      { q: 'What is "usability testing"?', options: ['Testing server load capacity', 'Observing real users interact with a design to find problems', 'Testing code for bugs only', 'A legal compliance check'], answer: 1 },
      { q: 'Good UI design primarily focuses on:', options: ['Making things look complex', 'Clarity, consistency and ease of interaction', 'Using as many colors as possible', 'Hiding navigation options'], answer: 1 }
    ]
  },
  {
    id: 'canva-graphic-design',
    title: 'Graphic Design Basics',
    provider: 'Canva Design School',
    category: 'Design',
    hours: '6 hrs',
    url: 'https://www.canva.com/designschool/',
    quiz: [
      { q: 'What is "white space" in design?', options: ['Space that must always be colored white', 'Empty space around elements that improves clarity', 'A wasted part of the layout', 'Space reserved for logos only'], answer: 1 },
      { q: 'What does a color "palette" refer to?', options: ['A single font', 'A selected set of colors used consistently in a design', 'A type of image file', 'A page layout grid'], answer: 1 },
      { q: 'Why is font pairing important?', options: ['It has no real effect on design', 'The right combination improves readability and visual hierarchy', 'More fonts always look better', 'It only matters for print'], answer: 1 },
      { q: 'What is "visual hierarchy"?', options: ['Arranging elements to show their order of importance', 'Sorting files alphabetically', 'A rule requiring symmetry', 'A type of color wheel'], answer: 0 },
      { q: 'What file format is best for a logo needing a transparent background?', options: ['JPEG', 'PNG', 'BMP', 'DOCX'], answer: 1 }
    ]
  },
  {
    id: 'alison-public-speaking',
    title: 'Public Speaking & Communication',
    provider: 'Alison',
    category: 'Soft Skills',
    hours: '5 hrs',
    url: 'https://alison.com/courses/public-speaking',
    quiz: [
      { q: 'What is one effective way to manage stage nerves?', options: ['Avoid practising beforehand', 'Practising the speech multiple times beforehand', 'Speaking as fast as possible', 'Reading directly off a script without looking up'], answer: 1 },
      { q: 'What does "active listening" involve?', options: ['Planning your reply while the other person talks', 'Fully concentrating on and understanding the speaker', 'Interrupting to speed things up', 'Only listening to your manager'], answer: 1 },
      { q: 'Why is audience analysis important before a speech?', options: ['It is not important', 'It helps tailor the message to the audience\'s needs and knowledge', 'It only matters for large audiences', 'It replaces the need for a script'], answer: 1 },
      { q: 'What is a strong way to open a presentation?', options: ['Apologising for being unprepared', 'A relevant story, question or striking fact', 'Reading the agenda word for word', 'Long technical definitions'], answer: 1 },
      { q: 'Body language in communication mainly helps to:', options: ['Distract the audience', 'Reinforce and support your spoken message', 'Replace the need to speak clearly', 'Only matters on video calls'], answer: 1 }
    ]
  },
  {
    id: 'alison-time-management',
    title: 'Time Management & Productivity',
    provider: 'Alison',
    category: 'Soft Skills',
    hours: '4 hrs',
    url: 'https://alison.com/courses/time-management',
    quiz: [
      { q: 'What does the Eisenhower Matrix help you prioritise by?', options: ['Alphabetical order', 'Urgency and importance', 'Task length only', 'Who assigned the task'], answer: 1 },
      { q: 'What is "time blocking"?', options: ['Refusing all meetings', 'Scheduling specific blocks of time for specific tasks', 'Working without any breaks', 'Deleting your calendar'], answer: 1 },
      { q: 'What is a common cause of procrastination?', options: ['Having too few tasks', 'Feeling overwhelmed or fearing a task will be difficult', 'Finishing tasks too early', 'Using a to-do list'], answer: 1 },
      { q: 'The "two-minute rule" suggests you should:', options: ['Ignore quick tasks entirely', 'Do a task immediately if it takes two minutes or less', 'Only work in two-minute bursts', 'Delay all tasks by two minutes'], answer: 1 },
      { q: 'Why are SMART goals useful?', options: ['They make goals vague and flexible', 'They make goals Specific, Measurable, Achievable, Relevant and Time-bound', 'They remove the need for deadlines', 'They only apply to businesses'], answer: 1 }
    ]
  },
  {
    id: 'edx-public-health',
    title: 'Public Health Basics',
    provider: 'edX (audit for free)',
    category: 'Health',
    hours: '10 hrs',
    url: 'https://www.edx.org/learn/public-health',
    quiz: [
      { q: 'What is "epidemiology" the study of?', options: ['Individual patient treatment', 'How diseases spread and affect populations', 'Hospital architecture', 'Pharmaceutical pricing only'], answer: 1 },
      { q: 'What does "herd immunity" refer to?', options: ['A single person\'s immune response', 'A population gaining enough immunity to slow disease spread', 'Immunity passed only through breast milk', 'A type of vaccine ingredient'], answer: 1 },
      { q: 'Which of these is a primary prevention measure?', options: ['Treating an illness after diagnosis', 'Vaccination before exposure to a disease', 'Surgery', 'Palliative care'], answer: 1 },
      { q: 'What is a key goal of public health, as opposed to clinical medicine?', options: ['Treating one patient at a time only', 'Improving health outcomes at a population level', 'Selling medication', 'Building hospitals only'], answer: 1 },
      { q: 'What does WASH (in global health) stand for?', options: ['Water, Air, Sanitation and Health', 'Water, Sanitation and Hygiene', 'Waste and Sanitary Handling', 'Wellness and Safe Housing'], answer: 1 }
    ]
  },
  {
    id: 'alison-sustainable-agriculture',
    title: 'Sustainable Agriculture Basics',
    provider: 'Alison',
    category: 'Agriculture',
    hours: '6 hrs',
    url: 'https://alison.com/courses/sustainable-agriculture',
    quiz: [
      { q: 'What is "crop rotation" primarily used to do?', options: ['Grow the same crop every season for consistency', 'Improve soil health and reduce pest build-up by varying crops', 'Increase pesticide use', 'Speed up harvest time only'], answer: 1 },
      { q: 'What does "soil erosion" refer to?', options: ['Soil becoming more fertile over time', 'The wearing away of topsoil by wind or water', 'A method of irrigation', 'A type of fertiliser'], answer: 1 },
      { q: 'Why is drip irrigation considered water-efficient?', options: ['It floods the whole field at once', 'It delivers water slowly and directly to plant roots, reducing waste', 'It only works during the rainy season', 'It replaces the need for soil'], answer: 1 },
      { q: 'What is "agroforestry"?', options: ['Farming only in forests', 'Integrating trees and shrubs into crop and livestock systems', 'Cutting down forests for farmland', 'A type of greenhouse'], answer: 1 },
      { q: 'What is one benefit of composting for smallholder farmers?', options: ['It has no effect on soil', 'It recycles organic waste into nutrient-rich natural fertiliser', 'It replaces the need for water entirely', 'It only works for large commercial farms'], answer: 1 }
    ]
  }
];

const EVENTS = [
  { type: 'Career Fair', title: 'Nairobi Graduate Career Fair', date: '2026-07-18T09:00:00', location: 'KICC, Nairobi' },
  { type: 'Hackathon', title: 'DevFest Nairobi Hackathon', date: '2026-09-10T08:00:00', location: 'iHub, Nairobi' },
  { type: 'Workshop', title: 'CV & LinkedIn Clinic', date: '2026-07-09T14:00:00', location: 'Online' },
  { type: 'Bootcamp', title: 'Data Analysis Weekend Bootcamp', date: '2026-07-25T09:00:00', location: 'Strathmore University' },
  { type: 'Meetup', title: 'Campus Founders Meetup', date: '2026-08-01T17:00:00', location: 'Nairobi Garage' },
  { type: 'University Event', title: 'JKUAT Tech Expo', date: '2026-08-14T10:00:00', location: 'JKUAT, Juja' }
];

const TESTIMONIALS = [
  { quote: 'I applied to an internship on a Monday and had an interview by Friday. CampusConnect made the whole process feel possible.', name: 'Wanjiru Mwangi', role: 'Egerton University · Data Analytics Intern at Safaricom' },
  { quote: 'The filters saved me hours — I could search by county and only see roles near home. Found my attachment in two weeks.', name: 'Brian Otieno', role: 'JKUAT · IT Attachment at KCB Group' },
  { quote: 'The scholarship listings here are more current than anything my university posted on its own noticeboard.', name: 'Amina Hassan', role: 'University of Nairobi · STEM Scholar' },
  { quote: 'As a mentor, I like that students come prepared. The resource hub does a lot of the groundwork before we even talk.', name: 'David Kiptoo', role: 'Alumni Mentor · Product Manager, Nairobi' }
];

const FAQS = [
  { q: 'Is CampusConnect Kenya free for students?', a: 'Yes. Creating an account, searching opportunities and using every resource on this platform is completely free for students.' },
  { q: 'How often are new opportunities added?', a: 'New internships, attachments, scholarships and jobs are added daily by our partnerships team, directly from employer career pages.' },
  { q: 'Do you verify the companies that post here?', a: 'Every listed opportunity is checked against the employer\'s official careers page before publishing, and application links point directly there.' },
  { q: 'Can I apply to opportunities outside my university?', a: 'Yes — every listing on the board is open to students and graduates from any recognised Kenyan university or college.' },
  { q: 'How do I get matched with a mentor?', a: 'Head to the Community section and request a mentor. We match you based on your field of study and career interest within a few days.' },
  { q: 'Can employers post opportunities directly?', a: 'Yes, employers can reach our partnerships team through the Contact section to have verified openings listed on the board.' }
];

const FEED_POSTS = [
  { name: 'Cynthia Njeri', initials: 'CN', time: '2h ago', text: 'Just got an offer from an internship I found here! For anyone still applying — tailor your CV to each role, it genuinely makes a difference.', likes: 142, comments: 18 },
  { name: 'Peter Mutua', initials: 'PM', time: '5h ago', text: 'Does anyone have tips for the NCBA graduate trainee aptitude test? Applying this week and want to prepare properly.', likes: 76, comments: 34 },
  { name: 'Faith Achieng', initials: 'FA', time: '1d ago', text: 'Started the Moringa bootcamp last month through a listing here. Three weeks in and already building real projects. Worth it.', likes: 203, comments: 22 }
];

/* Popular clubs — clicking one opens a modal with its story, achievements,
   and a toggleable "apply to join" form. Add a new club by pushing an
   object here; the sidebar list and modal both read from this array. */
const CLUBS = [
  {
    icon: '💻', name: 'Campus Developers Network', members: '1,240 members', founded: 'Founded 2021',
    story: 'Started as a study group of six computer science students trying to pass a data structures exam together. It\'s now the largest student tech community in the country, running weekly build-nights across more than 20 campuses.',
    achievements: [
      'Placed 300+ members into internships and junior developer roles since 2022.',
      'Won Best Student Community at the Kenya Tech Awards, 2025.',
      'Runs a free 10-week beginner coding track every semester, no laptop-owning requirement.'
    ]
  },
  {
    icon: '📈', name: 'Finance & Investment Society', members: '860 members', founded: 'Founded 2019',
    story: 'Founded by a group of commerce students frustrated that finance theory never touched the Nairobi Securities Exchange. Members now run a real, small student-managed investment portfolio as a teaching tool.',
    achievements: [
      'Student portfolio has returned an average of 11% annually since inception.',
      'Alumni now work at Britam, NCBA and three Nairobi-based investment banks.',
      'Hosts an annual stock-pitch competition judged by practising fund managers.'
    ]
  },
  {
    icon: '🎨', name: 'Product & Design Circle', members: '540 members', founded: 'Founded 2022',
    story: 'Born out of a single Figma workshop that overflowed its 30-seat room. The Circle now pairs design students with real startups needing a fresh set of eyes on their product.',
    achievements: [
      'Redesigned onboarding flows for 12 early-stage Kenyan startups, pro bono.',
      'Three member-led case studies were featured on international design blogs.',
      'Runs a mentorship pipeline directly into product design internships.'
    ]
  },
  {
    icon: '🌱', name: 'AgriTech Innovators', members: '410 members', founded: 'Founded 2020',
    story: 'A cross-disciplinary club pairing agriculture students with engineers to solve real problems on Kenyan farms — from soil sensors to market-access apps.',
    achievements: [
      'Built a low-cost soil moisture sensor now piloted on 40 smallholder farms in Meru.',
      'Finalists, Global AgriTech Student Challenge, 2024.',
      'Secured a KES 2M grant to scale a produce marketplace app built by members.'
    ]
  },
  {
    icon: '🎮', name: 'Gaming & Esports Guild', members: '980 members', founded: 'Founded 2023',
    story: 'What began as a FIFA tournament in a common room is now a full inter-university esports league with its own casting team and sponsor deals.',
    achievements: [
      'Runs the largest inter-university esports league in East Africa.',
      'Signed its first sponsorship deal with a local gaming café chain in 2025.',
      'Sent two teams to a regional Valorant tournament, placing top 4.'
    ]
  },
  {
    icon: '📸', name: 'Photography & Media Club', members: '390 members', founded: 'Founded 2018',
    story: 'A club of self-taught photographers who started by documenting campus events for free — now the go-to student media team for graduations, career fairs and hackathons.',
    achievements: [
      'Official media partner for 3 of the Events listed on this platform.',
      'Member portfolios have led to freelance gigs with local media houses.',
      'Runs a gear-lending library so cost is never the barrier to joining.'
    ]
  },
  {
    icon: '🗣️', name: 'Debate & Public Speaking', members: '620 members', founded: 'Founded 2017',
    story: 'One of the oldest clubs on this list, built on the belief that most graduates lose job offers in the interview room, not the CV stage.',
    achievements: [
      'Kenya University Debate champions, 2023 and 2025.',
      'Runs mandatory interview-simulation nights before every major career fair.',
      'Alumni network includes two sitting county assembly members.'
    ]
  },
  {
    icon: '👩🏽‍💻', name: 'Women in STEM Network', members: '710 members', founded: 'Founded 2019',
    story: 'Founded by four engineering students who were often the only woman in their lecture hall. Now runs the largest women-in-tech mentorship pipeline on the platform.',
    achievements: [
      'Matched 200+ students with women mentors currently working in STEM fields.',
      'Runs an annual scholarship fund covering tuition for 5 students a year.',
      'Partnered with Microsoft ADC and Safaricom on dedicated hiring days.'
    ]
  },
  {
    icon: '🚀', name: 'Entrepreneurship Hub', members: '505 members', founded: 'Founded 2020',
    story: 'A no-fluff startup club — no pitch decks without a working prototype first. Runs a small in-house incubator for early-stage student businesses.',
    achievements: [
      'Incubated 15 student startups, three of which are still trading today.',
      'Raised a combined KES 6M in grants and angel funding for member ventures.',
      'Runs a monthly "Founders\' Friday" open to any registered student.'
    ]
  },
  {
    icon: '⚖️', name: 'Law & Moot Court Society', members: '330 members', founded: 'Founded 2016',
    story: 'A moot court society that treats every session like a real courtroom — because several members have gone on to argue in one.',
    achievements: [
      'National Moot Court champions, 2022, 2024.',
      'Alumni now practising at three of Nairobi\'s top law firms.',
      'Runs free legal-aid clinics for fellow students twice a semester.'
    ]
  }
];

/* ---------------------------------------------------------------
   2. UTILITIES
   ----------------------------------------------------------------*/
function showToast(message, type = 'success'){
  const container = document.getElementById('toastContainer');
  if(!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.borderLeftColor = type === 'error' ? '#C0392B' : 'var(--green)';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('is-leaving');
    setTimeout(() => toast.remove(), 320);
  }, 3200);
}

function debounce(fn, delay = 250){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function formatCountdownUnit(value){
  return String(Math.max(0, value)).padStart(2, '0');
}

/* Escape text before injecting into innerHTML — protects against any data
   string that happens to contain angle-bracket characters breaking the
   surrounding markup (also avoids confusing the browser's HTML parser
   when this file is embedded inline inside a page). */
function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

/* Ripple click effect — attach to any element with class "ripple" */
function initRipples(){
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.ripple');
    if(!target) return;
    const rect = target.getBoundingClientRect();
    const circle = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    circle.className = 'ripple-circle';
    circle.style.width = circle.style.height = `${size}px`;
    circle.style.left = `${e.clientX - rect.left - size / 2}px`;
    circle.style.top = `${e.clientY - rect.top - size / 2}px`;
    target.style.position = target.style.position || 'relative';
    target.style.overflow = 'hidden';
    target.appendChild(circle);
    setTimeout(() => circle.remove(), 650);
  });
}

/* Generic toast trigger for elements with data-toast="message" */
function initDataToastButtons(){
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-toast]');
    if(!target) return;
    showToast(target.dataset.toast);
  });
}

/* ---------------------------------------------------------------
   3. LOADER
   ----------------------------------------------------------------*/
function initLoader(){
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('is-hidden'), 700);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => loader.classList.add('is-hidden'), 2500);
}

/* ---------------------------------------------------------------
   4. THEME (DARK / LIGHT MODE)
   ----------------------------------------------------------------*/
function initTheme(){
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('cck-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  if(initial === 'dark') root.setAttribute('data-theme', 'dark');

  toggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if(isDark){
      root.removeAttribute('data-theme');
      localStorage.setItem('cck-theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('cck-theme', 'dark');
    }
  });
}

/* ---------------------------------------------------------------
   5. NAVIGATION
   ----------------------------------------------------------------*/
function initNav(){
  const nav = document.getElementById('siteNav');
  const progress = document.getElementById('scrollProgress');
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    const scrollTop = window.scrollY;
    nav.classList.toggle('is-scrolled', scrollTop > 40);
    backToTop.hidden = scrollTop < 500;

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = `${pct}%`;
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger.addEventListener('click', () => {
    links.classList.toggle('is-open');
    burger.classList.toggle('is-open');
  });
  links.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      burger.classList.remove('is-open');
    });
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('scrollCue')?.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------------
   6. CURSOR GLOW
   ----------------------------------------------------------------*/
function initCursorGlow(){
  const glow = document.getElementById('cursorGlow');
  if(!glow || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.addEventListener('mousemove', (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    glow.classList.add('is-active');
  });
  document.addEventListener('mouseleave', () => glow.classList.remove('is-active'));
}

/* ---------------------------------------------------------------
   7. SCROLL REVEAL
   ----------------------------------------------------------------*/
function initScrollReveal(){
  const items = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  items.forEach(item => observer.observe(item));
}

/* Re-observe newly injected reveal items (cards rendered after initial load) */
function observeReveal(container){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  container.querySelectorAll('[data-reveal]').forEach(item => observer.observe(item));
}

/* ---------------------------------------------------------------
   8. ANIMATED COUNTERS (STATS)
   ----------------------------------------------------------------*/
function renderStats(){
  const grid = document.getElementById('statsGrid');
  grid.innerHTML = STATS.map((stat, i) => `
    <div class="stat-card reveal" data-reveal style="transition-delay:${i * 60}ms">
      <div class="stat-card__value" data-target="${stat.value}" data-suffix="${stat.suffix}">0</div>
      <div class="stat-card__label">${stat.label}</div>
    </div>
  `).join('');
  observeReveal(grid);

  const counters = grid.querySelectorAll('.stat-card__value');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));
}

function animateCounter(el){
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();

  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = value.toLocaleString() + suffix;
    if(progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString() + suffix;
  }
  requestAnimationFrame(tick);
}

/* ---------------------------------------------------------------
   9. OPPORTUNITIES
   ----------------------------------------------------------------*/
const oppState = {
  query: '',
  activeFilter: 'All',
  sort: 'latest',
  visibleCount: 6,
  saved: new Set(),
  bookmarked: new Set()
};

function daysUntil(dateStr){
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function matchesFilter(opp, filter){
  if(filter === 'All') return true;
  if(filter === 'Remote') return opp.workMode === 'Remote';
  if(filter === 'Part-time') return opp.category === 'Campus Job' || opp.category === 'Remote Job';
  if(filter === 'Full-time') return opp.category === 'Graduate Programme' || opp.category === 'Remote Job';
  return opp.category.toLowerCase().includes(filter.toLowerCase());
}

function getFilteredOpportunities(){
  const q = oppState.query.trim().toLowerCase();
  let list = OPPORTUNITIES.filter(opp => {
    const searchable = `${opp.position} ${opp.company} ${opp.skills.join(' ')} ${opp.location} ${opp.category}`.toLowerCase();
    const matchesQuery = !q || searchable.includes(q);
    return matchesQuery && matchesFilter(opp, oppState.activeFilter);
  });

  switch(oppState.sort){
    case 'deadline':
      list = list.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      break;
    case 'salary':
      list = list.sort((a, b) => b.salaryValue - a.salaryValue);
      break;
    case 'popularity':
      list = list.sort((a, b) => b.popularity - a.popularity);
      break;
    default:
      list = list.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
  }
  return list;
}

function workModeBadgeClass(mode){
  if(mode === 'Remote') return 'badge--remote';
  if(mode === 'Hybrid') return 'badge--hybrid';
  return 'badge--physical';
}

function oppCardTemplate(opp){
  const remaining = daysUntil(opp.deadline);
  const deadlineLabel = remaining <= 0 ? 'Closing today' : `${remaining} day${remaining === 1 ? '' : 's'} left`;
  const isSaved = oppState.saved.has(opp.id);
  const isBookmarked = oppState.bookmarked.has(opp.id);

  return `
    <article class="opp-card reveal" data-reveal>
      <div class="opp-card__top">
        <div class="opp-card__logo" style="background:linear-gradient(145deg, ${getCompanyColor(opp.company)[0]}, ${getCompanyColor(opp.company)[1]})">
          <img src="${companyLogoPath(opp.company)}" alt="${opp.company} logo" width="46" height="46" loading="lazy"
               onerror="this.onerror=null;this.src='default.svg';" />
        </div>
        <div>
          <p class="opp-card__company">${opp.company}</p>
          <h3 class="opp-card__position">${opp.position}</h3>
        </div>
      </div>

      <div class="opp-card__badges">
        <span class="badge badge--category">${opp.category}</span>
        <span class="badge ${workModeBadgeClass(opp.workMode)}">${opp.workMode}</span>
      </div>

      <div class="opp-card__meta">
        <span><svg viewBox="0 0 24 24"><path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>${opp.location}</span>
        <span><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>Deadline: ${new Date(opp.deadline).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })} · ${deadlineLabel}</span>
        <span><svg viewBox="0 0 24 24"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>${opp.salary}</span>
      </div>

      <div class="opp-card__skills">
        ${opp.skills.map(s => `<span class="skill-pill">${s}</span>`).join('')}
      </div>

      <div class="opp-card__actions">
        <a href="${opp.applyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm ripple apply-btn" data-id="${opp.id}">Apply Now</a>
        <button class="icon-btn save-btn ${isSaved ? 'is-saved' : ''}" data-id="${opp.id}" aria-label="Save opportunity" title="Save">
          <svg viewBox="0 0 24 24"><path d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z"/></svg>
        </button>
        <button class="icon-btn bookmark-btn ${isBookmarked ? 'is-bookmarked' : ''}" data-id="${opp.id}" aria-label="Bookmark opportunity" title="Bookmark">
          <svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.8 1.4 6.8L12 17.6 5.9 20.7l1.4-6.8-5.1-4.8 6.9-.8z"/></svg>
        </button>
        <button class="icon-btn share-btn" data-id="${opp.id}" aria-label="Share opportunity" title="Share">
          <svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.6l6.8-3.8M8.6 13.4l6.8 3.8"/></svg>
        </button>
      </div>
    </article>
  `;
}

function skeletonTemplate(){
  return `
    <div class="skeleton-card">
      <div style="display:flex;align-items:center;gap:12px;">
        <div class="skeleton-circle"></div>
        <div style="flex:1;"><div class="skeleton-line w-60"></div></div>
      </div>
      <div class="skeleton-line w-80"></div>
      <div class="skeleton-line w-40"></div>
      <div class="skeleton-line w-60"></div>
    </div>
  `;
}

function renderFilterChips(){
  const row = document.getElementById('filterRow');
  row.innerHTML = FILTER_TAGS.map(tag => `
    <button class="filter-chip ${tag === oppState.activeFilter ? 'is-active' : ''}" data-filter="${tag}">${tag}</button>
  `).join('');

  row.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      oppState.activeFilter = chip.dataset.filter;
      oppState.visibleCount = 6;
      renderFilterChips();
      renderOpportunities();
    });
  });
}

function renderOpportunities(){
  const grid = document.getElementById('oppGrid');
  const empty = document.getElementById('oppEmpty');
  const countLabel = document.getElementById('resultCount');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  const filtered = getFilteredOpportunities();
  const visible = filtered.slice(0, oppState.visibleCount);

  countLabel.textContent = `${filtered.length} opportunit${filtered.length === 1 ? 'y' : 'ies'} found`;

  if(filtered.length === 0){
    grid.innerHTML = '';
    empty.hidden = false;
    loadMoreBtn.style.display = 'none';
    return;
  }

  empty.hidden = true;
  grid.innerHTML = visible.map(oppCardTemplate).join('');
  observeReveal(grid);

  loadMoreBtn.style.display = visible.length < filtered.length ? 'inline-flex' : 'none';
}

function loadOpportunitiesWithSkeleton(){
  const grid = document.getElementById('oppGrid');
  grid.innerHTML = Array.from({ length: 6 }).map(skeletonTemplate).join('');
  setTimeout(renderOpportunities, 650);
}

function initOpportunities(){
  renderFilterChips();
  loadOpportunitiesWithSkeleton();

  document.getElementById('searchInput').addEventListener('input', debounce((e) => {
    oppState.query = e.target.value;
    oppState.visibleCount = 6;
    renderOpportunities();
  }, 300));

  document.getElementById('sortSelect').addEventListener('change', (e) => {
    oppState.sort = e.target.value;
    renderOpportunities();
  });

  document.getElementById('loadMoreBtn').addEventListener('click', () => {
    oppState.visibleCount += 6;
    renderOpportunities();
  });

  document.getElementById('oppGrid').addEventListener('click', (e) => {
    const saveBtn = e.target.closest('.save-btn');
    const bookmarkBtn = e.target.closest('.bookmark-btn');
    const shareBtn = e.target.closest('.share-btn');
    const applyBtn = e.target.closest('.apply-btn');

    if(saveBtn){
      const id = saveBtn.dataset.id;
      if(oppState.saved.has(id)){ oppState.saved.delete(id); saveBtn.classList.remove('is-saved'); showToast('Removed from saved opportunities'); }
      else { oppState.saved.add(id); saveBtn.classList.add('is-saved'); showToast('Opportunity saved'); }
    }
    if(bookmarkBtn){
      const id = bookmarkBtn.dataset.id;
      if(oppState.bookmarked.has(id)){ oppState.bookmarked.delete(id); bookmarkBtn.classList.remove('is-bookmarked'); }
      else { oppState.bookmarked.add(id); bookmarkBtn.classList.add('is-bookmarked'); showToast('Bookmarked for later'); }
    }
    if(shareBtn){
      const opp = OPPORTUNITIES.find(o => o.id === shareBtn.dataset.id);
      const shareText = `${opp.position} at ${opp.company} — ${opp.applyUrl}`;
      if(navigator.share){
        navigator.share({ title: opp.position, text: shareText, url: opp.applyUrl }).catch(() => {});
      } else if(navigator.clipboard){
        navigator.clipboard.writeText(shareText);
        showToast('Link copied to clipboard');
      }
    }
    if(applyBtn){
      showToast('Opening application in a new tab…');
    }
  });
}

/* ---------------------------------------------------------------
   10. RESOURCES
   ----------------------------------------------------------------*/
function renderResources(){
  const grid = document.getElementById('resourceGrid');
  grid.innerHTML = RESOURCES.map((r, i) => `
    <button class="resource-card reveal" data-reveal data-resource-index="${i}" style="transition-delay:${(i % 4) * 60}ms">
      <span class="resource-card__icon">${r.icon}</span>
      <h4>${r.title}</h4>
      <p>${r.desc}</p>
      <span class="resource-card__cue">Open guide →</span>
    </button>
  `).join('');
  observeReveal(grid);

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.resource-card');
    if(!card) return;
    openResourceModal(parseInt(card.dataset.resourceIndex, 10));
  });
}

/* ---------------------------------------------------------------
   10b. RESOURCE MODAL (steps + notes for each resource)
   ----------------------------------------------------------------*/
function openResourceModal(index){
  const r = RESOURCES[index];
  if(!r) return;

  // The "Free Courses" card opens the full course catalog + test + certificate
  // flow instead of the generic steps/notes guide.
  if(r.title === 'Free Courses'){
    openCourseModal();
    return;
  }

  const modal = document.getElementById('resourceModal');
  const iconEl = document.getElementById('resourceModalIcon');
  const titleEl = document.getElementById('resourceModalTitle');
  const descEl = document.getElementById('resourceModalDesc');
  const stepsEl = document.getElementById('resourceModalSteps');
  const notesEl = document.getElementById('resourceModalNotes');

  iconEl.textContent = r.icon;
  titleEl.textContent = r.title;
  descEl.textContent = r.desc;

  stepsEl.innerHTML = r.steps.map((s, i) => `
    <li class="modal-step">
      <span class="modal-step__num">${i + 1}</span>
      <div>
        <strong>${s.title}</strong>
        <p>${s.desc}</p>
      </div>
    </li>
  `).join('');

  notesEl.innerHTML = r.notes.map(n => `<li>${n}</li>`).join('');

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.resource-modal__close').focus();
}

function closeResourceModal(){
  const modal = document.getElementById('resourceModal');
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

function initResourceModal(){
  const modal = document.getElementById('resourceModal');
  modal.querySelector('.resource-modal__close').addEventListener('click', closeResourceModal);
  modal.querySelector('.resource-modal__backdrop').addEventListener('click', closeResourceModal);
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal.classList.contains('is-open')) closeResourceModal();
  });
}

/* ---------------------------------------------------------------
   10c. FREE COURSES: CATALOG + CERTIFICATION TEST + CERTIFICATE
   Flow: course catalog -> pick a course -> 5-question test ->
   score 80%+ (4/5) to pass -> enter name -> canvas certificate.
   ----------------------------------------------------------------*/
const courseState = {
  category: 'All',
  activeCourseId: null,
  activeModuleIndex: 0,
  lastScorePct: 0
};

function renderCourseFilters(){
  const categories = ['All', ...new Set(FREE_COURSES.map(c => c.category))];
  const row = document.getElementById('courseFilterRow');
  row.innerHTML = categories.map(cat => `
    <button class="filter-chip ${cat === courseState.category ? 'is-active' : ''}" data-course-filter="${cat}">${cat}</button>
  `).join('');
  row.querySelectorAll('[data-course-filter]').forEach(chip => {
    chip.addEventListener('click', () => {
      courseState.category = chip.dataset.courseFilter;
      renderCourseFilters();
      renderCourseList();
    });
  });
}

function renderCourseList(){
  const list = document.getElementById('courseList');
  const courses = FREE_COURSES.filter(c => courseState.category === 'All' || c.category === courseState.category);
  list.innerHTML = courses.map(c => {
    const progress = getCourseProgress(c.id);
    const pct = courseCoveragePct(c.id);
    const statusBadge = progress.passed
      ? `<span class="course-row__status course-row__status--certified">&#10003; Certified</span>`
      : `<span class="course-row__status">${pct}% covered</span>`;
    return `
    <div class="course-row">
      <span class="course-row__badge">${c.category}</span>
      <div class="course-row__info">
        <h5>${c.title}</h5>
        <span>${c.provider} &middot; ${c.hours} &middot; ${getCourseModules(c).length} modules + test</span>
        <div class="course-row__progress">
          <div class="course-row__progress-track"><div class="course-row__progress-fill" style="width:${pct}%"></div></div>
          ${statusBadge}
        </div>
      </div>
      <div class="course-row__actions">
        <a href="${c.url}" target="_blank" rel="noopener noreferrer" class="btn btn--outline btn--sm ripple">View course</a>
        <button class="btn btn--primary btn--sm ripple" data-start-course="${c.id}">${pct > 0 && pct < 100 ? 'Continue' : 'Start course'}</button>
      </div>
    </div>
  `;
  }).join('');
}

function openCourseModal(){
  renderCourseFilters();
  renderCourseList();
  const modal = document.getElementById('courseModal');
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeCourseModal(){
  document.getElementById('courseModal').classList.remove('is-open');
  document.body.style.overflow = '';
}

function initCourseModal(){
  const modal = document.getElementById('courseModal');
  modal.querySelector('.course-modal__close').addEventListener('click', closeCourseModal);
  modal.querySelector('.course-modal__backdrop').addEventListener('click', closeCourseModal);
  document.getElementById('courseList').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-start-course]');
    if(!btn) return;
    closeCourseModal();
    openLearnModal(btn.dataset.startCourse);
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal.classList.contains('is-open')) closeCourseModal();
  });
}

/* --- Learning modal: notes/resources per module, Cisco NetAcad-style
   coverage tracking. The certification test only unlocks once every
   module in the course has been marked complete. --- */
function renderLearnModal(){
  const course = FREE_COURSES.find(c => c.id === courseState.activeCourseId);
  if(!course) return;
  const modules = getCourseModules(course);
  const progress = getCourseProgress(course.id);
  const pct = courseCoveragePct(course.id);
  const mi = courseState.activeModuleIndex;
  const currentModule = modules[mi];

  document.getElementById('learnModalTitle').textContent = course.title;
  document.getElementById('learnModalMeta').textContent = `${course.category} · ${course.provider} · ${course.hours}`;

  document.getElementById('learnProgressPct').textContent = `${pct}%`;
  document.getElementById('learnProgressFill').style.width = `${pct}%`;
  document.getElementById('learnProgressLabel').textContent = `Course coverage — ${progress.completed.filter(Boolean).length} of ${modules.length} modules complete`;

  document.getElementById('learnStepper').innerHTML = modules.map((m, i) => `
    <button class="learn-step ${i === mi ? 'is-active' : ''} ${progress.completed[i] ? 'is-done' : ''}" data-module-index="${i}">
      <span class="learn-step__num">${progress.completed[i] ? '&#10003;' : i + 1}</span>
      <span class="learn-step__label">${m.title}</span>
    </button>
  `).join('');

  document.getElementById('learnModuleTitle').textContent = `Module ${mi + 1}: ${currentModule.title}`;
  document.getElementById('learnModuleNotes').innerHTML = currentModule.notes.map(n => `<li>${escapeHtml(n)}</li>`).join('');

  const isLast = mi === modules.length - 1;
  const allDone = progress.completed.every(Boolean);
  const markBtn = document.getElementById('learnMarkBtn');
  const testBtn = document.getElementById('learnTestBtn');
  const lockNote = document.getElementById('learnLockNote');

  markBtn.textContent = progress.completed[mi]
    ? (isLast ? 'Completed — review test status below' : 'Completed — go to next module')
    : (isLast ? 'Mark complete & finish' : 'Mark complete & continue');
  markBtn.hidden = progress.completed[mi] && isLast;

  testBtn.hidden = !allDone;
  lockNote.hidden = allDone;
  if(!allDone){
    const remaining = progress.completed.filter(v => !v).length;
    lockNote.textContent = `Complete all ${modules.length} modules to unlock the certification test — ${remaining} to go.`;
  }
}

function openLearnModal(courseId){
  courseState.activeCourseId = courseId;
  const progress = getCourseProgress(courseId);
  // Resume at the first incomplete module, or the last module if all are done
  const firstIncomplete = progress.completed.findIndex(v => !v);
  courseState.activeModuleIndex = firstIncomplete === -1 ? progress.completed.length - 1 : firstIncomplete;

  renderLearnModal();
  const modal = document.getElementById('learnModal');
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeLearnModal(){
  document.getElementById('learnModal').classList.remove('is-open');
  document.body.style.overflow = '';
}

function initLearnModal(){
  const modal = document.getElementById('learnModal');
  modal.querySelector('.learn-modal__close').addEventListener('click', closeLearnModal);
  modal.querySelector('.learn-modal__backdrop').addEventListener('click', closeLearnModal);
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal.classList.contains('is-open')) closeLearnModal();
  });

  document.getElementById('learnStepper').addEventListener('click', (e) => {
    const btn = e.target.closest('.learn-step');
    if(!btn) return;
    courseState.activeModuleIndex = parseInt(btn.dataset.moduleIndex, 10);
    renderLearnModal();
  });

  document.getElementById('learnMarkBtn').addEventListener('click', () => {
    const course = FREE_COURSES.find(c => c.id === courseState.activeCourseId);
    const modules = getCourseModules(course);
    const progress = getCourseProgress(course.id);
    progress.completed[courseState.activeModuleIndex] = true;
    setCourseProgress(course.id, progress);

    if(courseState.activeModuleIndex < modules.length - 1){
      courseState.activeModuleIndex += 1;
    }
    renderLearnModal();

    if(progress.completed.every(Boolean)){
      showToast('Course fully covered — the certification test is unlocked!');
    }
  });

  document.getElementById('learnTestBtn').addEventListener('click', () => {
    const course = FREE_COURSES.find(c => c.id === courseState.activeCourseId);
    const progress = getCourseProgress(course.id);
    // Strict gate, checked again here in case state was tampered with client-side
    if(!progress.completed.every(Boolean)){
      showToast('Complete every module first — the test is still locked.', 'error');
      return;
    }
    closeLearnModal();
    openQuiz(course.id);
  });
}

/* --- Quiz --- */
function openQuiz(courseId){
  const course = FREE_COURSES.find(c => c.id === courseId);
  if(!course) return;

  // Strict gate: the test cannot be opened until every module is complete
  const progress = getCourseProgress(courseId);
  if(!progress.completed.every(Boolean)){
    showToast('Finish all course modules before taking the test.', 'error');
    openLearnModal(courseId);
    return;
  }

  courseState.activeCourseId = courseId;

  document.getElementById('quizModalTitle').textContent = course.title;
  document.getElementById('quizForm').hidden = false;
  document.getElementById('quizResult').hidden = true;

  document.getElementById('quizQuestions').innerHTML = course.quiz.map((q, qi) => `
    <div class="quiz-question">
      <p>${qi + 1}. ${escapeHtml(q.q)}</p>
      <div class="quiz-options">
        ${q.options.map((opt, oi) => `
          <label class="quiz-option">
            <input type="radio" name="q${qi}" value="${oi}" required />
            ${escapeHtml(opt)}
          </label>
        `).join('')}
      </div>
    </div>
  `).join('');

  const modal = document.getElementById('quizModal');
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeQuiz(){
  document.getElementById('quizModal').classList.remove('is-open');
  document.body.style.overflow = '';
}

function initQuiz(){
  const modal = document.getElementById('quizModal');
  const form = document.getElementById('quizForm');
  const retryBtn = document.getElementById('quizRetryBtn');
  const certBtn = document.getElementById('quizCertBtn');

  modal.querySelector('.quiz-modal__close').addEventListener('click', closeQuiz);
  modal.querySelector('.quiz-modal__backdrop').addEventListener('click', closeQuiz);
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal.classList.contains('is-open')) closeQuiz();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const course = FREE_COURSES.find(c => c.id === courseState.activeCourseId);
    if(!course) return;

    let correct = 0;
    const options = form.querySelectorAll('.quiz-option');
    course.quiz.forEach((q, qi) => {
      const selected = form.querySelector(`input[name="q${qi}"]:checked`);
      const selectedValue = selected ? parseInt(selected.value, 10) : null;
      if(selectedValue === q.answer) correct++;

      // Visually mark correct / wrong choices for this question
      form.querySelectorAll(`input[name="q${qi}"]`).forEach((input, oi) => {
        const label = input.closest('.quiz-option');
        if(oi === q.answer) label.classList.add('is-correct');
        else if(oi === selectedValue) label.classList.add('is-wrong');
      });
    });

    const pct = Math.round((correct / course.quiz.length) * 100);
    const passed = pct >= 80;
    courseState.lastScorePct = pct;

    // Persist the result — a pass is permanent once earned; best score is tracked too
    const progress = getCourseProgress(course.id);
    progress.bestScore = Math.max(progress.bestScore || 0, pct);
    if(passed) progress.passed = true;
    setCourseProgress(course.id, progress);

    form.hidden = true;
    const result = document.getElementById('quizResult');
    result.hidden = false;
    document.getElementById('quizResultScore').textContent = `${pct}%`;
    document.getElementById('quizResultScore').style.color = passed ? 'var(--green)' : '#C0392B';
    document.getElementById('quizResultMessage').textContent = passed
      ? `Nice — you passed the "${course.title}" test (80% required). Your certificate is unlocked.`
      : `You scored ${correct}/${course.quiz.length} — that's below the strict 80% pass mark (${Math.ceil(course.quiz.length * 0.8)}/${course.quiz.length} needed). No certificate until you clear it — give it another go.`;
    certBtn.hidden = !passed;

    if(navigator.vibrate) navigator.vibrate(passed ? [40] : [20, 60, 20]);
  });

  retryBtn.addEventListener('click', () => {
    openQuiz(courseState.activeCourseId);
  });

  certBtn.addEventListener('click', () => {
    closeQuiz();
    openCertModal();
  });
}

/* --- Certificate --- */
function openCertModal(){
  // Strict gate, enforced again here: no certificate below 80%, no exceptions
  if(courseState.lastScorePct < 80){
    showToast('Certificates require a genuine 80% pass — that test isn\'t cleared yet.', 'error');
    return;
  }
  document.getElementById('certPreview').hidden = true;
  document.getElementById('certForm').hidden = false;
  document.getElementById('certName').value = '';
  const modal = document.getElementById('certModal');
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  document.getElementById('certName').focus();
}

function closeCertModal(){
  document.getElementById('certModal').classList.remove('is-open');
  document.body.style.overflow = '';
}

/* Simple, deterministic string hash — used only to generate a stable-looking
   verification code per (name, course, date), not for any security purpose. */
function simpleHash(str){
  let hash = 0;
  for(let i = 0; i < str.length; i++){
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function drawCertificate(name, courseTitle, scorePct){
  const canvas = document.getElementById('certCanvas');
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const dateStr = new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' });
  const certId = 'CCK-' + simpleHash(`${name}|${courseTitle}|${dateStr}`).toString(36).toUpperCase().slice(0, 7);

  // --- Background wash ---
  const bgGrad = ctx.createLinearGradient(0, 0, w, h);
  bgGrad.addColorStop(0, '#FBF9F3');
  bgGrad.addColorStop(0.55, '#F7F5EF');
  bgGrad.addColorStop(1, '#EDE7D8');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Faint radial glow behind the centre, for depth
  const glow = ctx.createRadialGradient(w / 2, h * 0.4, 40, w / 2, h * 0.4, w * 0.65);
  glow.addColorStop(0, 'rgba(21,122,71,0.06)');
  glow.addColorStop(1, 'rgba(21,122,71,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Faint diagonal watermark texture
  ctx.save();
  ctx.globalAlpha = 0.035;
  ctx.fillStyle = '#0B3D2E';
  ctx.font = '700 22px Georgia, serif';
  ctx.translate(w / 2, h / 2);
  ctx.rotate(-Math.PI / 10);
  for(let y = -h; y < h; y += 46){
    ctx.fillText('CAMPUSCONNECT KENYA  •  CERTIFIED  •  '.repeat(4), -w, y);
  }
  ctx.restore();

  // --- Borders ---
  ctx.strokeStyle = '#0B3D2E';
  ctx.lineWidth = 10;
  ctx.strokeRect(24, 24, w - 48, h - 48);
  ctx.strokeStyle = '#C9A227';
  ctx.lineWidth = 2;
  ctx.strokeRect(42, 42, w - 84, h - 84);
  ctx.lineWidth = 1;
  ctx.strokeRect(50, 50, w - 100, h - 100);

  // Corner flourishes (quarter-circle gold arcs in each corner)
  const corners = [[62, 62, 0], [w - 62, 62, Math.PI / 2], [w - 62, h - 62, Math.PI], [62, h - 62, -Math.PI / 2]];
  ctx.strokeStyle = '#C9A227';
  ctx.lineWidth = 2.5;
  corners.forEach(([cx, cy, rot]) => {
    ctx.beginPath();
    ctx.arc(cx, cy, 22, rot, rot + Math.PI / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 14, rot, rot + Math.PI / 2);
    ctx.stroke();
  });

  ctx.textAlign = 'center';

  // --- Brand mark ---
  ctx.fillStyle = '#0B3D2E';
  ctx.font = '700 22px Georgia, serif';
  ctx.fillText('CAMPUSCONNECT KENYA', w / 2, 108);
  ctx.fillStyle = '#C9A227';
  ctx.font = '13px Arial';
  ctx.fillText('F R O M   C A M P U S   T O   C A R E E R', w / 2, 130);

  // Thin decorative rule under the brand mark
  ctx.strokeStyle = '#C9A227';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 90, 146);
  ctx.lineTo(w / 2 + 90, 146);
  ctx.stroke();

  // --- Title ---
  ctx.fillStyle = '#10231B';
  ctx.font = 'italic 40px Georgia, serif';
  ctx.fillText('Certificate of Completion', w / 2, 210);

  ctx.font = '16px Arial';
  ctx.fillStyle = '#4B5A52';
  ctx.fillText('This certifies that', w / 2, 258);

  // --- Name ---
  ctx.font = '700 44px Georgia, serif';
  ctx.fillStyle = '#157A47';
  ctx.fillText(name, w / 2, 322);
  // Underline flourish beneath the name
  const nameWidth = Math.min(ctx.measureText(name).width + 40, 560);
  ctx.strokeStyle = '#C9A227';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(w / 2 - nameWidth / 2, 338);
  ctx.lineTo(w / 2 + nameWidth / 2, 338);
  ctx.stroke();

  // --- Course ---
  ctx.font = '16px Arial';
  ctx.fillStyle = '#4B5A52';
  ctx.fillText('has met the 80% pass requirement on the certification test for', w / 2, 378);
  ctx.font = '700 25px Georgia, serif';
  ctx.fillStyle = '#10231B';
  ctx.fillText(courseTitle, w / 2, 416);

  // Score badge (rounded pill)
  const badgeText = `SCORE ${scorePct}%`;
  ctx.font = '700 14px Arial';
  const badgeWidth = ctx.measureText(badgeText).width + 36;
  const badgeX = w / 2 - badgeWidth / 2, badgeY = 438, badgeH = 28, radius = 14;
  ctx.beginPath();
  ctx.moveTo(badgeX + radius, badgeY);
  ctx.arcTo(badgeX + badgeWidth, badgeY, badgeX + badgeWidth, badgeY + badgeH, radius);
  ctx.arcTo(badgeX + badgeWidth, badgeY + badgeH, badgeX, badgeY + badgeH, radius);
  ctx.arcTo(badgeX, badgeY + badgeH, badgeX, badgeY, radius);
  ctx.arcTo(badgeX, badgeY, badgeX + badgeWidth, badgeY, radius);
  ctx.closePath();
  ctx.fillStyle = 'rgba(21,122,71,0.12)';
  ctx.fill();
  ctx.strokeStyle = '#157A47';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = '#157A47';
  ctx.fillText(badgeText, w / 2, badgeY + 19);

  // Issue date + verification ID
  ctx.font = '14px Arial';
  ctx.fillStyle = '#4B5A52';
  ctx.fillText(`Issued ${dateStr}  ·  Certificate ID: ${certId}`, w / 2, 495);

  // --- Signature line ---
  ctx.strokeStyle = '#4B5A52';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 130, 560);
  ctx.lineTo(w / 2 + 130, 560);
  ctx.stroke();
  ctx.font = 'italic 20px Georgia, serif';
  ctx.fillStyle = '#10231B';
  ctx.fillText('CampusConnect Kenya', w / 2, 552);
  ctx.font = '13px Arial';
  ctx.fillStyle = '#4B5A52';
  ctx.fillText('Learning Team', w / 2, 578);

  // --- Gold seal with ribbon tails ---
  const sealX = w - 150, sealY = h - 130;
  ctx.save();
  ctx.fillStyle = '#C9A227';
  ctx.beginPath();
  ctx.moveTo(sealX - 20, sealY + 40);
  ctx.lineTo(sealX - 6, sealY + 90);
  ctx.lineTo(sealX + 8, sealY + 66);
  ctx.lineTo(sealX + 22, sealY + 90);
  ctx.lineTo(sealX + 6, sealY + 40);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  const sealGrad = ctx.createRadialGradient(sealX - 12, sealY - 12, 4, sealX, sealY, 48);
  sealGrad.addColorStop(0, '#F2D98A');
  sealGrad.addColorStop(1, '#C9A227');
  ctx.beginPath();
  ctx.arc(sealX, sealY, 46, 0, Math.PI * 2);
  ctx.fillStyle = sealGrad;
  ctx.fill();
  ctx.strokeStyle = '#8A6E15';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 46, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(sealX, sealY, 38, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.font = '700 12px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('VERIFIED', sealX, sealY - 6);
  ctx.font = '700 14px Arial';
  ctx.fillText('80%+', sealX, sealY + 12);
}

function initCertModal(){
  const modal = document.getElementById('certModal');
  const form = document.getElementById('certForm');

  modal.querySelector('.cert-modal__close').addEventListener('click', closeCertModal);
  modal.querySelector('.cert-modal__backdrop').addEventListener('click', closeCertModal);
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal.classList.contains('is-open')) closeCertModal();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('certName').value.trim();
    if(!name) return;

    const course = FREE_COURSES.find(c => c.id === courseState.activeCourseId);
    const courseTitle = course ? course.title : 'CampusConnect Course';

    drawCertificate(name, courseTitle, courseState.lastScorePct);

    form.hidden = true;
    const preview = document.getElementById('certPreview');
    preview.hidden = false;

    const canvas = document.getElementById('certCanvas');
    const downloadBtn = document.getElementById('certDownloadBtn');
    downloadBtn.href = canvas.toDataURL('image/png');
    downloadBtn.download = `CampusConnect-Certificate-${courseTitle.replace(/\s+/g, '-')}.png`;

    fireConfetti(document.getElementById('certPreview'));
    showToast('Certificate generated — download it below');
  });
}

/* Lightweight celebratory confetti — a couple dozen small divs that fall and
   fade using CSS, no external library needed. */
function fireConfetti(container){
  const colors = ['#157A47', '#22A566', '#C9A227', '#E7C567', '#0B3D2E'];
  for(let i = 0; i < 28; i++){
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.4}s`;
    piece.style.animationDuration = `${1.6 + Math.random() * 1.2}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 3200);
  }
}

/* ---------------------------------------------------------------
   11. COMMUNITY FEED
   ----------------------------------------------------------------*/
function renderFeed(){
  const feed = document.getElementById('feedList');
  feed.innerHTML = FEED_POSTS.map(post => `
    <article class="post-card">
      <div class="post-card__head">
        <div class="post-card__avatar">${post.initials}</div>
        <div>
          <p class="post-card__name">${post.name}</p>
          <p class="post-card__meta">${post.time}</p>
        </div>
      </div>
      <p>${post.text}</p>
      <div class="post-card__footer">
        <button class="like-btn" data-count="${post.likes}">👍 <span>${post.likes}</span></button>
        <button>💬 ${post.comments} comments</button>
        <button data-toast="Post shared to your feed">↗ Share</button>
      </div>
    </article>
  `).join('');

  feed.addEventListener('click', (e) => {
    const likeBtn = e.target.closest('.like-btn');
    if(!likeBtn) return;
    const span = likeBtn.querySelector('span');
    const liked = likeBtn.classList.toggle('is-liked');
    const base = parseInt(likeBtn.dataset.count, 10);
    span.textContent = liked ? base + 1 : base;
  });
}

/* ---------------------------------------------------------------
   11b. POPULAR CLUBS + CLUB MODAL (story, achievements, join form)
   ----------------------------------------------------------------*/
function renderClubs(){
  const list = document.getElementById('clubList');
  list.innerHTML = CLUBS.map((club, i) => `
    <li>
      <button class="club-item" data-club-index="${i}">
        <span>${club.icon}</span> ${club.name}
      </button>
    </li>
  `).join('');

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('.club-item');
    if(!btn) return;
    openClubModal(parseInt(btn.dataset.clubIndex, 10));
  });
}

function openClubModal(index){
  const club = CLUBS[index];
  if(!club) return;
  const modal = document.getElementById('clubModal');

  document.getElementById('clubModalIcon').textContent = club.icon;
  document.getElementById('clubModalTitle').textContent = club.name;
  document.getElementById('clubModalMeta').textContent = `${club.members} · ${club.founded}`;
  document.getElementById('clubModalStory').textContent = club.story;
  document.getElementById('clubModalAchievements').innerHTML = club.achievements.map(a => `<li>${a}</li>`).join('');

  // Reset the application form back to its collapsed state each time a new club is opened
  const form = document.getElementById('clubApplyForm');
  const toggle = document.getElementById('clubApplyToggle');
  form.hidden = true;
  form.reset();
  ['clubApplyName', 'clubApplyEmail', 'clubApplyReason'].forEach(id => setClubFieldError(id, ''));
  toggle.textContent = 'Apply to Join';
  toggle.dataset.clubName = club.name;

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.club-modal__close').focus();
}

function closeClubModal(){
  const modal = document.getElementById('clubModal');
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

function setClubFieldError(id, message){
  const input = document.getElementById(id);
  const errorEl = document.querySelector(`[data-error-for="${id}"]`);
  if(!input || !errorEl) return;
  input.closest('.form-field').classList.toggle('has-error', !!message);
  errorEl.textContent = message || '';
}

function initClubModal(){
  const modal = document.getElementById('clubModal');
  const toggle = document.getElementById('clubApplyToggle');
  const form = document.getElementById('clubApplyForm');

  modal.querySelector('.club-modal__close').addEventListener('click', closeClubModal);
  modal.querySelector('.club-modal__backdrop').addEventListener('click', closeClubModal);
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal.classList.contains('is-open')) closeClubModal();
  });

  // "Apply to Join" reveals a second application space — a short join form —
  // right below the club's story and achievements.
  toggle.addEventListener('click', () => {
    const isHidden = form.hidden;
    form.hidden = !isHidden;
    toggle.textContent = isHidden ? 'Hide application form' : 'Apply to Join';
    if(isHidden) form.querySelector('input').focus();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = ['clubApplyName', 'clubApplyEmail', 'clubApplyReason'];
    let valid = true;
    fields.forEach(id => {
      const input = document.getElementById(id);
      if(!input.value.trim()){
        setClubFieldError(id, 'This field is required.');
        valid = false;
      } else if(id === 'clubApplyEmail' && !isValidEmail(input.value)){
        setClubFieldError(id, 'Please enter a valid email address.');
        valid = false;
      } else {
        setClubFieldError(id, '');
      }
    });

    if(!valid){
      showToast('Please fix the highlighted fields', 'error');
      return;
    }

    showToast(`Application sent to ${toggle.dataset.clubName || 'the club'} — they\'ll reach out by email`);
    closeClubModal();
  });

  ['clubApplyName', 'clubApplyEmail', 'clubApplyReason'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => setClubFieldError(id, ''));
  });
}

/* ---------------------------------------------------------------
   12. EVENTS + LIVE COUNTDOWN
   ----------------------------------------------------------------*/
function renderEvents(){
  const grid = document.getElementById('eventsGrid');
  grid.innerHTML = EVENTS.map((ev, i) => `
    <article class="event-card reveal" data-reveal style="transition-delay:${(i % 3) * 60}ms">
      <div class="event-card__banner">
        <span class="event-card__type">${ev.type}</span>
        <h3 class="event-card__title">${ev.title}</h3>
      </div>
      <div class="event-card__body">
        <div class="event-countdown" data-date="${ev.date}">
          <div><strong class="cd-days">00</strong><span>Days</span></div>
          <div><strong class="cd-hours">00</strong><span>Hrs</span></div>
          <div><strong class="cd-mins">00</strong><span>Min</span></div>
          <div><strong class="cd-secs">00</strong><span>Sec</span></div>
        </div>
        <div class="event-card__meta">
          <span>📍 ${ev.location}</span>
          <span>🗓️ ${new Date(ev.date).toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
        </div>
        <button class="btn btn--outline btn--sm ripple" data-toast="You're on the list for ${ev.title}!">Remind me</button>
      </div>
    </article>
  `).join('');
  observeReveal(grid);
  tickCountdowns();
}

function tickCountdowns(){
  const cards = document.querySelectorAll('.event-countdown');
  function update(){
    cards.forEach(card => {
      const target = new Date(card.dataset.date).getTime();
      const diff = target - Date.now();
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      card.querySelector('.cd-days').textContent = formatCountdownUnit(d);
      card.querySelector('.cd-hours').textContent = formatCountdownUnit(h);
      card.querySelector('.cd-mins').textContent = formatCountdownUnit(m);
      card.querySelector('.cd-secs').textContent = formatCountdownUnit(s);
    });
  }
  update();
  setInterval(update, 1000);
}

/* ---------------------------------------------------------------
   13. TESTIMONIALS SLIDER
   ----------------------------------------------------------------*/
function initTestimonials(){
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  let index = 0;

  track.innerHTML = TESTIMONIALS.map((t, i) => `
    <blockquote class="testimonial-slide ${i === 0 ? 'is-active' : ''}">
      <p>&ldquo;${t.quote}&rdquo;</p>
      <cite>${t.name} · ${t.role}</cite>
    </blockquote>
  `).join('');

  dotsWrap.innerHTML = TESTIMONIALS.map((_, i) => `<span class="${i === 0 ? 'is-active' : ''}"></span>`).join('');

  const slides = track.querySelectorAll('.testimonial-slide');
  const dots = dotsWrap.querySelectorAll('span');

  function goTo(i){
    slides[index].classList.remove('is-active');
    dots[index].classList.remove('is-active');
    index = (i + slides.length) % slides.length;
    slides[index].classList.add('is-active');
    dots[index].classList.add('is-active');
  }

  document.getElementById('testimonialPrev').addEventListener('click', () => goTo(index - 1));
  document.getElementById('testimonialNext').addEventListener('click', () => goTo(index + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  setInterval(() => goTo(index + 1), 6000);
}

/* ---------------------------------------------------------------
   14. FAQ ACCORDION
   ----------------------------------------------------------------*/
function initFaq(){
  const accordion = document.getElementById('accordion');
  accordion.innerHTML = FAQS.map((item, i) => `
    <div class="accordion-item ${i === 0 ? 'is-open' : ''}">
      <button class="accordion-item__q">
        ${item.q}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
      </button>
      <div class="accordion-item__a"><p>${item.a}</p></div>
    </div>
  `).join('');

  const items = accordion.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const q = item.querySelector('.accordion-item__q');
    const a = item.querySelector('.accordion-item__a');
    if(item.classList.contains('is-open')) a.style.maxHeight = a.scrollHeight + 'px';

    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      items.forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.accordion-item__a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('is-open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
}

/* ---------------------------------------------------------------
   15. NEWSLETTER + CONTACT FORM VALIDATION
   ----------------------------------------------------------------*/
function isValidEmail(value){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function initNewsletter(){
  const form = document.getElementById('newsletterForm');
  const input = document.getElementById('newsletterEmail');
  const hint = document.getElementById('newsletterHint');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!isValidEmail(input.value)){
      hint.textContent = 'Please enter a valid email address.';
      hint.style.color = '#C0392B';
      return;
    }
    hint.textContent = `You're subscribed with ${input.value}. Karibu!`;
    hint.style.color = 'var(--gold-soft)';
    showToast('Subscribed to the weekly digest');
    form.reset();
  });
}

function initContactForm(){
  const form = document.getElementById('contactForm');
  const fields = ['cName', 'cEmail', 'cSubject', 'cMessage'];

  function setError(id, message){
    const input = document.getElementById(id);
    const errorEl = form.querySelector(`[data-error-for="${id}"]`);
    input.closest('.form-field').classList.toggle('has-error', !!message);
    errorEl.textContent = message || '';
  }

  function validate(){
    let valid = true;
    fields.forEach(id => {
      const input = document.getElementById(id);
      if(!input.value.trim()){
        setError(id, 'This field is required.');
        valid = false;
      } else if(id === 'cEmail' && !isValidEmail(input.value)){
        setError(id, 'Please enter a valid email address.');
        valid = false;
      } else {
        setError(id, '');
      }
    });
    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(validate()){
      showToast('Message sent — we\'ll reply within 2 business days');
      form.reset();
    } else {
      showToast('Please fix the highlighted fields', 'error');
    }
  });

  fields.forEach(id => {
    document.getElementById(id).addEventListener('input', () => setError(id, ''));
  });
}

/* ---------------------------------------------------------------
   16. INIT
   ----------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  initLoader();
  initTheme();
  initNav();
  initCursorGlow();
  initRipples();
  initDataToastButtons();
  initScrollReveal();

  renderStats();
  initOpportunities();
  renderResources();
  initResourceModal();
  initCourseModal();
  initLearnModal();
  initQuiz();
  initCertModal();
  renderFeed();
  renderClubs();
  initClubModal();
  renderEvents();
  initTestimonials();
  initFaq();
  initNewsletter();
  initContactForm();
});
