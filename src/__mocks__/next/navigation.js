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
    return new URLSearchParams(path);
  },
};

module.exports = MockNextNavigation;
