-- Optional month-only estimates for term-end notices. Does not change RLS or schedule dates.
alter table public.records add column if not exists approx_open_month text;
alter table public.records add column if not exists approx_open_source text;
