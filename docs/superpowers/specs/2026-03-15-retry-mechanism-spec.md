# Retry Mechanism for Generation Failures Specification

**Date:** 2026-03-15  
**Status:** Approved  
**Author:** opencode

## 1. Overview

Implement automatic retry mechanism (3 attempts) for video, music, and TTS generation when failures occur. If all retries fail, update status to 'failed' in DB and UI, allowing users to retry.

## 2. Goals

- Automatic retry 3 times for failed generation requests
- 2-second delay between retries
- Show retry status in UI
- Update DB status to 'failed' when all retries exhausted
- Allow users to manually retry from UI

## 3. Scope

### In Scope

- Video generation retry (POST /api/generate-video)
- Music generation retry (POST /api/generate-music)
- TTS generation retry (POST /api/generate-tts)

### Out of Scope

- Script generation (usually reliable)

## 4. Implementation Plan

### Phase 1: Server-Side Retry

#### 4.1 Modify API Routes

**File:** `src/app/api/generate-video/route.ts`

Add retry logic with MAX_RETRIES = 3 and RETRY_DELAY_MS = 2000

**Apply same pattern to:**

- `src/app/api/generate-music/route.ts`
- `src/app/api/generate-tts/route.ts`

### Phase 2: Update UI to Show Retry Status

#### 4.2 Update Preview Page to Handle Retry

**File:** `src/features/preview/hooks/usePreviewProject.ts`

Handle retry and update to failed status when exhausted

#### 4.3 Update UI Components

**File:** `src/features/preview/components/SceneCard.tsx`

Add retry button when status is 'failed'

**File:** `src/features/preview/components/SceneAssetBadges.tsx`

Show failed badge properly

## 5. Files to Modify

### Server-Side

- `src/app/api/generate-video/route.ts` - Add retry logic
- `src/app/api/generate-music/route.ts` - Add retry logic
- `src/app/api/generate-tts/route.ts` - Add retry logic

### UI Layer

- `src/features/preview/hooks/usePreviewProject.ts` - Handle retry
- `src/features/preview/components/SceneCard.tsx` - Show retry button
- `src/features/preview/components/SceneAssetBadges.tsx` - Show failed badge

## 6. Testing Checklist

- [ ] Generate video - verify retry on failure
- [ ] Generate music - verify retry on failure
- [ ] Generate TTS - verify retry on failure
- [ ] After 3 retries - verify status is 'failed'
- [ ] UI shows retry button when failed
- [ ] User can click retry to try again
- [ ] Verify DB status is 'failed' after retries exhausted
