const mockRouter = require('next-router-mock');

const useRouter = mockRouter.useRouter;

const MockNextNavigation = {
  ...mockRouter,
  notFound: jest.fn(),
  redirect: jest.fn().mockImplementation((url) => {
    mockRouter.memoryRouter.setCurrentUrl(url);
  }),
  usePathname: () => {
    const router = useRouter();
    return router.asPath;
  },
  useSearchParams: () => {
    const router = useRouter();
    const path = router.query;
    // 쿼리 파라미터가 없는 경우 처리
    if (!path || typeof path !== 'object') {
      return new URLSearchParams();
    }
    // 객체를 URLSearchParams로 변환
    return new URLSearchParams(
      Object.entries(path).flatMap(([key, value]) => 
        Array.isArray(value) 
          ? value.map(v => [key, v]) 
          : [[key, value]]
      )
    );
  },
};

module.exports = MockNextNavigation;
