import { CreateLibraryDto, LibraryResponseDto, LibraryStatsResponseDto, ScanLibraryDto } from '@app/domain';
import request from 'supertest';

export const libraryApi = {
  getAll: async (server: any, accessToken: string) => {
    const { body, status } = await request(server).get(`/library/`).set('Authorization', `Bearer ${accessToken}`);
    expect(status).toBe(200);
    return body as LibraryResponseDto[];
  },

  createLibrary: async (server: any, accessToken: string, dto: CreateLibraryDto) => {
    const { body, status } = await request(server)
      .post(`/library/`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(dto);
    expect(status).toBe(201);
    return body as LibraryResponseDto;
  },

  scanLibrary: async (server: any, accessToken: string, id: string, dto: ScanLibraryDto) => {
    const { status } = await request(server)
      .post(`/library/${id}/scan`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(dto);
    expect(status).toBe(201);
  },

  getLibraryStatistics: async (server: any, accessToken: string, id: string): Promise<LibraryStatsResponseDto> => {
    const { body, status } = await request(server)
      .get(`/library/${id}/statistics`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(status).toBe(200);
    return body;
  },
};
