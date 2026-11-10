import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API Base URL (defaults to local express backend, or Vercel serverless /api)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const sportsApi = createApi({
  reducerPath: 'sportsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      // Attach JWT token automatically from Redux state or localStorage
      const token = getState().auth.token || localStorage.getItem('jwt_token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['League', 'Team', 'Fixture', 'Ticket', 'User'],
  endpoints: (builder) => ({
    // ---------------- AUTH ENDPOINTS (JWT) ----------------
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials
      })
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData
      })
    }),
    getMe: builder.query({
      query: () => '/auth/me',
      providesTags: ['User']
    }),

    // ---------------- LEAGUE ENDPOINTS ----------------
    getLeagues: builder.query({
      query: () => '/leagues',
      providesTags: ['League']
    }),
    createLeague: builder.mutation({
      query: (league) => ({
        url: '/leagues',
        method: 'POST',
        body: league
      }),
      invalidatesTags: ['League']
    }),
    updateLeague: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/leagues/${id}`,
        method: 'PUT',
        body: patch
      }),
      invalidatesTags: ['League']
    }),
    deleteLeague: builder.mutation({
      query: (id) => ({
        url: `/leagues/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['League', 'Team', 'Fixture']
    }),

    // ---------------- TEAM ENDPOINTS ----------------
    getTeams: builder.query({
      query: (leagueId) => (leagueId ? `/teams?leagueId=${leagueId}` : '/teams'),
      providesTags: ['Team']
    }),
    createTeam: builder.mutation({
      query: (team) => ({
        url: '/teams',
        method: 'POST',
        body: team
      }),
      invalidatesTags: ['Team', 'League']
    }),
    updateTeam: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/teams/${id}`,
        method: 'PUT',
        body: patch
      }),
      invalidatesTags: ['Team']
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/teams/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Team', 'League']
    }),
    addPlayerToRoster: builder.mutation({
      query: ({ teamId, player }) => ({
        url: `/teams/${teamId}/roster`,
        method: 'POST',
        body: player
      }),
      invalidatesTags: ['Team']
    }),

    // ---------------- FIXTURE & LIVE MATCH ENDPOINTS ----------------
    getFixtures: builder.query({
      query: ({ leagueId, status } = {}) => {
        const params = new URLSearchParams();
        if (leagueId) params.append('leagueId', leagueId);
        if (status && status !== 'ALL') params.append('status', status);
        return `/fixtures?${params.toString()}`;
      },
      providesTags: ['Fixture']
    }),
    createFixture: builder.mutation({
      query: (fixture) => ({
        url: '/fixtures',
        method: 'POST',
        body: fixture
      }),
      invalidatesTags: ['Fixture']
    }),
    updateLiveMatch: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/fixtures/${id}/live`,
        method: 'PATCH',
        body: patch
      }),
      invalidatesTags: ['Fixture']
    }),
    addMatchEvent: builder.mutation({
      query: ({ id, ...eventData }) => ({
        url: `/fixtures/${id}/events`,
        method: 'POST',
        body: eventData
      }),
      invalidatesTags: ['Fixture']
    }),
    deleteFixture: builder.mutation({
      query: (id) => ({
        url: `/fixtures/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Fixture']
    }),

    // ---------------- TICKET ENDPOINTS ----------------
    getAllTickets: builder.query({
      query: () => '/tickets',
      providesTags: ['Ticket']
    }),
    getMyTickets: builder.query({
      query: () => '/tickets/my',
      providesTags: ['Ticket']
    }),
    bookTicket: builder.mutation({
      query: (bookingData) => ({
        url: '/tickets/book',
        method: 'POST',
        body: bookingData
      }),
      invalidatesTags: ['Ticket', 'Fixture']
    }),
    cancelTicket: builder.mutation({
      query: (ticketId) => ({
        url: `/tickets/${ticketId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Ticket', 'Fixture']
    }),

    // ---------------- THIRD-PARTY SPORTS API INTEGRATION ----------------
    // Fetches live real-world sports data from TheSportsDB public API
    getThirdPartySportsData: builder.query({
      queryFn: async (leagueQuery = 'English Premier League') => {
        try {
          const response = await fetch(
            `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${encodeURIComponent(
              leagueQuery
            )}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch from Third-Party Sports API');
          }
          const data = await response.json();
          return { data: data.teams || [] };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }
      }
    }),
    getThirdPartyLeagues: builder.query({
      queryFn: async () => {
        try {
          const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php');
          if (!response.ok) throw new Error('Third-party API failed');
          const data = await response.json();
          return { data: (data.leagues || []).slice(0, 12) };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }
      }
    })
  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useGetLeaguesQuery,
  useCreateLeagueMutation,
  useUpdateLeagueMutation,
  useDeleteLeagueMutation,
  useGetTeamsQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useAddPlayerToRosterMutation,
  useGetFixturesQuery,
  useCreateFixtureMutation,
  useUpdateLiveMatchMutation,
  useAddMatchEventMutation,
  useDeleteFixtureMutation,
  useGetAllTicketsQuery,
  useGetMyTicketsQuery,
  useBookTicketMutation,
  useCancelTicketMutation,
  useGetThirdPartySportsDataQuery,
  useGetThirdPartyLeaguesQuery
} = sportsApi;
