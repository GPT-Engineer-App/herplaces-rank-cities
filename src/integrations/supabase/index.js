import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

table: signing
    id: number
    created_at: string

*/

// Hooks for signing table

export const useSignings = () => useQuery({
    queryKey: ['signings'],
    queryFn: () => fromSupabase(supabase.from('signing').select('*')),
});

export const useSigning = (id) => useQuery({
    queryKey: ['signing', id],
    queryFn: () => fromSupabase(supabase.from('signing').select('*').eq('id', id).single()),
});

export const useAddSigning = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newSigning) => fromSupabase(supabase.from('signing').insert([newSigning])),
        onSuccess: () => {
            queryClient.invalidateQueries('signings');
        },
    });
};

export const useUpdateSigning = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedSigning) => fromSupabase(supabase.from('signing').update(updatedSigning).eq('id', updatedSigning.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('signings');
            queryClient.invalidateQueries(['signing', updatedSigning.id]);
        },
    });
};

export const useDeleteSigning = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('signing').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('signings');
        },
    });
};