# Bite Club

Coach-led meal planning and daily check-in PWA for nutrition programs.

Clients build weekly meal plans with ingredients, measurements, and macros, submit them for coach approval, and check in daily with delta-based adherence logging. Coaches review plans, approve or request changes, and receive daily group summaries to spot who needs attention.

## Project structure

| Path | Purpose |
| --- | --- |
| `app/` | Progressive Web App (client + coach flows) |
| `docs/` | Product requirements and research |
| `supabase/` | Database schema and RLS migrations |
| `dashes/` | OOUX design dash artifacts for the MVP |
| `library/` | Object guides and domain model references |

## Local development

Serve the repo root with any static server, then open `/app/index.html`:

```bash
python3 -m http.server 8125
```

## Supabase

Project: [Bite Club](https://supabase.com/dashboard/project/marhszyalzvqwbdcbkqn) (`marhszyalzvqwbdcbkqn`)

| Item | Location |
| --- | --- |
| Client config | `app/assets/js/supabase-config.js` |
| Schema migrations | `supabase/migrations/` |
| RLS policies | `supabase/migrations/002_rls.sql` |

Link and push migrations:

```bash
supabase link --project-ref marhszyalzvqwbdcbkqn
supabase db push
```

When Supabase is configured, auth and data calls use the live project. Without config, the app falls back to demo mode (`localStorage`).

### Auth redirect URLs (required for email confirmation)

In [Auth → URL Configuration](https://supabase.com/dashboard/project/marhszyalzvqwbdcbkqn/auth/url-configuration):

| Setting | Local dev value |
| --- | --- |
| Site URL | `http://localhost:8125/app/` |
| Redirect URLs | `http://localhost:8125/app/auth/callback.html` |

Email confirmation links land on `/app/auth/callback.html`, which completes sign-in and sends you into the app. If Supabase still points at the repo root (`http://localhost:8125/`), the root `index.html` forwards auth params to the callback page.

### Branded auth emails

Custom Bite Club templates live in `supabase/templates/` and are wired in `supabase/config.toml`:

| Template | Subject |
| --- | --- |
| Signup confirmation | Confirm your Bite Club account |
| Password reset | Reset your Bite Club password |
| Magic link | Your Bite Club sign-in link |
| Invite | You're invited to Bite Club |
| Email change | Confirm your new Bite Club email |
| Reauthentication | `{{ .Token }} is your Bite Club verification code` |

Design matches the in-app auth screen: warm `#f7f1ea` canvas, white card, orange `#ff6b00` CTA, Bite Club mark and tagline.

**Deploy to hosted project:** Supabase free-tier projects on the default email provider cannot customize templates via API ([June 2026 policy](https://supabase.com/changelog/46599-changes-to-email-template-customisation-on-free-tier)). To apply these templates:

1. Configure [custom SMTP](https://supabase.com/dashboard/project/marhszyalzvqwbdcbkqn/auth/smtp) (Resend, Postmark, SendGrid, etc.) and set **Sender name** to `Bite Club`.
2. Run `supabase config push` to upload subjects and HTML from this repo.

For local Supabase (`supabase start`), templates apply automatically from `config.toml`.

## License

All rights reserved unless otherwise noted.
