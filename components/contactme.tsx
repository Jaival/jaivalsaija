'use client';

import Link from 'next/link';
import React, { useState, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { durations, easeOut } from '@/utils/animations';
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
    <div className='pb-2 transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]'>
      <Card className='bg-white/15 dark:bg-black-light/15 backdrop-blur-md border border-white/25 dark:border-blue-line/25 hover:border-hero-font/40 dark:hover:border-blue-light/40 transition-[border-color,box-shadow] duration-200 ease-out group overflow-hidden shadow-sm hover:shadow-md'>
        <CardContent className='flex items-center gap-5 px-6 py-4'>
          <div className='flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-hero-font/20 to-blue-green/20 dark:from-blue-light/20 dark:to-aero/20 rounded-2xl group-hover:from-hero-font/30 group-hover:to-blue-green/30 dark:group-hover:from-blue-light/30 dark:group-hover:to-aero/30 transition-colors duration-200 ease-out shadow-sm'>
            <div className='text-hero-font dark:text-blue-light group-hover:text-blue-green dark:group-hover:text-aero transition-colors duration-200 ease-out'>
              {icon}
            </div>
          </div>
          <div className='flex-1 min-w-0'>
            <h3 className='text-lg font-semibold tracking-tight text-blue-dark dark:text-gray-light mb-1 leading-tight group-hover:text-hero-font dark:group-hover:text-blue-light transition-colors duration-200 ease-out'>
              {title}
            </h3>
            <p className='text-sm text-blue-dark/75 dark:text-gray-light/75 break-words leading-relaxed'>
              {content}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
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

  return (
    <section className='min-h-svh'>
      <div className='relative max-w-7xl mx-auto px-4 py-16 md:py-24'>
        <BackgroundElements variant='contact' />
        {/* Header Section */}
        <div className='text-center mb-16'>
          <div className='relative inline-block'>
            <h1 className='animate-enter text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] bg-gradient-to-r from-hero-font via-blue-green to-aero bg-clip-text text-transparent mb-6'>
              Get In Touch
            </h1>
            {/* Static glow. It used to breathe on a 4s loop behind the text. */}
            <div
              aria-hidden
              className='absolute -inset-4 bg-gradient-to-r from-hero-font/20 to-blue-green/20 rounded-3xl blur-2xl -z-10'
            />
          </div>
          <p
            className='animate-enter text-lg md:text-xl text-blue-dark/90 dark:text-gray-light/80 max-w-2xl mx-auto'
            style={{ '--stagger': 1 } as CSSProperties}
          >
            I&apos;m looking for DevOps and cloud infrastructure work in
            Germany. If that&apos;s why you&apos;re here, say hello.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>
          {/* Contact Information */}
          <div
            className='animate-enter space-y-8'
            style={{ '--stagger': 2 } as CSSProperties}
          >
            <div>
              <h2 className='text-2xl md:text-3xl font-bold tracking-tight text-blue-dark dark:text-gray-light mb-6'>
                Let&apos;s Connect
              </h2>
              <p className='text-blue-dark/80 dark:text-gray-light/80 mb-8'>
                Mail reaches me fastest and I do answer, usually within a
                day. LinkedIn works too if that&apos;s easier for you.
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
            <div className='pt-8'>
              <h3 className='text-lg font-semibold tracking-tight text-blue-dark dark:text-gray-light mb-4'>
                Connect on Social
              </h3>
              <SocialLinks iconSize={26} />
            </div>
          </div>

          {/* Contact Form */}
          <div
            className='animate-enter'
            style={{ '--stagger': 3 } as CSSProperties}
          >
            <Card className='bg-white/15 dark:bg-black-light/15 backdrop-blur-lg border border-white/25 dark:border-blue-line/25 shadow-lg hover:shadow-xl transition-shadow duration-200 ease-out'>
              <CardHeader className='pb-6'>
                <CardTitle className='text-2xl font-semibold tracking-tight text-blue-dark dark:text-gray-light'>
                  Send a Message
                </CardTitle>
                <div className='mt-4 p-4 bg-amber-50/80 dark:bg-amber-900/20 border-2 border-amber-400/60 dark:border-amber-600/60 rounded-lg'>
                  <div className='flex items-start space-x-3'>
                    <svg
                      className='w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <div>
                      <p className='text-sm font-semibold text-amber-800 dark:text-amber-300'>
                        Under Construction
                      </p>
                      <p className='text-xs text-amber-700 dark:text-amber-400 mt-1'>
                        This form isn&apos;t wired up yet. Email or LinkedIn
                        works in the meantime.
                      </p>
                    </div>
                  </div>
                </div>
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
                                autoComplete='name'
                                enterKeyHint='next'
                                {...field}
                                className='h-12 px-4 py-3 bg-white/15 dark:bg-blue-dark/25 border border-gray-light/40 dark:border-blue-line/40 hover:border-hero-font/60 dark:hover:border-blue-light/60 focus:border-hero-font dark:focus:border-blue-light focus:ring-2 focus:ring-hero-font/40 dark:focus:ring-blue-light/40 text-blue-dark dark:text-gray-light placeholder:text-blue-dark/70 dark:placeholder:text-gray-light/70 backdrop-blur-md transition-[border-color,box-shadow] duration-200 ease-out text-base'
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
                                autoComplete='email'
                                inputMode='email'
                                enterKeyHint='next'
                                {...field}
                                className='h-12 px-4 py-3 bg-white/15 dark:bg-blue-dark/25 border border-gray-light/40 dark:border-blue-line/40 hover:border-hero-font/60 dark:hover:border-blue-light/60 focus:border-hero-font dark:focus:border-blue-light focus:ring-2 focus:ring-hero-font/40 dark:focus:ring-blue-light/40 text-blue-dark dark:text-gray-light placeholder:text-blue-dark/70 dark:placeholder:text-gray-light/70 backdrop-blur-md transition-[border-color,box-shadow] duration-200 ease-out text-base'
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
                              autoComplete='off'
                              enterKeyHint='next'
                              {...field}
                              className='h-12 px-4 py-3 bg-white/15 dark:bg-blue-dark/25 border border-gray-light/40 dark:border-blue-line/40 hover:border-hero-font/60 dark:hover:border-blue-light/60 focus:border-hero-font dark:focus:border-blue-light focus:ring-2 focus:ring-hero-font/40 dark:focus:ring-blue-light/40 text-blue-dark dark:text-gray-light placeholder:text-blue-dark/70 dark:placeholder:text-gray-light/70 backdrop-blur-md transition-[border-color,box-shadow] duration-200 ease-out text-base'
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
                              enterKeyHint='send'
                              {...field}
                              className='min-h-[120px] px-4 py-3 bg-white/15 dark:bg-blue-dark/25 border border-gray-light/40 dark:border-blue-line/40 hover:border-hero-font/60 dark:hover:border-blue-light/60 focus:border-hero-font dark:focus:border-blue-light focus:ring-2 focus:ring-hero-font/40 dark:focus:ring-blue-light/40 text-blue-dark dark:text-gray-light placeholder:text-blue-dark/70 dark:placeholder:text-gray-light/70 backdrop-blur-md transition-[border-color,box-shadow] duration-200 ease-out resize-none text-base leading-relaxed'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='relative w-full h-12 py-4 px-6 bg-gradient-to-r from-hero-font to-blue-green hover:from-blue-green hover:to-hero-font dark:from-blue-light dark:to-aero dark:text-blue-dark text-white font-medium rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-hero-font/60 focus-visible:ring-offset-2 text-base'
                    >
                      <AnimatePresence mode='popLayout' initial={false}>
                        {isSubmitting ? (
                          <motion.span
                            key='loading'
                            initial={{ opacity: 0, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(4px)' }}
                            transition={{
                              duration: durations.fast,
                              ease: easeOut,
                            }}
                            className='flex items-center justify-center space-x-2'
                          >
                            <span className='size-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                            <span>Sending...</span>
                          </motion.span>
                        ) : (
                          <motion.span
                            key='idle'
                            initial={{ opacity: 0, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(4px)' }}
                            transition={{
                              duration: durations.fast,
                              ease: easeOut,
                            }}
                            className='block'
                          >
                            Send Message
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>

                    {/* Status Messages */}
                    <AnimatePresence>
                      {submitStatus === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{
                            duration: durations.fast,
                            ease: easeOut,
                          }}
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
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{
                            duration: durations.fast,
                            ease: easeOut,
                          }}
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
          </div>
        </div>
      </div>
    </section>
  );
}
