import {
  AnalysisResponse,
  ApiResponse,
  PlaceAnalysisResponse,
} from './type';

import {
  MOCK_ANALYSIS_RESULT,
  MOCK_PLACE_ID,
  MOCK_PLACE_NAME,
} from './mockAnalysis';

const ANALYSIS_START_KEY = 'placeup_mock_analysis_started_at';

function createResponse<T>(data: T): ApiResponse<T> {
  return {
    code: 200,
    message: 'success',
    data,
  };
}

export const analysisApi = {
  async triggerAnalysis(
    _url: string
  ): Promise<ApiResponse<PlaceAnalysisResponse>> {
    sessionStorage.setItem(
      ANALYSIS_START_KEY,
      String(Date.now())
    );

    // 버튼을 누르자마자 너무 즉시 넘어가는 느낌을 방지
    await new Promise((resolve) =>
      setTimeout(resolve, 250)
    );

    return createResponse({
      naverPlaceId: MOCK_PLACE_ID,
      placeName: MOCK_PLACE_NAME,
      analyzing: true,
    });
  },

  async getAnalysisStatus(
    _naverPlaceId: number
  ): Promise<ApiResponse<AnalysisResponse>> {
    const startTime = Number(
      sessionStorage.getItem(ANALYSIS_START_KEY) ??
        Date.now()
    );

    const elapsed = Date.now() - startTime;

    // 0 ~ 1.25초
    if (elapsed < 1250) {
      return createResponse({
        ...MOCK_ANALYSIS_RESULT,
        status: 'PLACE_CRAWLING',
        analyzing: true,
        keywords: [],
        seo: null,
        feedback: null,
      });
    }

    // 1.25 ~ 2.5초
    if (elapsed < 2500) {
      return createResponse({
        ...MOCK_ANALYSIS_RESULT,
        status: 'REVIEW_CRAWLING',
        analyzing: true,
        keywords: [],
        seo: null,
        feedback: null,
      });
    }

    // 2.5 ~ 3.75초
    if (elapsed < 3750) {
      return createResponse({
        ...MOCK_ANALYSIS_RESULT,
        status: 'KEYWORD_EXTRACTING',
        analyzing: true,
        keywords: [],
        seo: null,
        feedback: null,
      });
    }

    // 3.75 ~ 5초
    if (elapsed < 5000) {
      return createResponse({
        ...MOCK_ANALYSIS_RESULT,
        status: 'RANKING_CRAWLING',
        analyzing: true,
        keywords: [],
        seo: null,
        feedback: null,
      });
    }

    // 5초 이후 결과 반환
    return createResponse(
      MOCK_ANALYSIS_RESULT
    );
  },
};