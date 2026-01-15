type DataTime = Partial<{
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}>;

export function getTimestamps(opts?: DataTime): DataTime {
  const now = new Date().toISOString();

  return {
    createdAt: now,
    updatedAt: now,
    ...opts,
  };
}
