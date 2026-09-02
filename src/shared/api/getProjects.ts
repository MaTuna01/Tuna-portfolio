import type {Project} from "../../entity/model/types/types.ts";
import {supabase} from "./supabase.ts";

export async function getProjects(): Promise<Project[]>{
    const {data , error} = await supabase
        .from('projects')
        .select('id, slug, title, summary, repository_url, created_at')
        .order('created_at', {ascending: false})
    if (error) throw error
    return data;
}