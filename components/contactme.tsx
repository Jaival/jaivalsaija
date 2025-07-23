'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import BackgroundElements from './backgroundElements';
import userData from 'utils/data';

// Types for form data
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Custom input component with modern styling
const FormInput = ({
  label,
  name,
  type = 'text',
  register,
  error,
  placeholder,
  rows,
}: {
  label: string;
  name: keyof ContactFormData;
  type?: string;
  register: any;
  error?: string;
  placeholder?: string;
  rows?: number;
}) => {
  const isTextarea = type === 'textarea';
  const Component = isTextarea ? 'textarea' : 'input';

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-dark dark:text-gray-light"
      >
        {label}
      </label>
      <div className="relative">
        <Component
          id={name}
          type={!isTextarea ? type : undefined}
          rows={isTextarea ? rows : undefined}
          placeholder={placeholder}
          className={`w-full px-4 py-3 bg-white/10 dark:bg-blue-dark/20 border rounded-xl 
            backdrop-blur-sm transition-all duration-300 resize-none
            focus:ring-2 focus:ring-hero-font/30 focus:border-hero-font 
            placeholder:text-gray-dark/60 dark:placeholder:text-gray-light/60
            text-gray-dark dark:text-gray-light
            ${
    error
      ? 'border-red-light focus:ring-red-light/30 focus:border-red-light'
      : 'border-gray-light/30 dark:border-blue-line/30 hover:border-hero-font/50'
    }`}
          {...register(name, {
            required: `${label} is required`,
            ...(type === 'email' && {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address',
              },
            }),
            ...(name === 'name' && {
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            }),
            ...(name === 'message' && {
              minLength: {
                value: 10,
                message: 'Message must be at least 10 characters',
              },
            }),
          })}
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -bottom-6 left-0 flex items-center space-x-1"
          >
            <svg
              className="w-4 h-4 text-red-light"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-red-light">{error}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Contact info card component
const ContactInfoCard = ({
  icon,
  title,
  content,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  href?: string;
}) => {
  const CardContent = (
    <motion.div
      className="p-6 bg-white/10 dark:bg-blue-dark/20 backdrop-blur-sm rounded-2xl border border-gray-light/20 dark:border-blue-line/20 hover:border-hero-font/30 transition-all duration-300 group cursor-pointer"
      whileHover={{
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 p-3 bg-gradient-to-br from-hero-font/20 to-blue-green/20 rounded-xl group-hover:from-hero-font/30 group-hover:to-blue-green/30 transition-all duration-300">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-dark dark:text-gray-light">
            {title}
          </h3>
          <p className="text-sm text-gray-dark/80 dark:text-gray-light/80 break-all">
            {content}
          </p>
        </div>
      </div>
    </motion.div>
  );

  return href ? (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
};

export default function ContactMe() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  // Reset form state when component mounts (for better navigation)
  useEffect(() => {
    setIsSubmitting(false);
    setSubmitStatus('idle');
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the form data to your backend
      console.log('Form submitted:', data);

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      className="min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        <BackgroundElements variant="contact" />
        {/* Header Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-hero-font via-blue-green to-aero bg-clip-text text-transparent mb-6 leading-tight">
              Get In Touch
            </h1>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-hero-font/20 to-blue-green/20 rounded-3xl blur-2xl -z-10"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          <motion.p
            className="text-lg md:text-xl text-gray-dark/80 dark:text-gray-light/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Have a project in mind? Let&apos;s discuss how we can bring your
            ideas to life.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-dark dark:text-gray-light mb-6">
                Let&apos;s Connect
              </h2>
              <p className="text-gray-dark/80 dark:text-gray-light/80 mb-8">
                I&apos;m always open to discussing new opportunities,
                interesting projects, and potential collaborations. Feel free to
                reach out!
              </p>
            </div>

            <div className="space-y-6">
              <ContactInfoCard
                icon={
                  <svg
                    className="w-6 h-6 text-hero-font"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                }
                title="Email"
                content={userData.email}
                href={`mailto:${userData.email}`}
              />

              <ContactInfoCard
                icon={
                  <svg
                    className="w-6 h-6 text-hero-font"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                title="Location"
                content={userData.address}
              />
            </div>

            {/* Social Links */}
            <motion.div className="pt-8" variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-dark dark:text-gray-light mb-4">
                Connect on Social
              </h3>
              <div className="flex space-x-4">
                {[
                  {
                    href: userData.socialLinks.twitter,
                    label: 'Twitter',
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    ),
                  },
                  {
                    href: userData.socialLinks.instagram,
                    label: 'Instagram',
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM12 16.624c-2.549 0-4.624-2.075-4.624-4.624S9.451 7.376 12 7.376s4.624 2.075 4.624 4.624S14.549 16.624 12 16.624zM16.848 6.848c-.615 0-1.115-.5-1.115-1.115s.5-1.115 1.115-1.115s1.115.5 1.115 1.115S17.463 6.848 16.848 6.848z" />
                      </svg>
                    ),
                  },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gradient-to-br from-hero-font/10 to-blue-green/10 hover:from-hero-font/20 hover:to-blue-green/20 rounded-xl border border-gray-light/20 dark:border-blue-line/20 hover:border-hero-font/30 transition-all duration-300 text-gray-dark dark:text-gray-light"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/10 dark:bg-blue-dark/20 backdrop-blur-xl p-8 rounded-3xl border border-gray-light/20 dark:border-blue-line/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-dark dark:text-gray-light mb-6">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Name"
                    name="name"
                    register={register}
                    error={errors.name?.message}
                    placeholder="Your full name"
                  />
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    register={register}
                    error={errors.email?.message}
                    placeholder="your@email.com"
                  />
                </div>

                <FormInput
                  label="Subject"
                  name="subject"
                  register={register}
                  error={errors.subject?.message}
                  placeholder="What's this about?"
                />

                <FormInput
                  label="Message"
                  name="message"
                  type="textarea"
                  rows={5}
                  register={register}
                  error={errors.message?.message}
                  placeholder="Tell me about your project or idea..."
                />

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-hero-font to-blue-green text-white font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center space-x-2"
                      >
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </motion.div>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl"
                    >
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-5 h-5 text-green-600 dark:text-green-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-green-700 dark:text-green-300 font-medium">
                          Message sent successfully! I&apos;ll get back to you
                          soon.
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-red-light/10 dark:bg-red-dark/20 border border-red-light/30 dark:border-red-dark/50 rounded-xl"
                    >
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-5 h-5 text-red-dark dark:text-red-light"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-red-dark dark:text-red-light font-medium">
                          Failed to send message. Please try again or contact me
                          directly.
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
