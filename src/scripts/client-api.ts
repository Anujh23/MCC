// Browser side of client login. The API is a separate FastAPI service (repo: manka-client-api) on
// Render. Dev talks to a local API; production to api.<domain>. PUBLIC_CLIENT_API_URL overrides both.
import { apiBase } from '../data/api-content';

export const API = import.meta.env.PUBLIC_CLIENT_API_URL ?? (import.meta.env.DEV ? 'http://localhost:8000' : apiBase);

export type Result = { ok: boolean; status: number; data: any };

/** GET without a body, POST with one (JSON, or multipart when given FormData). Never throws: a network failure is status 0. */
export async function api(path: string, body?: object | FormData): Promise<Result> {
  try {
    const res = await fetch(API + path, {
      method: body ? 'POST' : 'GET',
      credentials: 'include',
      headers: body && !(body instanceof FormData) ? { 'Content-Type': 'application/json' } : undefined,
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
    return { ok: res.ok, status: res.status, data: res.status === 204 ? null : await res.json().catch(() => null) };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

const message = (r: Result) =>
  r.status === 0
    ? 'Can’t reach the server. Check your connection and try again.'
    : r.data?.error?.message ?? (typeof r.data?.detail === 'string' ? r.data.detail : 'Something went wrong. Please try again.');

/** Wires an AuthForm: native validation, one request at a time, API errors in [data-error]. */
export function handleForm(
  form: HTMLFormElement,
  submit: (values: Record<string, string>) => Promise<Result>,
  done: (r: Result) => void,
) {
  const error = form.querySelector<HTMLElement>('[data-error]')!;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (button.disabled || !form.reportValidity()) return;
    error.textContent = '';
    button.disabled = true;
    const r = await submit(Object.fromEntries(new FormData(form)) as Record<string, string>);
    button.disabled = false;
    if (r.ok) done(r);
    else error.textContent = message(r);
  });
}
