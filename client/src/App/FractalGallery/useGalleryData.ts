import React, { useState, useEffect } from "react";
import { FractalLoadData } from "../fractalGenerator/StateManagement/fractalLoader";
import { getRandomFractal } from "../fractalGenerator/ControlComponents/SetRandomButton";

export type User = { name: string; id: number };

export type SaveMetadata = { date: Date; author: User; likes: number };

export type GalleryData = {
  fractalData: FractalLoadData;
  image: File;
  saveMetadata: SaveMetadata;
}[];

export const useGalleryData = () => {
  const data: GalleryData = Array(5).fill({
    fractalData: getRandomFractal().data,
    image: new File(["foo"], "foo.txt", {
      type: "text/plain"
    }),
    saveMetadata: {
      date: new Date(),
      author: { name: "marek", id: 1 },
      likes: 2
    }
  });
  return data;
};
