// Test Credit Application Submission
const FormData = require('form-data');
const fs = require('fs');

async function testCreditApp() {
  console.log('🧪 Testing Credit Application Submission...\n');

  const testApplication = {
    companyInfo: {
      legalName: "Test Company LLC",
      dba: "Test Co",
      entityType: "LLC",
      fein: "12-3456789",
      yearsInBusiness: 5,
      billingAddress: {
        street: "123 Test Street",
        city: "Oklahoma City",
        state: "OK",
        zip: "73102"
      },
      apContact: {
        name: "John Doe",
        email: "john@testcompany.com",
        phone: "4051234567"
      },
      poRequired: false
    },
    owners: {
      owners: [{
        name: "Jane Smith",
        title: "CEO",
        homeAddress: {
          street: "456 Owner Ave",
          city: "Oklahoma City",
          state: "OK",
          zip: "73102"
        },
        ownershipPercent: 100,
        phone: "4051234567",
        email: "jane@testcompany.com",
        personalGuaranty: false
      }]
    },
    bankReference: {
      bankName: "First National Bank",
      contactName: "Bob Banker",
      phone: "4055551234",
      city: "Oklahoma City",
      state: "OK",
      accountNumberLast4: "1234"
    },
    tradeReferences: {
      references: [
        {
          companyName: "Supplier One",
          contactName: "Contact One",
          email: "contact1@supplier1.com",
          phone: "4055551111"
        },
        {
          companyName: "Supplier Two",
          contactName: "Contact Two",
          email: "contact2@supplier2.com",
          phone: "4055552222"
        },
        {
          companyName: "Supplier Three",
          contactName: "Contact Three",
          email: "contact3@supplier3.com",
          phone: "4055553333"
        }
      ]
    },
    salesProfile: {
      products: ["Fuel", "DEF"],
      estimatedMonthlyGallons: 5000,
      typicalDeliveryCities: "Oklahoma City, Norman, Edmond",
      taxExempt: false
    },
    agreements: {
      creditInquiryConsent: true,
      tcpaEmailConsent: true,
      authorizedSignerName: "Jane Smith",
      authorizedSignerTitle: "CEO",
      signature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      signatureType: "drawn"
    }
  };

  const formData = new FormData();
  formData.append('application', JSON.stringify(testApplication));

  try {
    const response = await fetch('http://localhost:3000/api/credit-application/submit', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ SUCCESS! Application submitted\n');
      console.log('📋 Submission ID:', result.submissionId);
      console.log('📄 PDF URL:', result.pdfUrl || 'Not yet implemented');
      console.log('\n🔍 Check your Supabase dashboard:');
      console.log('   https://supabase.com/dashboard/project/inpdkngpzficcwrueuyj');
      console.log('   → Table Editor → credit_applications\n');
      return result;
    } else {
      console.log('❌ FAILED:', result.error);
      if (result.details) {
        console.log('Details:', JSON.stringify(result.details, null, 2));
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testCreditApp();
