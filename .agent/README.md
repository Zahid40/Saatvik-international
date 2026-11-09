# .agent: project guidance

The single source of guidance for any coding agent or developer on this project. It is tool-neutral plain Markdown. `AGENTS.md` at the repo root is the entry point, and `CLAUDE.md` imports it.

## Layout

```
AGENTS.md                  entry point, read by most coding agents
CLAUDE.md                  imports AGENTS.md for Claude Code
assets/brand/              logo source files and business card
.agent/
  instructions.md          always-on rules
  decisions.md             decision log: accepted and proposed
  client/                  what the client said (verbatim + confirmed facts)
    company-profile.md
    product-notes.md
    facts.md
    open-questions.md
  developer/               how we build it
    project-analysis.md
    site-map.md
    architecture.md
    enquiry-flow.md
    design-system.md
    seo-and-launch.md
    roadmap.md
  knowledge/               domain knowledge and additional approaches
    products.md
    freeze-drying.md
    b2b-and-export.md
    content-and-claims.md
    approaches.md
  skills/                  on-demand procedures
    add-product.md
    build-page.md
    review-claims.md
    ingest-client-update.md
```

## Relation to Vercel eve

The shape borrows from Vercel eve, where a folder of files defines an agent: `instructions.md` is always loaded and `skills/` is loaded on demand.

| eve | Here | Note |
|---|---|---|
| `agent/instructions.md` | `.agent/instructions.md` | Same role |
| `agent/skills/` | `.agent/skills/` | Same role |
| `agent/agent.ts`, `tools/`, `channels/`, `schedules/`, `subagents/` | Not used | These configure a running AI agent. This project is a website, so it has no agent runtime |
| None | `client/`, `developer/`, `knowledge/`, `decisions.md` | Project-specific knowledge |

eve itself is not installed and is not a dependency.

## Where information goes

| Information | Location |
|---|---|
| Client's words, unchanged | `client/`, marked with date and source |
| A fact the client has confirmed | `client/facts.md` |
| Something we need from the client | `client/open-questions.md` |
| A technical or scope choice | `decisions.md` |
| How the system works or should work | `developer/` |
| Industry knowledge or an alternative idea | `knowledge/` |
| A repeatable procedure | `skills/` |

## Trust order

When sources conflict: `client/facts.md`, then the newest verbatim client note, then `decisions.md`, then `developer/`, then `knowledge/`.

`knowledge/` is background research and never counts as a client claim. Do not publish it as fact about Saatvik without confirmation.

Keep these files current. When a change makes one wrong, fix it in the same piece of work.
