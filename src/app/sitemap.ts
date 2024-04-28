import { SitemapFile } from "@/types/sitemap/sitemapFile";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let seniorIds: number[] = [];

  try {
    // 서버에서 seniorIds 배열을 가져옴
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/senior/all`);
    const data = await response.json();

    if (data.code === 'SNR200') {
      seniorIds = data.data.seniorIds;
    }
  } catch (error) {
    console.error('Fetch 에러:', error);
  }

  // sitemap 객체를 생성하고 반환
  const sitemap: SitemapFile[] = [
    {
      url: 'https://kimseonbae.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: 'https://kimseonbae.com/add-chat-link',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.3
    },
    {
      url: 'https://kimseonbae.com/add-profile',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.3
    },
    {
      url: 'https://kimseonbae.com/add-time',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.3
    },
    {
      url: 'https://kimseonbae.com/auth-done',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.2
    },
    {
      url: 'https://kimseonbae.com/junior/mentoring',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8
    },
    {
      url: 'https://kimseonbae.com/login/oauth2/code/kakao',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.1
    },
    {
      url: 'https://kimseonbae.com/mentoring-apply/done',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.2
    },
    {
      url: 'https://kimseonbae.com/mypage',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5
    },
    {
      url: 'https://kimseonbae.com/mypage/edit',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5
    },
    {
      url: 'https://kimseonbae.com/mypage/salary',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5
    },
    {
      url: 'https://kimseonbae.com/mypage/order/confirm',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.3
    },
    {
      url: 'https://kimseonbae.com/mypage/pay/result',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.3
    },
    {
      url: 'https://kimseonbae.com/mypage/profile/done',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.2
    },
    {
      url: 'https://kimseonbae.com/mypage/search-results',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7
    },
    {
      url: 'https://kimseonbae.com/mypage/senior/account',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.3
    },
    {
      url: 'https://kimseonbae.com/mypage/senior/account/done',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.2
    },
    {
      url: 'https://kimseonbae.com/mypage/senior/edit-profile',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.3
    },
    {
      url: 'https://kimseonbae.com/mypage/senior/account/done',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.2
    },
    {
      url: 'https://kimseonbae.com/senior/mentoring',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8
    },
    {
      url: 'https://kimseonbae.com/signup/done',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.2
    },
    {
      url: 'https://kimseonbae.com/signup/select',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.3
    },
    {
      url: 'https://kimseonbae.com/signup/select/common-info',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.4
    },
    {
      url: 'https://kimseonbae.com/signup/select/common-info/auth',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6
    },
    {
      url: 'https://kimseonbae.com/signup/select/common-info/matching-info',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6
    },
    {
      url: 'https://kimseonbae.com/signup/select/common-info/senior-info',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6
    },
    {
      url: 'https://kimseonbae.com/signup/select/common-info/senior-info/field',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6
    },
    {
      url: 'https://kimseonbae.com/signup/select/common-info/senior-info/lab',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6
    },
    {
      url: 'https://kimseonbae.com/signup/select/common-info/senior-info/major',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6
    },
  ];

  seniorIds.forEach(seniorId => {
    sitemap.push({
      url: `https://kimseonbae.com/${seniorId}/pay`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6
    });
  });

  seniorIds.forEach(seniorId => {
    sitemap.push({
      url: `https://kimseonbae.com/${seniorId}/question`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6
    });
  });

  seniorIds.forEach(seniorId => {
    sitemap.push({
      url: `https://kimseonbae.com/${seniorId}/schedule`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6
    });
  });

  seniorIds.forEach(seniorId => {
    sitemap.push({
      url: `https://kimseonbae.com/info/${seniorId}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5
    });
  });

  return sitemap;
}