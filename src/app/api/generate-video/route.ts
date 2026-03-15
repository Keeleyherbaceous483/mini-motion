import { ERROR_MESSAGES } from '@/constants';
import { getMiniMaxClient, pollVideoTask } from '@/lib/minimax';
import { NextRequest, NextResponse } from 'next/server';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateVideoWithRetry(prompt: string): Promise<string> {
  const client = getMiniMaxClient();
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const taskId = await client.generateVideo(prompt);
      return taskId;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(
        `Video generation attempt ${attempt}/${MAX_RETRIES} failed:`,
        lastError.message
      );

      if (attempt < MAX_RETRIES) {
        await delay(RETRY_DELAY_MS);
      }
    }
  }

  throw lastError || new Error('Video generation failed after retries');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, waitForCompletion } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: ERROR_MESSAGES.MISSING_PROMPT }, { status: 400 });
    }

    const taskId = await generateVideoWithRetry(prompt);

    if (!waitForCompletion) {
      return NextResponse.json({ taskId, status: 'processing' });
    }

    const videoUrl = await pollVideoTask(getMiniMaxClient(), taskId);
    return NextResponse.json({ taskId, videoUrl, status: 'completed' });
  } catch (error) {
    console.error('Video generation error:', error);

    if (error instanceof Error) {
      if (error.message.includes(ERROR_MESSAGES.MINIMAX_API_KEY_MISSING)) {
        return NextResponse.json({ error: ERROR_MESSAGES.MISSING_API_KEY }, { status: 500 });
      }
      if (
        error.message.includes('clipboard') ||
        error.message.includes('image') ||
        error.message.includes('does not support image input')
      ) {
        return NextResponse.json(
          {
            error:
              'Image input is not supported. Please use a text-only prompt for video generation.',
          },
          { status: 400 }
        );
      }
      if (error.message.includes('failed after retries')) {
        return NextResponse.json(
          { error: 'Video generation failed after 3 attempts. Please try again later.' },
          { status: 500 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');

    if (!taskId) {
      return NextResponse.json({ error: ERROR_MESSAGES.MISSING_TASK_ID }, { status: 400 });
    }

    const client = getMiniMaxClient();
    // FIX: checkVideoTaskStatus now uses GET with task_id as query param
    const status = await client.checkVideoTaskStatus(taskId);

    // FIX: response field is "status" (not "task_status"), and returns file_id not video_url
    let videoUrl: string | null = null;
    if (status.status === 'Success' && status.file_id) {
      try {
        videoUrl = await client.retrieveFile(status.file_id);
      } catch (e) {
        console.error('Failed to retrieve file URL:', e);
      }
    }

    return NextResponse.json({
      taskId,
      taskStatus: status.status,
      fileId: status.file_id || null,
      videoUrl,
    });
  } catch (error) {
    console.error('Video status error:', error);
    return NextResponse.json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
  }
}
