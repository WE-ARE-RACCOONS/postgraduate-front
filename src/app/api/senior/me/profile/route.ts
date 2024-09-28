import { NextRequest, NextResponse } from 'next/server';
import {
  seniorInfoPatchFetch,
  SeniorInfoPatchFetchParams,
} from '@/api/senior/me/seniorInfoPatchFetch';

export async function PATCH(request: NextRequest) {
  try {
    const body = (await request.json()) as SeniorInfoPatchFetchParams;

    const { isNext, ...rest } = body;

    const response = await seniorInfoPatchFetch({
      isNext: false,
      ...rest,
    });

    const responseBody = await response?.json();

    console.log(responseBody);

    return NextResponse.json({ ...responseBody, status: 200 });
  } catch (error) {
    console.error('Error processing PATCH request:', error);

    return NextResponse.json(
      { error: 'Failed to process PATCH request' },
      { status: 500 },
    );
  }
}
