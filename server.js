const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const programs = [
  {
    icon: '🎓',
    title: 'Education Access',
    description: 'Scholarships, digital learning, and school continuity support for children and youth.'
  },
  {
    icon: '🩺',
    title: 'Health & Wellness',
    description: 'Community screenings, nutrition care, and mental health outreach in underserved areas.'
  },
  {
    icon: '💼',
    title: 'Livelihood Support',
    description: 'Skills training, micro-enterprise guidance, and income-focused community programs.'
  },
  {
    icon: '👩‍💼',
    title: 'Women Empowerment',
    description: 'Leadership mentoring, support circles, and financial inclusion for women-led households.'
  },
  {
    icon: '🌍',
    title: 'Climate Resilience',
    description: 'Water security, climate-smart agriculture, and local disaster resilience planning.'
  },
  {
    icon: '🤲',
    title: 'Emergency Relief',
    description: 'Rapid aid delivery, food access, shelter support, and crisis response assistance.'
  }
];

const impactStats = [
  { value: '12k+', label: 'People reached through direct support' },
  { value: '5,800', label: 'Students supported with education aid' },
  { value: '310', label: 'Women-led businesses accelerated' },
  { value: '89', label: 'Community volunteers mobilized' }
];

const testimonials = [
  {
    quote: 'The health camp gave my daughter treatment we could never afford. Now she is back in school and smiling again.',
    author: 'Rahima, community parent'
  },
  {
    quote: 'I learned tailoring skills and opened a home-based business. This support changed my family’s future.',
    author: 'Salma, entrepreneur'
  },
  {
    quote: 'The volunteers listened to our needs and started local action. The community feels stronger and more hopeful.',
    author: 'Abul Kalam, village leader'
  }
];

const donations = [];
const volunteers = [];

app.get('/api/site', (req, res) => {
  res.json({
    name: 'Shamaj Unnayan Foundation',
    tagline: 'Building stronger futures, together.',
    location: 'Dhaka, Bangladesh',
    updatedAt: new Date().toISOString()
  });
});

app.get('/api/programs', (req, res) => {
  res.json(programs);
});

app.get('/api/impact', (req, res) => {
  res.json(impactStats);
});

app.get('/api/testimonials', (req, res) => {
  res.json(testimonials);
});

app.get('/api/dashboard', (req, res) => {
  res.json({
    totalDonations: donations.length,
    volunteerCount: volunteers.length,
    activePrograms: programs.length,
    impactScore: '84%'
  });
});

app.post('/api/donate', (req, res) => {
  const { fullName, email, amount, campaign } = req.body || {};

  if (!fullName || !email || !amount || !campaign) {
    return res.status(400).json({ success: false, message: 'All donation fields are required.' });
  }

  const record = { fullName, email, amount, campaign, createdAt: new Date().toISOString() };
  donations.push(record);

  res.status(201).json({
    success: true,
    message: 'Thank you for your support. Your donation has been recorded successfully.',
    record
  });
});

app.post('/api/volunteer', (req, res) => {
  const { fullName, email, interest, message } = req.body || {};

  if (!fullName || !email || !interest) {
    return res.status(400).json({ success: false, message: 'Name, email, and interest are required.' });
  }

  const record = { fullName, email, interest, message: message || '', createdAt: new Date().toISOString() };
  volunteers.push(record);

  res.status(201).json({
    success: true,
    message: 'Thanks for volunteering. Our team will contact you soon.',
    record
  });
});

app.use(express.static(path.join(__dirname)));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Foundation app listening on http://localhost:${PORT}`);
});
