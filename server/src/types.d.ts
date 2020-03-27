type User = {
  userId: string;
  createdAt: Date | string;
  lastSignedInAt: Date | string;
};

export type FractalLoadData = {
  color: string;
  parameters: Record<string, number>;
  name: string;
  texture: string;
};

type SavedFractal = {
  savedFractalId: string;
  createdAt: string;
  createdBy: string;
  savedName: string;
  fractalLoadData: string;
};
