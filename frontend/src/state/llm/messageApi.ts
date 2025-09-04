import { apiSlice } from "../apiSlice.ts";

export const llmSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        analyzeSeurity: builder.mutation({
            query: (sample_code) => ({
                url: '/llm/analyze',
                method: 'POST',
                body: sample_code
            }),
            invalidatesTags: ["LLM"]
        }),
    })
})

export const { useAnalyzeSeurityMutation } = llmSlice