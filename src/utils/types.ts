import { Database } from "./supabase";

export type CreatorTable = Database["public"]["Tables"]["creators"];
export type Creator = CreatorTable["Row"];
export type CreatorInsert = CreatorTable["Insert"];
export type CreatorUpdate = CreatorTable["Update"];
