import { updateProfileDataSchema } from "@/components/profile/schema/updateProfileSchema";
import { z } from "zod";


export type Profile = z.infer<typeof updateProfileDataSchema>;
