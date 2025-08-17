'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import BackgroundElements from './backgroundElements';
import userData from 'utils/data';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SocialLinks from './SocialLinks';

// Form validation schema with Zod
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Contact info card component using shadcn Card
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
  const CardWrapper = (
    <motion.div
      className='pb-2'
      whileHover={{
        y: -2,
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.99 }}
    >
      <Card className='bg-white/15 dark:bg-black-light/15 backdrop-blur-md border border-white/25 dark:border-blue-line/25 hover:border-hero-font/40 dark:hover:border-blue-light/40 transition-all duration-300 group cursor-pointer overflow-hidden shadow-sm hover:shadow-md'>
        <CardContent className='flex items-center gap-5 px-6 py-4'>
          <div className='flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-hero-font/20 to-blue-green/20 dark:from-blue-light/20 dark:to-aero/20 rounded-2xl group-hover:from-hero-font/30 group-hover:to-blue-green/30 dark:group-hover:from-blue-light/30 dark:group-hover:to-aero/30 transition-all duration-300 group-hover:scale-105 shadow-sm'>
            <div className='text-hero-font dark:text-blue-light group-hover:text-blue-green dark:group-hover:text-aero transition-colors duration-300'>
              {icon}
            </div>
          </div>
          <div className='flex-1 min-w-0'>
            <h3 className='text-lg font-semibold text-blue-dark dark:text-gray-light mb-1 leading-tight group-hover:text-hero-font dark:group-hover:text-blue-light transition-colors duration-300'>
              {title}
            </h3>
            <p className='text-sm text-blue-dark/75 dark:text-gray-light/75 break-words leading-relaxed group-hover:text-blue-dark dark:group-hover:text-gray-light transition-colors duration-300'>
              {content}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return href ? (
    <Link href={href} target='_blank' rel='noopener noreferrer'>
      {CardWrapper}
    </Link>
  ) : (
    CardWrapper
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

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (_data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would typically send the form data to your backend
      // console.log('Form submitted:', data); // Remove in production

      setSubmitStatus('success');
      form.reset();
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
      className='min-h-screen'
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
      <div className='relative max-w-7xl mx-auto px-4 py-16 md:py-24'>
        <BackgroundElements variant='contact' />
        {/* Header Section */}
        <motion.div className='text-center mb-16' variants={itemVariants}>
          <div className='relative inline-block'>
            <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-hero-font via-blue-green to-aero bg-clip-text text-transparent mb-6 leading-tight'>
              Get In Touch
            </h1>
            <motion.div
              className='absolute -inset-4 bg-gradient-to-r from-hero-font/20 to-blue-green/20 rounded-3xl blur-2xl -z-10'
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
            className='text-lg md:text-xl text-blue-dark/90 dark:text-gray-light/80 max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Have a project in mind? Let&apos;s discuss how we can bring your
            ideas to life.
          </motion.p>
        </motion.div>

        <motion.div
          className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className='space-y-8'>
            <div>
              <h2 className='text-2xl md:text-3xl font-bold text-blue-dark dark:text-gray-light mb-6'>
                Let&apos;s Connect
              </h2>
              <p className='text-blue-dark/80 dark:text-gray-light/80 mb-8'>
                I&apos;m always open to discussing new opportunities,
                interesting projects, and potential collaborations. Feel free to
                reach out!
              </p>
            </div>

            <div className='space-y-6'>
              <ContactInfoCard
                icon={
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                    <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                  </svg>
                }
                title='Email'
                content={userData.email}
                href={`mailto:${userData.email}`}
              />

              <ContactInfoCard
                icon={
                  <svg
                    className='w-6 h-6'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                      clipRule='evenodd'
                    />
                  </svg>
                }
                title='Location'
                content={userData.address}
              />
            </div>

            {/* Social Links */}
            <motion.div className='pt-8' variants={itemVariants}>
              <h3 className='text-lg font-semibold text-blue-dark dark:text-gray-light mb-4'>
                Connect on Social
              </h3>
              <SocialLinks iconSize={26} />
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className='bg-white/15 dark:bg-black-light/15 backdrop-blur-lg border border-white/25 dark:border-blue-line/25 shadow-lg hover:shadow-xl transition-all duration-300'>
              <CardHeader className='pb-6'>
                <CardTitle className='text-2xl font-semibold text-blue-dark dark:text-gray-light'>
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                  >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-blue-dark dark:text-gray-light'>
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Your full name'
                                {...field}
                                className='h-12 px-4 py-3 bg-white/15 dark:bg-blue-dark/25 border border-gray-light/40 dark:border-blue-line/40 hover:border-hero-font/60 dark:hover:border-blue-light/60 focus:border-hero-font dark:focus:border-blue-light focus:ring-2 focus:ring-hero-font/40 dark:focus:ring-blue-light/40 text-blue-dark dark:text-gray-light placeholder:text-blue-dark/70 dark:placeholder:text-gray-light/70 backdrop-blur-md transition-all duration-300 text-base'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-blue-dark dark:text-gray-light'>
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder='your@email.com'
                                type='email'
                                {...field}
                                className='h-12 px-4 py-3 bg-white/15 dark:bg-blue-dark/25 border border-gray-light/40 dark:border-blue-line/40 hover:border-hero-font/60 dark:hover:border-blue-light/60 focus:border-hero-font dark:focus:border-blue-light focus:ring-2 focus:ring-hero-font/40 dark:focus:ring-blue-light/40 text-blue-dark dark:text-gray-light placeholder:text-blue-dark/70 dark:placeholder:text-gray-light/70 backdrop-blur-md transition-all duration-300 text-base'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name='subject'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-blue-dark dark:text-gray-light'>
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="What's this about?"
                              {...field}
                              className='h-12 px-4 py-3 bg-white/15 dark:bg-blue-dark/25 border border-gray-light/40 dark:border-blue-line/40 hover:border-hero-font/60 dark:hover:border-blue-light/60 focus:border-hero-font dark:focus:border-blue-light focus:ring-2 focus:ring-hero-font/40 dark:focus:ring-blue-light/40 text-blue-dark dark:text-gray-light placeholder:text-blue-dark/70 dark:placeholder:text-gray-light/70 backdrop-blur-md transition-all duration-300 text-base'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='message'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-blue-dark dark:text-gray-light'>
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Tell me about your project or idea...'
                              rows={6}
                              {...field}
                              className='min-h-[120px] px-4 py-3 bg-white/15 dark:bg-blue-dark/25 border border-gray-light/40 dark:border-blue-line/40 hover:border-hero-font/60 dark:hover:border-blue-light/60 focus:border-hero-font dark:focus:border-blue-light focus:ring-2 focus:ring-hero-font/40 dark:focus:ring-blue-light/40 text-blue-dark dark:text-gray-light placeholder:text-blue-dark/70 dark:placeholder:text-gray-light/70 backdrop-blur-md transition-all duration-300 resize-none text-base leading-relaxed'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <motion.button
                      type='submit'
                      disabled={isSubmitting}
                      className='w-full h-12 py-4 px-6 bg-gradient-to-r from-hero-font to-blue-green hover:from-blue-green hover:to-hero-font dark:from-blue-light dark:to-aero dark:text-blue-dark text-white font-medium rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 active:scale-95 focus-visible:ring-2 focus-visible:ring-hero-font/60 focus-visible:ring-offset-2 text-base'
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      <AnimatePresence mode='wait'>
                        {isSubmitting ? (
                          <motion.div
                            key='loading'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='flex items-center justify-center space-x-2'
                          >
                            <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                            <span>Sending...</span>
                          </motion.div>
                        ) : (
                          <motion.span
                            key='idle'
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
                          className='p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl'
                        >
                          <div className='flex items-center space-x-2'>
                            <svg
                              className='w-5 h-5 text-green-600 dark:text-green-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                clipRule='evenodd'
                              />
                            </svg>
                            <span className='text-green-700 dark:text-green-300 font-medium'>
                              Message sent successfully! I&apos;ll get back to
                              you soon.
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {submitStatus === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className='p-4 bg-red-light/10 dark:bg-red-dark/20 border border-red-light/30 dark:border-red-dark/50 rounded-xl'
                        >
                          <div className='flex items-center space-x-2'>
                            <svg
                              className='w-5 h-5 text-red-dark dark:text-red-light'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path
                                fillRule='evenodd'
                                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                                clipRule='evenodd'
                              />
                            </svg>
                            <span className='text-red-dark dark:text-red-light font-medium'>
                              Failed to send message. Please try again or
                              contact me directly.
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
