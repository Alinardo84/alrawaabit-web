import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.enum(['web', 'seo', 'aeo', 'geo', 'other']),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

const serviceLabels = {
  web: { ar: 'تطوير المواقع', en: 'Web Development', fr: 'Développement Web' },
  seo: { ar: 'SEO', en: 'SEO', fr: 'SEO' },
  aeo: { ar: 'AEO', en: 'AEO', fr: 'AEO' },
  geo: { ar: 'GEO', en: 'GEO', fr: 'GEO' },
  other: { ar: 'أخرى', en: 'Other', fr: 'Autre' },
};

let resend: Resend | null = null;
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, company, service, message } = validation.data;
    const locale = request.headers.get('x-locale') || 'ar';

    // Send email via Resend
    const resendClient = getResend();
    if (!resendClient) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { success: false, error: 'Email service is not configured' },
        { status: 503 }
      );
    }

    const { data, error } = await resendClient.emails.send({
      from: 'AlRawaabit Contact <contact@alrawaabit.com>',
      to: ['info@alrawaabit.com'],
      subject: `New Contact Form: ${serviceLabels[service as keyof typeof serviceLabels][locale as keyof typeof serviceLabels[typeof service]]} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0F172A; border-bottom: 2px solid #F97316; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-weight: bold; width: 150px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            ` : ''}
            ${company ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Company:</td>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0;">${company}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Service:</td>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0;">${serviceLabels[service as keyof typeof serviceLabels][locale as keyof typeof serviceLabels[typeof service]]}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 15px; background: #F8FAFC; border-radius: 8px; border-left: 4px solid #F97316;">
            <p style="margin: 0; font-weight: bold; color: #0F172A;">Message:</p>
            <p style="margin: 10px 0 0 0; color: #334155; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background: #FEF3C7; border-radius: 8px; font-size: 12px; color: #92400E;">
            <p style="margin: 0;">This email was sent from the AlRawaabit contact form at https://alrawaabit.com</p>
            <p style="margin: 5px 0 0 0;">Locale: ${locale}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}