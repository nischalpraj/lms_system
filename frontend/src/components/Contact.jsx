import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .collab-body {
    max-height: 1300px;
    background-color: #0b1f0f;
    background-image:
      radial-gradient(ellipse 60% 70% at 80% 50%, #0f2d14 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 10% 80%, #071a0a 0%, transparent 60%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    color: #e8ede9;
  }

  .collab-page {
    width: 100%;
    max-width: 1100px;
    padding: 80px 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .collab-left h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 4vw, 3.2rem);
    font-weight: 400;
    line-height: 1.15;
    color: #ffffff;
    margin-bottom: 20px;
  }

  .collab-left p {
    font-size: 0.95rem;
    font-weight: 500;
    color: #a8c4ad;
    line-height: 1.6;
    max-width: 320px;
  }

  .collab-right {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .collab-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .collab-field label {
    font-size: 0.85rem;
    font-weight: 300;
    color: #c8daca;
    letter-spacing: 0.02em;
  }

  .collab-field input,
  .collab-field textarea {
    background: transparent;
    border: none;
    border-bottom: 1.5px solid #2e6b38;
    outline: none;
    color: #ffffff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 300;
    padding: 8px 0;
    width: 100%;
    transition: border-color 0.25s ease;
    caret-color: #a0e070;
  }

  .collab-field input:focus,
  .collab-field textarea:focus {
    border-bottom-color: #6fc97a;
  }

  .collab-field textarea {
    resize: none;
    height: 80px;
  }

  .captcha-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .captcha-label {
    font-size: 0.85rem;
    font-weight: 300;
    color: #c8daca;
  }

  .captcha-box {
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 4px;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
    gap: 12px;
    cursor: pointer;
    user-select: none;
  }

  .captcha-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .captcha-checkbox {
    width: 22px;
    height: 22px;
    border: 2px solid #777;
    border-radius: 2px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s;
  }

  .captcha-checkbox.checked {
    background: #4285f4;
    border-color: #4285f4;
  }

  .captcha-text {
    color: #ccc;
    font-size: 0.88rem;
    font-family: 'DM Sans', sans-serif;
  }

  .captcha-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .captcha-brand {
    font-size: 0.6rem;
    color: #666;
    text-align: center;
    line-height: 1.2;
  }

  .collab-btn {
    background: linear-gradient(135deg, #d4f53c 0%, #a8e040 100%);
    color: #0b1f0f;
    border: none;
    padding: 16px 36px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    border-radius: 4px;
    width: fit-content;
    letter-spacing: 0.01em;
    transition: opacity 0.2s, transform 0.15s;
  }

  .collab-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .collab-btn:active {
    transform: translateY(0);
  }

  .toast {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: #2e6b38;
    color: #fff;
    padding: 14px 28px;
    border-radius: 6px;
    font-size: 0.9rem;
    font-family: 'DM Sans', sans-serif;
    transition: transform 0.4s ease;
    pointer-events: none;
    z-index: 999;
  }

  .toast.show {
    transform: translateX(-50%) translateY(0);
  }

  .error-text {
    color: #f87171;
    font-size: 0.78rem;
    margin-top: 4px;
  }

  @media (max-width: 700px) {
    .collab-page { grid-template-columns: 1fr; gap: 40px; padding: 50px 24px; }
    .collab-left p { max-width: 100%; }
    .captcha-box { width: 100%; }
  }
`;

export default function CollaborateForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    org: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [captcha, setCaptcha] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email.";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!captcha) newErrors.captcha = "Please verify you're not a robot.";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setForm({ name: "", email: "", phone: "", org: "", message: "" });
    setCaptcha(false);
    setErrors({});
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="collab-body">
        <div className="collab-page">
          {/* Left */}
          <div className="collab-left">
            <h1>Contact US!</h1>
            <p>
              Tell us a bit about you and your requirement and we will get in
              touch with you right away.
            </p>
          </div>

          {/* Right */}
          <div className="collab-right">
            <div className="collab-field">
              <label>Your name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="collab-field">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="collab-field">
              <label>Phone number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
            

            <div className="collab-field">
              <label>Message (optional)</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
              />
            </div>

            <button className="collab-btn" onClick={handleSubmit}>
              Get in touch
            </button>
          </div>
        </div>

        {/* Toast */}
        <div className={`toast ${showToast ? "show" : ""}`}>
          ✓ Message sent! We'll be in touch soon.
        </div>
      </div>
    </>
  );
}
