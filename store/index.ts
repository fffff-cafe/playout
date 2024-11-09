import { User } from "@supabase/supabase-js"
import { atom } from "jotai"

export const accountAtom = atom<User>()
