import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Кастомный useDispatch с типами
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Кастомный useSelector с типами
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
