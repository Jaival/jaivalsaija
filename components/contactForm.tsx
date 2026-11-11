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

// Zod 4 probes for eval with `new Function` when it builds a schema, which
// trips the CSP (no 'unsafe-eval'). Jitless mode skips the probe.
z.config({ jitless: true });

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

const notice = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: durations.fast, ease: easeOut },
};

export default function ContactForm() {
  const [opened, setOpened] = useState(false);

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
  // app. The browser doesn't say whether one opened, so the fields keep
  // their text and the notice covers both cases.
  const onSubmit = (data: ContactFormData) => {
    const body = `${data.message}

${data.name}
${data.email}`;
    window.location.assign(
      `mailto:${userData.email}?subject=${encodeURIComponent(
        data.subject,
      )}&body=${encodeURIComponent(body)}`,
    );
    setOpened(true);
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
          className='inline-flex items-center justify-center h-11 px-8 text-sm font-medium rounded-md bg-primary text-primary-foreground transition-[background-color,transform] duration-200 ease-out hover:bg-primary/90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
        >
          Send via email
        </button>

        <AnimatePresence>
          {opened && (
            <motion.p
              {...notice}
              role='status'
              className='rounded-md border border-border bg-muted px-4 py-3 text-foreground'
            >
              If your email app opened, hit send there and I&apos;ll answer
              within a day or so. If nothing happened, write to{' '}
              <a
                href={`mailto:${userData.email}`}
                className='underline decoration-border underline-offset-4 transition-colors duration-200 ease-out hover:text-primary hover:decoration-primary'
              >
                {userData.email}
              </a>{' '}
              directly. Your message is still in the form to copy.
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </Form>
  );
}
