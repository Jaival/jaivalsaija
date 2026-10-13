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
      <Card className='bg-card/50 backdrop-blur-md border border-border hover:border-primary/40 transition-[border-color,box-shadow] duration-200 ease-out group overflow-hidden shadow-sm hover:shadow-md'>
        <CardContent className='flex items-center gap-5 px-6 py-4'>
          <div className='flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary/15 rounded-2xl group-hover:bg-primary/25 transition-colors duration-200 ease-out shadow-sm'>
            <div className='text-primary group-hover:text-brand-to transition-colors duration-200 ease-out'>
              {icon}
            </div>
          </div>
          <div className='flex-1 min-w-0'>
            <h3 className='text-lg font-semibold tracking-tight text-card-foreground mb-1 leading-tight group-hover:text-primary transition-colors duration-200 ease-out'>
              {title}
            </h3>
            <p className='text-sm text-muted-foreground break-words leading-relaxed'>
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

  // There's no backend: submitting hands the message to the visitor's email
  // app, so it actually reaches me instead of vanishing.
  const onSubmit = (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const body = `${data.message}

${data.name}
${data.email}`;
      window.location.href = `mailto:${userData.email}?subject=${encodeURIComponent(
        data.subject,
      )}&body=${encodeURIComponent(body)}`;

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
            <h1 className='animate-enter text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent mb-6'>
              Get In Touch
            </h1>
            {/* Static glow. It used to breathe on a 4s loop behind the text. */}
            <div
              aria-hidden
              className='absolute -inset-4 bg-gradient-to-r from-brand-from/20 to-brand-to/20 rounded-3xl blur-2xl -z-10'
            />
          </div>
          <p
            className='animate-enter text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto'
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
              <h2 className='text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6'>
                Let&apos;s Connect
              </h2>
              <p className='text-muted-foreground mb-8'>
                Mail reaches me fastest and I do answer, usually within a day.
                LinkedIn works too if that&apos;s easier for you.
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
              <h3 className='text-lg font-semibold tracking-tight text-foreground mb-4'>
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
            <Card className='bg-card/50 backdrop-blur-lg border border-border shadow-lg hover:shadow-xl transition-shadow duration-200 ease-out'>
              <CardHeader className='pb-6'>
                <CardTitle className='text-2xl font-semibold tracking-tight text-card-foreground'>
                  Send a Message
                </CardTitle>
                <div className='mt-4 p-4 bg-primary/5 border border-primary/30 rounded-lg'>
                  <div className='flex items-start space-x-3'>
                    <svg
                      className='w-5 h-5 text-primary flex-shrink-0 mt-0.5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <div>
                      <p className='text-sm font-semibold text-foreground'>
                        Sends through your email app
                      </p>
                      <p className='text-xs text-muted-foreground mt-1'>
                        Submitting opens your email app with this message filled
                        in. Nothing is stored on this site.
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
                            <FormLabel className='text-foreground'>
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Your full name'
                                autoComplete='name'
                                enterKeyHint='next'
                                {...field}
                                className='h-12 px-4 py-3 bg-background/60 border border-input hover:border-primary/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40 text-foreground placeholder:text-muted-foreground backdrop-blur-md transition-[border-color,box-shadow] duration-200 ease-out text-base'
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
                            <FormLabel className='text-foreground'>
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
                                className='h-12 px-4 py-3 bg-background/60 border border-input hover:border-primary/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40 text-foreground placeholder:text-muted-foreground backdrop-blur-md transition-[border-color,box-shadow] duration-200 ease-out text-base'
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
                          <FormLabel className='text-foreground'>
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="What's this about?"
                              autoComplete='off'
                              enterKeyHint='next'
                              {...field}
                              className='h-12 px-4 py-3 bg-background/60 border border-input hover:border-primary/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40 text-foreground placeholder:text-muted-foreground backdrop-blur-md transition-[border-color,box-shadow] duration-200 ease-out text-base'
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
                          <FormLabel className='text-foreground'>
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Tell me about the role, or whatever brought you here.'
                              rows={6}
                              enterKeyHint='send'
                              {...field}
                              className='min-h-[120px] px-4 py-3 bg-background/60 border border-input hover:border-primary/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40 text-foreground placeholder:text-muted-foreground backdrop-blur-md transition-[border-color,box-shadow] duration-200 ease-out resize-none text-base leading-relaxed'
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
                      className='relative w-full h-12 py-4 px-6 bg-gradient-to-r from-brand-from to-brand-to hover:from-brand-to hover:to-brand-from text-primary-foreground font-medium rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background text-base'
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
                            <span className='size-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin' />
                            <span>Opening your email app...</span>
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
                            Send via email
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
                          className='p-4 bg-success/10 border border-success/40 rounded-xl'
                        >
                          <div className='flex items-center space-x-2'>
                            <svg
                              className='w-5 h-5 text-success'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                clipRule='evenodd'
                              />
                            </svg>
                            <span className='text-foreground font-medium'>
                              Your email app should have opened with the message
                              ready. Hit send there and I&apos;ll get back to
                              you within a day or so.
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
                          className='p-4 bg-destructive/10 border border-destructive/40 rounded-xl'
                        >
                          <div className='flex items-center space-x-2'>
                            <svg
                              className='w-5 h-5 text-destructive'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path
                                fillRule='evenodd'
                                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                                clipRule='evenodd'
                              />
                            </svg>
                            <span className='text-foreground font-medium'>
                              Your email app didn&apos;t open. Write to{' '}
                              {userData.email} directly instead.
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
