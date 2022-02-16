export const staleWhileRevalidate = (callback) => async (ctx) => {
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  return callback(ctx);
};
