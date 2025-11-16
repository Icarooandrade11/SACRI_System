const errorHandler = (err, req, res, next) => {
  console.error("❌ API error:", err);
  if (res.headersSent) {
    return next(err);
  }
  const status = err.statusCode || err.status || 500;
  res.status(status).json({
    message: err.message || "Erro interno do servidor",
    details: err.details || undefined,
  });
};

export default errorHandler;
