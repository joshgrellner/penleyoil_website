import { z } from 'zod';

// Step 1: Company Info
export const companyInfoSchema = z.object({
  legalName: z.string().min(2, 'Legal name is required'),
  dba: z.string().optional(),
  entityType: z.enum(['Sole Proprietor', 'LLC', 'Corporation', 'Partnership', 'Other']),
  fein: z.string().regex(/^\d{2}-?\d{7}$/, 'Invalid FEIN format (XX-XXXXXXX)'),
  yearsInBusiness: z.number().min(0).max(200),
  billingAddress: z.object({
    street: z.string().min(3, 'Street address required'),
    city: z.string().min(2, 'City required'),
    state: z.string().length(2, 'State code required'),
    zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  }),
  apContact: z.object({
    name: z.string().min(2, 'Contact name required'),
    email: z.string().email('Valid email required'),
    phone: z.string().regex(/^\+?1?\d{10,}$/, 'Valid phone required'),
  }),
  poRequired: z.boolean(),
});

// Step 2: Owners/Principals
export const ownerSchema = z.object({
  name: z.string().min(2, 'Name required'),
  title: z.string().min(2, 'Title required'),
  homeAddress: z.object({
    street: z.string().min(3),
    city: z.string().min(2),
    state: z.string().length(2),
    zip: z.string().regex(/^\d{5}(-\d{4})?$/),
  }),
  ownershipPercent: z.number().min(0).max(100),
  phone: z.string().regex(/^\+?1?\d{10,}$/),
  email: z.string().email(),
  personalGuaranty: z.boolean(),
  guarantyInitials: z.string().optional(),
  guarantySignature: z.string().optional(), // Base64 signature
});

export const ownersSchema = z.object({
  owners: z.array(ownerSchema).min(1, 'At least one owner/principal required'),
});

// Step 3: Bank Reference
export const bankReferenceSchema = z.object({
  bankName: z.string().min(2, 'Bank name required'),
  contactName: z.string().min(2, 'Contact name required'),
  phone: z.string().regex(/^\+?1?\d{10,}$/),
  city: z.string().min(2),
  state: z.string().length(2),
  accountNumberLast4: z.string().regex(/^\d{4}$/, 'Last 4 digits only'),
});

// Step 4: Trade References
export const tradeReferenceSchema = z.object({
  companyName: z.string().min(2, 'Company name required'),
  contactName: z.string().min(2, 'Contact name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().regex(/^\+?1?\d{10,}$/, 'Valid phone required'),
});

export const tradeReferencesSchema = z.object({
  references: z.array(tradeReferenceSchema).length(3, 'Exactly 3 trade references required'),
});

// Step 5: Sales Profile
export const salesProfileSchema = z.object({
  products: z.array(z.enum(['Fuel', 'DEF', 'Lubricants', 'Additives', 'Other'])).min(1, 'Select at least one product'),
  estimatedMonthlyGallons: z.number().min(0, 'Estimated gallons required'),
  typicalDeliveryCities: z.string().min(3, 'Delivery cities required'),
  taxExempt: z.boolean(),
});

// Step 6: File Uploads (handled separately in FormData, not in JSON schema)
// Files are uploaded via multipart/form-data and validated server-side

// Step 7: Agreements & Signature
export const agreementsSchema = z.object({
  creditInquiryConsent: z.boolean().refine((val) => val === true, 'Must consent to credit inquiry'),
  tcpaEmailConsent: z.boolean().refine((val) => val === true, 'Must consent to communications'),
  authorizedSignerName: z.string().min(2, 'Signer name required'),
  authorizedSignerTitle: z.string().min(2, 'Title required'),
  signature: z.string().min(10, 'Signature required'), // Base64
  signatureType: z.enum(['drawn', 'typed']),
  ipAddress: z.string().optional(),
  timestamp: z.string().optional(),
  agreementHash: z.string().optional(),
});

// Complete Application
export const creditApplicationSchema = z.object({
  companyInfo: companyInfoSchema,
  owners: ownersSchema,
  bankReference: bankReferenceSchema,
  tradeReferences: tradeReferencesSchema,
  salesProfile: salesProfileSchema,
  agreements: agreementsSchema,
});

export type CreditApplication = z.infer<typeof creditApplicationSchema>;
export type CompanyInfo = z.infer<typeof companyInfoSchema>;
export type Owner = z.infer<typeof ownerSchema>;
export type BankReference = z.infer<typeof bankReferenceSchema>;
export type TradeReference = z.infer<typeof tradeReferenceSchema>;
export type SalesProfile = z.infer<typeof salesProfileSchema>;
export type Agreements = z.infer<typeof agreementsSchema>;

// Application status for admin
export enum ApplicationStatus {
  NEW = 'New',
  UNDER_REVIEW = 'Under Review',
  APPROVED = 'Approved',
  DECLINED = 'Declined',
}

export interface CreditApplicationSubmission {
  id: string;
  companyName: string;
  submittedAt: string;
  status: ApplicationStatus;
  estimatedMonthlyGallons: number;
  data: CreditApplication;
  files: {
    w9?: string;
    taxExemptionCert?: string;
    coi?: string;
    otherDocs?: string[];
  };
  internalNotes?: string;
}
