import axios from 'axios';
import { ApiGetEndpoint, ApiPostEndpoint } from '../../constants';

export async function apiGet<TResponse>(
  endpoint: ApiGetEndpoint,
  params?: any
) {
  try {
    const { data } = await axios.get<TResponse>(`api${endpoint}`, { params });
    return data;
  } catch {
    return false;
  }
}

export async function apiPost<TResponse>(
  endpoint: ApiPostEndpoint,
  params?: any
) {
  try {
    const { data } = await axios.post<TResponse>(`api${endpoint}`, { params });
    return data;
  } catch {
    return false;
  }
}
