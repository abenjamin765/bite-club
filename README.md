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

Open `app/index.html` in a static server or browser. Supabase migrations live in `supabase/migrations/`.

## License

All rights reserved unless otherwise noted.
