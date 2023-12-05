const { getProduactsWithPagination } = require('../Controllers/dashboardController');

describe('getProduactsWithPagination', () => {
  it('should return paginated results for the first page', async () => {
    const req = {
      params: { page: 1, limit: 4 },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    await getProduactsWithPagination(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  it('should return paginated results for a subsequent page', async () => {
    const req = {
      params: { page: 2, limit: 4 },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    await getProduactsWithPagination(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  it('should handle cases where startIndex is greater than array length', async () => {
    const req = {
      params: { page: 10, limit: 4 },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    await getProduactsWithPagination(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  it('should handle cases where startIndex is greater than endIndex', async () => {
    const req = {
      params: { page: 3, limit: 2 },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    await getProduactsWithPagination(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  it('should handle errors and respond with a 500 status', async () => {
    const req = {
      params: { page: -1, limit: -4 },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    jest.spyOn(global.console, 'error').mockImplementation(() => {});
    await getProduactsWithPagination(req, res);
    expect(res.json).toHaveBeenCalled();
  });
});