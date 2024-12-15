// __mocks__/next/navigation.js
const actual = jest.requireActual('next/navigation');

module.exports = {
  ...actual,
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
  usePathname: jest.fn(),
};
