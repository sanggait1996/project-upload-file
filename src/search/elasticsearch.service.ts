import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchService {
  private readonly esClient: Client;

  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  async createDocument(index: string, id: string, document: any) {
    return await this.esClient.index({
      index,
      id,
      body: document,
    });
  }
  

  async getDocument(index: string, id: string) {
    return await this.esClient.get({
      index,
      id,
    });
  }
  
  async updateDocument(index: string, id: string, updates: any) {
    return await this.esClient.update({
      index,
      id,
      body: {
        doc: updates,
      },
    });
  }
  
  async deleteDocument(index: string, id: string) {
    return await this.esClient.delete({
      index,
      id,
    });
  }
  
  async searchDocuments(index: string, query: any) {
    return await this.esClient.search({
      index,
      body: query,
    });
  }
  
}
