import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  renderToBuffer,
} from '@react-pdf/renderer';
import type { CreditApplication } from './credit-app-schema';

const PENLEY_GREEN = '#1a5232';
const PENLEY_GOLD = '#b8860b';

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 56,
    paddingHorizontal: 44,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#111111',
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: PENLEY_GREEN,
    paddingBottom: 10,
    marginBottom: 14,
  },
  companyTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: PENLEY_GREEN,
  },
  docTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginTop: 2,
  },
  headerMeta: {
    marginTop: 4,
    fontSize: 8,
    color: '#444444',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    backgroundColor: PENLEY_GREEN,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: PENLEY_GREEN,
    marginTop: 4,
    marginBottom: 3,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  label: {
    width: 150,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
  },
  value: {
    flex: 1,
  },
  signatureImage: {
    width: 220,
    height: 70,
    objectFit: 'contain',
    borderWidth: 1,
    borderColor: '#cccccc',
    marginTop: 4,
    backgroundColor: '#ffffff',
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 44,
    right: 44,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    paddingTop: 4,
    fontSize: 7,
    color: '#666666',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

function Row({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>
        {value === undefined || value === null || value === '' ? 'N/A' : String(value)}
      </Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function formatAddress(addr?: { street: string; city: string; state: string; zip: string }) {
  if (!addr) return 'N/A';
  return `${addr.street}, ${addr.city}, ${addr.state} ${addr.zip}`;
}

function yesNo(value?: boolean) {
  return value ? 'Yes' : 'No';
}

export interface CreditAppPdfRow {
  id: string;
  company_name: string;
  submitted_at: string;
  status: string;
  estimated_monthly_gallons: number;
  data: CreditApplication;
  files?: Record<string, unknown> | null;
  internal_notes?: string | null;
}

const FILE_LABELS: Record<string, string> = {
  w9: 'W-9',
  taxExemptionCert: 'Tax Exemption Certificate',
  coi: 'Certificate of Insurance',
};

function listAttachedFiles(files: Record<string, unknown> | null | undefined): string[] {
  const names: string[] = [];
  for (const [key, value] of Object.entries(files || {})) {
    if (key === 'otherDocs') {
      let docs: string[] = [];
      try {
        docs = Array.isArray(value) ? value : JSON.parse(String(value));
      } catch {
        docs = [];
      }
      docs.forEach((_, i) => names.push(`Other Document #${i + 1}`));
    } else if (typeof value === 'string' && value) {
      names.push(FILE_LABELS[key] || key);
    }
  }
  return names;
}

function CreditAppDocument({ row }: { row: CreditAppPdfRow }) {
  const app = row.data;
  const attachedFiles = listAttachedFiles(row.files);
  const submitted = new Date(row.submitted_at).toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  return (
    <Document
      title={`Credit Application - ${row.company_name}`}
      author="Penley Oil Company"
    >
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.companyTitle}>PENLEY OIL COMPANY</Text>
          <Text style={styles.docTitle}>Business Credit Application</Text>
          <Text style={styles.headerMeta}>
            2627 W. Reno Ave, Oklahoma City, OK 73107 • (405) 235-7553 • www.penleyoil.com
          </Text>
          <Text style={styles.headerMeta}>
            Application ID: {row.id} • Submitted: {submitted} • Status: {row.status}
          </Text>
        </View>

        <Section title="Company Information">
          <Row label="Legal Business Name" value={app.companyInfo.legalName} />
          <Row label="DBA" value={app.companyInfo.dba} />
          <Row label="Entity Type" value={app.companyInfo.entityType} />
          <Row label="FEIN" value={app.companyInfo.fein} />
          <Row label="Years in Business" value={app.companyInfo.yearsInBusiness} />
          <Row label="PO Required" value={yesNo(app.companyInfo.poRequired)} />
          <Row label="Billing Address" value={formatAddress(app.companyInfo.billingAddress)} />
        </Section>

        <Section title="Accounts Payable Contact">
          <Row label="Name" value={app.companyInfo.apContact.name} />
          <Row label="Email" value={app.companyInfo.apContact.email} />
          <Row label="Phone" value={app.companyInfo.apContact.phone} />
        </Section>

        <Section title="Owners & Principals">
          {app.owners.owners.map((owner, idx) => (
            <View key={idx} wrap={false}>
              <Text style={styles.subheading}>Owner / Principal #{idx + 1}</Text>
              <Row label="Name" value={owner.name} />
              <Row label="Title" value={owner.title} />
              <Row label="Ownership %" value={`${owner.ownershipPercent}%`} />
              <Row label="Phone" value={owner.phone} />
              <Row label="Email" value={owner.email} />
              <Row label="Home Address" value={formatAddress(owner.homeAddress)} />
              <Row label="Personal Guaranty" value={yesNo(owner.personalGuaranty)} />
              {owner.personalGuaranty && owner.guarantyInitials ? (
                <Row label="Guaranty Initials" value={owner.guarantyInitials} />
              ) : null}
              {owner.personalGuaranty && owner.guarantySignature ? (
                <View>
                  <Text style={styles.label}>Guaranty Signature</Text>
                  <Image style={styles.signatureImage} src={owner.guarantySignature} />
                </View>
              ) : null}
            </View>
          ))}
        </Section>

        <Section title="Bank Reference">
          <Row label="Bank Name" value={app.bankReference.bankName} />
          <Row label="Contact Name" value={app.bankReference.contactName} />
          <Row label="Phone" value={app.bankReference.phone} />
          <Row
            label="Location"
            value={`${app.bankReference.city}, ${app.bankReference.state}`}
          />
          <Row label="Account # (last 4)" value={app.bankReference.accountNumberLast4} />
        </Section>

        <Section title="Trade References">
          {app.tradeReferences.references.map((ref, idx) => (
            <View key={idx} wrap={false}>
              <Text style={styles.subheading}>Reference #{idx + 1}</Text>
              <Row label="Company" value={ref.companyName} />
              <Row label="Contact" value={ref.contactName} />
              <Row label="Email" value={ref.email} />
              <Row label="Phone" value={ref.phone} />
            </View>
          ))}
        </Section>

        <Section title="Sales Profile">
          <Row label="Products" value={app.salesProfile.products.join(', ')} />
          <Row
            label="Est. Monthly Gallons"
            value={app.salesProfile.estimatedMonthlyGallons?.toLocaleString('en-US')}
          />
          <Row label="Typical Delivery Cities" value={app.salesProfile.typicalDeliveryCities} />
          <Row label="Tax Exempt" value={yesNo(app.salesProfile.taxExempt)} />
        </Section>

        <Section title="Attached Documents">
          {attachedFiles.length > 0 ? (
            attachedFiles.map((name, idx) => <Text key={idx}>• {name}</Text>)
          ) : (
            <Text>No documents were uploaded with this application.</Text>
          )}
        </Section>

        <Section title="Agreements & Authorization">
          <Row
            label="Credit Inquiry Consent"
            value={yesNo(app.agreements.creditInquiryConsent)}
          />
          <Row
            label="Communications Consent"
            value={yesNo(app.agreements.tcpaEmailConsent)}
          />
          <Row label="Authorized Signer" value={app.agreements.authorizedSignerName} />
          <Row label="Signer Title" value={app.agreements.authorizedSignerTitle} />
          <Row label="Signature Type" value={app.agreements.signatureType} />
          <Row
            label="Signed At"
            value={
              app.agreements.timestamp
                ? new Date(app.agreements.timestamp).toLocaleString('en-US', {
                    dateStyle: 'long',
                    timeStyle: 'short',
                  })
                : 'N/A'
            }
          />
          <Row label="IP Address" value={app.agreements.ipAddress} />
          <Row label="Agreement Hash" value={app.agreements.agreementHash} />
          {app.agreements.signature ? (
            <View wrap={false}>
              <Text style={[styles.label, { marginTop: 4 }]}>Signature</Text>
              <Image style={styles.signatureImage} src={app.agreements.signature} />
            </View>
          ) : null}
        </Section>

        {/* Footer on every page */}
        <View style={styles.footer} fixed>
          <Text>
            Penley Oil Company — Credit Application — {row.company_name}
          </Text>
          <Text
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
}

export async function renderCreditAppPdf(row: CreditAppPdfRow): Promise<Buffer> {
  return renderToBuffer(<CreditAppDocument row={row} />);
}
