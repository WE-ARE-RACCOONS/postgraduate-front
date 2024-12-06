import { AxiosResponse } from 'axios';
import axios from 'axios';

export const sendServerErrorMsgToSlack = async (res: AxiosResponse<any>) => {
  try {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const payload = {
      text: `
        *API 호출 중 오류가 발생했어요*\n
        *API 오류의 발생 경로:* \n
        ${res.config.baseURL}/${res.config.url}\n
        *API Method:* \n
        ${res.data.code || '정보 없음'}\n
        *API 응답 메시지:* \n
        ${res.data.message || '정보 없음'}
      `,
    };

    await axios({
      method: 'post',
      url: 'https://hooks.slack.com/services/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',
      data: JSON.stringify(payload),
      headers: headers,
    });
  } catch (e) {
    console.error(e);
  }
};
