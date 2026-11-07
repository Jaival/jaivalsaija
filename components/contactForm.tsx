'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { durations, easeOut } from '@/utils/animations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import userData from '@/utils/data';

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

// Labels read like the flags of a command. Field text stays 16 px, so iOS
// does not zoom in on focus.
const labelStyle = 'font-mono text-sm font-medium text-primary';
const fieldStyle =
  'bg-background border border-input hover:border-primary/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40 text-foreground placeholder:text-muted-foreground transition-[border-color,box-shadow] duration-200 ease-out text-base';

const swap = {
  initial: { opacity: 0, filter: 'blur(4px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, filter: 'blur(4px)' },
  transition: { duration: durations.fast, ease: easeOut },
};

const notice = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: durations.fast, ease: easeOut },
};

export default function ContactForm() {
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
      window.location.assign(
        `mailto:${userData.email}?subject=${encodeURIComponent(
          data.subject,
        )}&body=${encodeURIComponent(body)}`,
      );

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyle}>--name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Your full name'
                  autoComplete='name'
                  enterKeyHint='next'
                  {...field}
                  className={`h-11 px-3 ${fieldStyle}`}
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
              <FormLabel className={labelStyle}>--email</FormLabel>
              <FormControl>
                <Input
                  placeholder='your@email.com'
                  type='email'
                  autoComplete='email'
                  inputMode='email'
                  enterKeyHint='next'
                  {...field}
                  className={`h-11 px-3 ${fieldStyle}`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='subject'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyle}>--subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="What's this about?"
                  autoComplete='off'
                  enterKeyHint='next'
                  {...field}
                  className={`h-11 px-3 ${fieldStyle}`}
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
              <FormLabel className={labelStyle}>--message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell me about the role, or whatever brought you here.'
                  rows={6}
                  enterKeyHint='send'
                  {...field}
                  className={`min-h-[140px] px-3 py-2.5 resize-none leading-relaxed ${fieldStyle}`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className='text-sm text-muted-foreground'>
          <span className='font-medium text-foreground'>
            Sends through your email app.
          </span>{' '}
          Submitting opens your email app with this message filled in. Nothing
          is stored on this site.
        </p>

        <button
          type='submit'
          disabled={isSubmitting}
          className='inline-flex items-center justify-center h-11 px-8 text-sm font-medium rounded-md bg-primary text-primary-foreground transition-[background-color,transform] duration-200 ease-out hover:bg-primary/90 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
        >
          <AnimatePresence mode='popLayout' initial={false}>
            {isSubmitting ? (
              <motion.span
                key='loading'
                {...swap}
                className='flex items-center justify-center gap-2'
              >
                <span className='size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin' />
                <span>Opening your email app...</span>
              </motion.span>
            ) : (
              <motion.span key='idle' {...swap} className='block'>
                Send via email
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.p
              {...notice}
              role='status'
              className='rounded-md border border-success/40 bg-success/10 px-4 py-3 text-foreground'
            >
              <span aria-hidden className='mr-2 font-mono text-success'>
                ✓
              </span>
              Your email app should have opened with the message ready. Hit send
              there and I&apos;ll get back to you within a day or so.
            </motion.p>
          )}

          {submitStatus === 'error' && (
            <motion.p
              {...notice}
              role='alert'
              className='rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-foreground'
            >
              <span aria-hidden className='mr-2 font-mono text-destructive'>
                ✗
              </span>
              Your email app didn&apos;t open. Write to {userData.email}{' '}
              directly instead.
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </Form>
  );
}
