// ─────────────────────────────────────────────────────────────────────────────
//  services.js — single source of truth for all Accosoft services
//  Used by: Services.jsx, CategoryPage.jsx, Home.jsx, RequestService.jsx
// ─────────────────────────────────────────────────────────────────────────────

export const serviceCategories = [
  {
    slug: 'income-tax',
    title: 'Income Tax',
    shortTitle: 'Income Tax',
    icon: '📄',
    color: '#1A4A73',
    description: 'Complete income tax return filing, TDS compliance, notice handling, and advance tax advisory for individuals and businesses.',
    services: [
      {
        id: 'itr-efiling',
        name: 'ITR e-Filing',
        description: 'File your income tax return online quickly and accurately. We handle document collection, computation, and e-verification for all taxpayer categories.'
      },
      {
        id: 'business-tax-return',
        name: 'Business Tax Return Filing',
        description: 'Comprehensive tax return preparation and filing for businesses of all types — proprietorships, partnerships, LLPs, and companies.'
      },
      {
        id: 'itr-1',
        name: 'ITR-1 (Sahaj) Filing',
        description: 'Simplified return for salaried individuals with income up to ₹50 lakh from salary, one house property, and other sources.'
      },
      {
        id: 'itr-2',
        name: 'ITR-2 Filing',
        description: 'For individuals and HUFs with capital gains, foreign income, or income from more than one house property.'
      },
      {
        id: 'itr-3',
        name: 'ITR-3 Filing',
        description: 'For individuals and HUFs carrying income from a business or profession, including partners in a firm.'
      },
      {
        id: 'itr-4',
        name: 'ITR-4 (Sugam) Filing',
        description: 'Simplified return for small businesses and professionals opting for presumptive taxation under Sections 44AD, 44ADA, or 44AE.'
      },
      {
        id: 'itr-5',
        name: 'ITR-5 Filing',
        description: 'For firms, LLPs, AOPs, BOIs, and other entities not required to file ITR-6 or ITR-7.'
      },
      {
        id: 'itr-6',
        name: 'ITR-6 Filing',
        description: 'For companies (other than those claiming exemption under Section 11 of the Income Tax Act).'
      },
      {
        id: 'itr-7',
        name: 'ITR-7 Filing',
        description: 'For trusts, political parties, research institutions, and other entities claiming exemption under Sections 139(4A) to 139(4F).'
      },
      {
        id: '15ca-15cb',
        name: '15CA / 15CB Filing',
        description: 'Mandatory compliance for foreign remittances. We prepare and file Form 15CA and obtain the CA certificate in Form 15CB.'
      },
      {
        id: 'tan-registration',
        name: 'TAN Registration',
        description: 'Apply for a Tax Deduction Account Number (TAN) required for deducting and depositing TDS/TCS with the government.'
      },
      {
        id: 'tds-return',
        name: 'TDS Return Filing',
        description: 'Timely filing of TDS returns (Form 24Q, 26Q, 27Q, 27EQ) with accurate challan details and PAN reconciliation.'
      },
      {
        id: 'it-notice',
        name: 'Income Tax Notice Reply',
        description: 'Expert analysis and professional drafting of replies to income tax notices, scrutiny orders, and assessment demands.'
      },
      {
        id: 'it-calculator',
        name: 'Income Tax Calculator',
        description: 'Estimate your income tax liability under the old and new tax regimes to make informed financial decisions.'
      },
      {
        id: 'advance-tax',
        name: 'Advance Tax',
        description: 'Compute and schedule advance tax installments to avoid penal interest under Sections 234B and 234C of the Income Tax Act.'
      }
    ]
  },
  {
    slug: 'accounting-auditing',
    title: 'Accounting & Auditing',
    shortTitle: 'Accounting & Audit',
    icon: '📊',
    color: '#F5821F',
    highlighted: true,
    description: 'Watertight bookkeeping, financial auditing, internal controls, statutory reporting, payroll compliance, and executive MIS dashboard services.',
    services: [
      {
        id: 'bookkeeping',
        name: 'Bookkeeping',
        description: 'Precise record-keeping, journal logging, bank reconciliation, and general ledger maintenance for Indian corporate compliance.'
      },
      {
        id: 'accounting-services',
        name: 'Accounting Services',
        description: 'Complete accounting desk support covering accounts receivable/payable management, fixed asset registers, and monthly close workflows.'
      },
      {
        id: 'auditing-assurance',
        name: 'Auditing & Assurance',
        description: 'Independent examination of financial accounts to guarantee credibility, precision, and complete regulatory alignment for your stakeholders.'
      },
      {
        id: 'financial-statement-prep',
        name: 'Financial Statement Preparation',
        description: 'Compilation of Profit & Loss (P&L) statements, Balance Sheets, and Cash Flow logs matching Indian Accounting Standards (AS).'
      },
      {
        id: 'payroll-processing',
        name: 'Payroll Processing',
        description: 'Statutory salary processing, payslip issuance, and monthly employee PF, ESI, and Professional Tax compliance filings.'
      },
      {
        id: 'internal-audit',
        name: 'Internal Audit',
        description: 'In-depth diagnostics of operational systems and controls to detect transactional leakages, mitigate security risks, and prevent fraud.'
      },
      {
        id: 'statutory-audit',
        name: 'Statutory Audit',
        description: 'Mandatory company audits under the Companies Act, 2013, ensuring verified and compliant financial reporting to regulatory bodies.'
      },
      {
        id: 'mis-reporting',
        name: 'MIS Reporting',
        description: 'Customized Management Information System (MIS) reports to track margins, analyze variances, and support strategic growth.'
      }
    ]
  },
  {
    slug: 'gst',
    title: 'Goods & Services Tax',
    shortTitle: 'GST',
    icon: '📋',
    color: '#0B2F52',
    description: 'End-to-end GST registration, return filing, compliance management, and departmental representation services.',
    services: [
      {
        id: 'gst-registration',
        name: 'GST Registration',
        description: 'New GSTIN registration for all business types — proprietorships, LLPs, companies, and trusts — within 3–7 working days with full documentation support.'
      },
      {
        id: 'gst-return-filing',
        name: 'GST Return Filing',
        description: 'Accurate and timely filing of GSTR-1, GSTR-3B, GSTR-4, and GSTR-9 returns. ITC reconciliation included with zero-penalty guarantee.'
      },
      {
        id: 'gst-revocation',
        name: 'GST Revocation',
        description: 'Revoke a GST cancellation order and restore your active GSTIN. We file REG-21, clear pending dues, and represent your case before the GST officer.'
      },
      {
        id: 'gst-amendment',
        name: 'GST Amendment',
        description: 'Modify your GST registration details including address, authorized signatory, trade name, or business constitution via Form REG-14.'
      },
      {
        id: 'gst-notice',
        name: 'GST Notice Reply',
        description: 'Professional drafting and submission of replies to GST show-cause notices, scrutiny orders, demand notices, and audit observations.'
      },
      {
        id: 'gst-lut',
        name: 'GST LUT Form',
        description: 'Apply for a Letter of Undertaking (Form RFD-11) to export goods and services without paying IGST — renewed annually for zero-rated supply continuity.'
      },
      {
        id: 'gst-foreigners',
        name: 'GST Registration for Foreigners',
        description: 'GST registration for foreign entities and non-resident taxable persons (NRTPs) supplying goods or services in India, including OIDAR service providers.'
      },
      {
        id: 'gst-annual-return',
        name: 'GST Annual Return (GSTR-9)',
        description: 'Full-year reconciliation of GSTR-1, GSTR-3B, and books of accounts, followed by accurate GSTR-9 filing before the statutory deadline.'
      },
      {
        id: 'gstr-10',
        name: 'GSTR-10 (Final Return)',
        description: 'Mandatory final return filing within 3 months of GST cancellation or surrender, covering closing stock and tax liability computation.'
      },
      {
        id: 'gstr-9c',
        name: 'GSTR-9C (Reconciliation Statement)',
        description: 'Self-certified reconciliation statement comparing GSTR-9 with audited financials for businesses with aggregate turnover above ₹5 crore.'
      },
      {
        id: 'gst-audit',
        name: 'GST Audit',
        description: 'Internal pre-audit review, document compilation, and expert representation during departmental GST audit proceedings.'
      }
    ]
  },
  {
    slug: 'business-registration',
    title: 'Business Registration',
    shortTitle: 'Business Reg.',
    icon: '🏢',
    color: '#2E6DA4',
    description: 'Incorporate your business with the right structure — private limited, OPC, LLP, or NGO — with complete MCA filing support.',
    services: [
      {
        id: 'pvt-ltd',
        name: 'Business Registration',
        description: 'Register your entity with the right structure — Proprietorship, Partnership, LLP, or Pvt. Ltd. company — with complete MCA and registration support.'
      },
      {
        id: 'opc',
        name: 'One Person Company (OPC) Registration',
        description: 'Incorporate a One Person Company for sole proprietors who want limited liability protection and a formal corporate structure.'
      },
      {
        id: 'public-ltd',
        name: 'Public Limited Company Registration',
        description: 'Register a Public Limited Company to enable wider public investment and larger operations with proper statutory governance.'
      },
      {
        id: 'llp',
        name: 'LLP Registration',
        description: 'Form a Limited Liability Partnership with flexible management, pass-through taxation, and limited liability for all designated partners.'
      },
      {
        id: 'ngo',
        name: 'Society & Trust (NGO) Registration',
        description: 'Register a Society under the Societies Registration Act or a Trust under the Indian Trusts Act for charitable, educational, or social welfare purposes.'
      }
    ]
  },
  {
    slug: 'other-registration',
    title: 'Other Registrations',
    shortTitle: 'Other Reg.',
    icon: '🔖',
    color: '#64748B',
    description: 'Specialized registrations, licenses, and professional services for NGOs, exporters, startups, and growing businesses.',
    services: [
      {
        id: '80g-12a',
        name: '80G & 12A Registration',
        description: 'Obtain 80G and 12A income tax exemption certificates for your NGO to offer tax benefits to donors and attract larger contributions.'
      },
      {
        id: 'msme',
        name: 'MSME Registration (Udyam)',
        description: 'Register your business under Udyam to access MSME government subsidies, priority sector lending, and collateral-free loan schemes.'
      },
      {
        id: 'trademark',
        name: 'Trademark Registration',
        description: 'Protect your brand name, logo, or tagline with official trademark registration under the Trade Marks Act, 1999.'
      },
      {
        id: 'iec',
        name: 'IEC Registration',
        description: 'Obtain an Import Export Code (IEC) from DGFT — mandatory for any business engaged in international trade of goods or services.'
      },
      {
        id: 'finance',
        name: 'Finance Services',
        description: 'Business loan assistance, working capital facilitation, project report preparation, and credit facility guidance for banks and NBFCs.'
      },
      {
        id: 'startup',
        name: 'Startup Service',
        description: 'DPIIT recognition, Startup India registration, and guidance on tax exemptions, angel fund schemes, and government startup benefits.'
      }
    ]
  },
  {
    slug: 'financial-planning',
    title: 'Financial Planning',
    shortTitle: 'Financial Planning',
    icon: '💰',
    color: '#1B6B3A',
    description: 'Insurance and mutual fund planning tailored to your goals.',
    subCategories: [
      {
        name: 'Insurance',
        items: [
          { name: 'Life Insurance (LIC India)', description: 'Life coverage plans from LIC India to protect your family\'s financial future.' },
          { name: 'TATA AIA – Term Insurance', description: 'High-cover term insurance plans from TATA AIA for comprehensive protection.' }
        ]
      },
      {
        name: 'Wealth Planning',
        items: [
          { name: 'Mutual Funds', description: 'Goal-based mutual fund investments in partnership with NJ Wealth.' }
        ]
      }
    ],
    services: [
      { id: 'life-insurance', name: 'Life Insurance (LIC India)', description: 'Life coverage plans from LIC India.' },
      { id: 'tata-aia-term', name: 'TATA AIA – Term Insurance', description: 'High-cover term insurance from TATA AIA.' },
      { id: 'mutual-funds', name: 'Mutual Funds (NJ Wealth)', description: 'Goal-based mutual fund investments in partnership with NJ Wealth.' }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
//  Flat servicesData array for backward compatibility
//  (used by Home.jsx preview section and RequestService.jsx dropdown)
// ─────────────────────────────────────────────────────────────────────────────
export const servicesData = serviceCategories.flatMap((cat, catIdx) =>
  cat.services.map((svc, svcIdx) => {
    const imgIndex1 = ((catIdx + svcIdx) % 6) + 1;
    const imgIndex2 = ((catIdx + svcIdx + 1) % 6) + 1;
    return {
      id: svc.id,
      title: svc.name,
      category: cat.slug,
      categoryTitle: cat.title,
      shortDesc: svc.description,
      description: svc.description,
      features: [],
      images: [
        `/images/photo${imgIndex1}.jpg`,
        `/images/photo${imgIndex2}.jpg`
      ]
    };
  })
);
export default servicesData;
