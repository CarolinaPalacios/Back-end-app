const notFound = (_req, res) => {
  return res.status(404).json({ message: 'Not found' });
};

export default notFound;