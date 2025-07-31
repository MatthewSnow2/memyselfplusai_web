// AI Audit Modal Functionality
class AuditModal {
  constructor() {
    this.modal = null;
    this.form = null;
    this.webhookUrl = 'https://n8n-latest-5k1i.onrender.com/webhook/self-serve-audit';
    this.init();
  }

  init() {
    this.createModal();
    this.bindEvents();
  }

  createModal() {
    const modalHTML = `
      <div id="auditModal" class="audit-modal">
        <div class="audit-modal-content">
          <div class="audit-modal-header">
            <h2 class="audit-modal-title">Self-Serve AI Audit</h2>
            <button class="audit-close" onclick="auditModal.close()">&times;</button>
          </div>
          <div class="audit-modal-body">
            <form id="auditForm" class="audit-form">
              <div class="audit-form-group">
                <label class="audit-form-label" for="companyName">Company Name *</label>
                <input type="text" id="companyName" name="companyName" class="audit-form-input" required>
              </div>

              <div class="audit-form-group">
                <label class="audit-form-label" for="contactEmail">Email Address *</label>
                <input type="email" id="contactEmail" name="contactEmail" class="audit-form-input" required>
              </div>

              <div class="audit-form-group">
                <label class="audit-form-label" for="industry">Industry *</label>
                <select id="industry" name="industry" class="audit-form-select" required>
                  <option value="">Select your industry</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance & Banking</option>
                  <option value="retail">Retail & E-commerce</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="education">Education</option>
                  <option value="consulting">Consulting</option>
                  <option value="marketing">Marketing & Advertising</option>
                  <option value="legal">Legal Services</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div class="audit-form-group">
                <label class="audit-form-label" for="companySize">Company Size *</label>
                <select id="companySize" name="companySize" class="audit-form-select" required>
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>

              <div class="audit-form-group">
                <label class="audit-form-label">Current AI Usage *</label>
                <div class="audit-form-radio-group">
                  <div class="audit-form-radio-item">
                    <input type="radio" id="aiUsage1" name="currentAiUsage" value="none" class="audit-form-radio" required>
                    <label for="aiUsage1" class="audit-form-radio-label">No AI tools currently in use</label>
                  </div>
                  <div class="audit-form-radio-item">
                    <input type="radio" id="aiUsage2" name="currentAiUsage" value="basic" class="audit-form-radio" required>
                    <label for="aiUsage2" class="audit-form-radio-label">Basic AI tools (ChatGPT, etc.)</label>
                  </div>
                  <div class="audit-form-radio-item">
                    <input type="radio" id="aiUsage3" name="currentAiUsage" value="integrated" class="audit-form-radio" required>
                    <label for="aiUsage3" class="audit-form-radio-label">Some integrated AI solutions</label>
                  </div>
                  <div class="audit-form-radio-item">
                    <input type="radio" id="aiUsage4" name="currentAiUsage" value="advanced" class="audit-form-radio" required>
                    <label for="aiUsage4" class="audit-form-radio-label">Advanced AI implementation</label>
                  </div>
                </div>
              </div>

              <div class="audit-form-group">
                <label class="audit-form-label">Primary Business Challenge *</label>
                <div class="audit-form-radio-group">
                  <div class="audit-form-radio-item">
                    <input type="radio" id="challenge1" name="primaryChallenge" value="customer-support" class="audit-form-radio" required>
                    <label for="challenge1" class="audit-form-radio-label">Customer support & response times</label>
                  </div>
                  <div class="audit-form-radio-item">
                    <input type="radio" id="challenge2" name="primaryChallenge" value="lead-generation" class="audit-form-radio" required>
                    <label for="challenge2" class="audit-form-radio-label">Lead generation & qualification</label>
                  </div>
                  <div class="audit-form-radio-item">
                    <input type="radio" id="challenge3" name="primaryChallenge" value="process-automation" class="audit-form-radio" required>
                    <label for="challenge3" class="audit-form-radio-label">Manual processes & repetitive tasks</label>
                  </div>
                  <div class="audit-form-radio-item">
                    <input type="radio" id="challenge4" name="primaryChallenge" value="data-analysis" class="audit-form-radio" required>
                    <label for="challenge4" class="audit-form-radio-label">Data analysis & insights</label>
                  </div>
                  <div class="audit-form-radio-item">
                    <input type="radio" id="challenge5" name="primaryChallenge" value="document-management" class="audit-form-radio" required>
                    <label for="challenge5" class="audit-form-radio-label">Document management & contracts</label>
                  </div>
                  <div class="audit-form-radio-item">
                    <input type="radio" id="challenge6" name="primaryChallenge" value="other" class="audit-form-radio" required>
                    <label for="challenge6" class="audit-form-radio-label">Other</label>
                  </div>
                </div>
              </div>

              <div class="audit-form-group">
                <label class="audit-form-label" for="monthlyBudget">Monthly AI Budget Range</label>
                <select id="monthlyBudget" name="monthlyBudget" class="audit-form-select">
                  <option value="">Select budget range (optional)</option>
                  <option value="under-500">Under $500</option>
                  <option value="500-1500">$500 - $1,500</option>
                  <option value="1500-5000">$1,500 - $5,000</option>
                  <option value="5000-15000">$5,000 - $15,000</option>
                  <option value="15000+">$15,000+</option>
                </select>
              </div>

              <div class="audit-form-group">
                <label class="audit-form-label" for="additionalInfo">Additional Information</label>
                <textarea id="additionalInfo" name="additionalInfo" class="audit-form-textarea" 
                  placeholder="Tell us more about your specific needs, current pain points, or goals..."></textarea>
              </div>

              <button type="submit" class="audit-submit-btn">Submit AI Audit Request</button>
            </form>

            <div id="auditSuccessMessage" class="audit-success-message">
              <h3>🎉 Audit Request Submitted Successfully!</h3>
              <p>Thank you for your interest! We'll analyze your information and get back to you within 24 hours with personalized AI recommendations.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('auditModal');
    this.form = document.getElementById('auditForm');
  }

  bindEvents() {
    // Close modal when clicking outside
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Handle form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitForm();
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.style.display === 'block') {
        this.close();
      }
    });
  }

  open() {
    this.modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  close() {
    this.modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
    this.resetForm();
  }

  resetForm() {
    this.form.reset();
    document.getElementById('auditSuccessMessage').style.display = 'none';
    this.form.style.display = 'block';
  }

  async submitForm() {
    const submitBtn = this.form.querySelector('.audit-submit-btn');
    const originalText = submitBtn.textContent;
    
    try {
      // Disable submit button and show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      // Collect form data
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData.entries());
      
      // Add timestamp
      data.submittedAt = new Date().toISOString();

      // Submit to n8n webhook
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Show success message
        this.form.style.display = 'none';
        document.getElementById('auditSuccessMessage').style.display = 'block';
        
        // Auto-close modal after 3 seconds
        setTimeout(() => {
          this.close();
        }, 3000);
      } else {
        throw new Error('Failed to submit audit request');
      }

    } catch (error) {
      console.error('Error submitting audit:', error);
      alert('There was an error submitting your audit request. Please try again or contact us directly.');
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }
}

// Initialize the modal when the page loads
let auditModal;
document.addEventListener('DOMContentLoaded', () => {
  auditModal = new AuditModal();
});

// Function to open the modal (called by buttons)
function openAuditModal() {
  if (auditModal) {
    auditModal.open();
  }
}
