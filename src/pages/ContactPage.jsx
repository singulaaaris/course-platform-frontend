import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../style/ContactPage.css";

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h2>{t("contact_title")}</h2>
        {submitted ? (
          <p className="contact-success">{t("contact_success")}</p>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder={t("contact_name_placeholder")}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t("contact_email_placeholder")}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder={t("contact_message_placeholder")}
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit">{t("contact_send")}</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
