import { useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../toolkit";
import { useDispatch } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
