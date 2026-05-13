-- PlayStation Cafe Manager V4 Hybrid Offline Sync
create table if not exists public.ps_cafe_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

alter table public.ps_cafe_state enable row level security;

drop policy if exists "ps_cafe_state_select" on public.ps_cafe_state;
drop policy if exists "ps_cafe_state_insert" on public.ps_cafe_state;
drop policy if exists "ps_cafe_state_update" on public.ps_cafe_state;

create policy "ps_cafe_state_select" on public.ps_cafe_state for select using (true);
create policy "ps_cafe_state_insert" on public.ps_cafe_state for insert with check (true);
create policy "ps_cafe_state_update" on public.ps_cafe_state for update using (true) with check (true);
