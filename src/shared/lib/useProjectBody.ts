// useQuery 커스텀 훅
import {useQuery} from "@tanstack/react-query";
import {getProjectBody} from "../api/getProjectBody.ts";

export function useProjectBody(slug: string | undefined) {
    return useQuery({
        queryKey: ['projectBody', slug],
        queryFn: () => getProjectBody(slug!),
        // slug가 undefined면 쿼리를 수행하지 않도록 하여 queryFn의
        enabled: !!slug,
        }
    )
}