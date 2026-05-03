import { useState } from "react";
import "./Contact.css";

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
  );
}
