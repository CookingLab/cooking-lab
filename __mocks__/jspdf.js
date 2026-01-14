module.exports = {
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    setFontSize: jest.fn(),
    text: jest.fn(),
    addImage: jest.fn(),
    splitTextToSize: (t) => [t],
    addPage: jest.fn(),
    link: jest.fn(),
    save: jest.fn(),
    internal: { pageSize: { getWidth: () => 210 } },
    getTextWidth: jest.fn(() => 100),
  })),
};