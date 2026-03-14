# Documentation Package Specification

**Date:** 2026-03-14  
**Status:** Draft  
**Author:** opencode

## 1. Overview

Create comprehensive documentation package for Mini Motion open source project. The documentation should be professional, complete, and follow best practices for open source projects.

## 2. Goals

- Professional README with clear value proposition
- Complete setup guide for developers
- Architecture documentation with TanStack Query integration
- API reference for external developers
- Services layer documentation
- Deployment guide
- Contribution guidelines
- License file

## 3. Current State

### Existing Files

- `README.md` - Basic Next.js template (36 lines)
- `docs/ARCHITECTURE.md` - Architecture overview (127 lines)

### Missing

- SETUP.md, API.md, SERVICES.md, DEPLOYMENT.md, CONTRIBUTING.md, CHANGELOG.md, LICENSE

## 4. Documentation Structure

```
mini-motion/
├── README.md                    # Main readme (update)
├── LICENSE                     # MIT License
├── CHANGELOG.md               # Version history
└── docs/
    ├── ARCHITECTURE.md        # Update with TanStack Query
    ├── SETUP.md               # Installation & Configuration
    ├── API.md                 # API Reference
    ├── SERVICES.md            # TanStack Query Services Layer
    ├── DEPLOYMENT.md          # Deployment Guide
    └── CONTRIBUTING.md        # Contribution Guidelines
```

## 5. Content Specifications

### 5.1 README.md

**Sections:**

1. Project title and badges (Next.js, TypeScript, License)
2. One-line description
3. Features list (4-5 items)
4. Tech stack icons
5. Quick start code block
6. Documentation links table
7. License badge

**Style:** Clean, modern, developer-focused

### 5.2 LICENSE

MIT License - standard template

### 5.3 CHANGELOG.md

**Format:** Keep a Changelog + Semantic Versioning

**Sections:**

- `[Added]` - New features
- `[Changed]` - Changes in existing functionality
- `[Deprecated]` - Soon-to-be removed features
- `[Removed]` - Removed features
- `[Fixed]` - Bug fixes
- `[Security]` - Security improvements

### 5.4 docs/SETUP.md

**Sections:**

1. Prerequisites (Node.js 18+, pnpm)
2. Clone repository
3. Install dependencies
4. Environment variables
   - Supabase (URL, Anon Key)
   - MiniMax API (API Key)
5. Database setup
   - Supabase project creation
   - Drizzle migrations
6. Run development server
7. Common issues

### 5.5 docs/ARCHITECTURE.md

**Updates needed:**

1. Update Next.js version (16)
2. Add services layer section
3. Add TanStack Query pattern explanation
4. Update tech stack table

**New sections:**

- Services Layer Architecture
- TanStack Query Patterns
- Data Flow

### 5.6 docs/API.md

**Endpoints:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/generate-script | Generate video script |
| POST | /api/generate-video | Start video generation |
| GET | /api/generate-video?taskId=xxx | Poll video status |
| POST | /api/generate-music | Generate background music |
| POST | /api/generate-tts | Generate voiceover |
| GET | /api/projects | List user projects |
| POST | /api/projects | Create project |
| GET | /api/projects/[id] | Get project with scenes |
| PATCH | /api/projects/[id] | Update project |
| DELETE | /api/projects/[id] | Delete project |
| POST | /api/projects/[id]/scenes | Create scenes |
| PATCH | /api/projects/[id]/scenes/[sceneId] | Update scene |

**For each endpoint:**

- Description
- Request body / params
- Response format
- Error codes
- Example

### 5.7 docs/SERVICES.md

**Sections:**

1. Overview
2. Directory Structure
3. API Client Pattern
4. Query Keys Factory
5. Queries (useQuery hooks)
6. Mutations (useMutation hooks)
7. Polling Pattern
8. SSR Integration
9. Usage Examples

**Code examples for each pattern**

### 5.8 docs/DEPLOYMENT.md

**Sections:**

1. Vercel Deployment
   - Connect repository
   - Environment variables
   - Build settings
2. Supabase Production
   - Database
   - Authentication
   - Storage buckets
3. Environment Configuration
   - Production vs development
4. Post-deployment verification
5. Troubleshooting

### 5.9 docs/CONTRIBUTING.md

**Sections:**

1. Code of Conduct
2. How to Contribute
3. Development Setup
4. Git Workflow
   - Branch naming
   - Commit messages
   - PR process
5. Coding Standards
   - TypeScript
   - React/Next.js
   - Testing
6. Pull Request Guidelines
7. Issue Reporting

## 6. Implementation Plan

### Phase 1: Core Files

- LICENSE (new)
- CHANGELOG.md (new)
- Update README.md

### Phase 2: Documentation

- SETUP.md (new)
- Update ARCHITECTURE.md
- API.md (new)
- SERVICES.md (new)

### Phase 3: Community

- DEPLOYMENT.md (new)
- CONTRIBUTING.md (new)

## 7. Files to Create/Modify

### Create

- `LICENSE`
- `CHANGELOG.md`
- `docs/SETUP.md`
- `docs/API.md`
- `docs/SERVICES.md`
- `docs/DEPLOYMENT.md`
- `docs/CONTRIBUTING.md`

### Modify

- `README.md`
- `docs/ARCHITECTURE.md`

## 8. Quality Standards

- Consistent formatting
- Code blocks with language highlighting
- Clear headings hierarchy
- Table of contents for long docs
- Badge/icons for tech stack
- Link to related docs
- Last updated timestamps
