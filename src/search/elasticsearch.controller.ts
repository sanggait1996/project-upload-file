import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';

@Controller('search')
export class ElasticSearchController {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  @Get()
  async search() {
    const query = {
      query: {
        match: {
          fieldName: 'searchKeyword',
        },
      },
    };

    const result = await this.elasticsearchService.searchDocuments('indexName', query);

    return result.hits.hits;
  }

  @Get(':id')
    async getDocumentById(@Param('id') id: string) {
        const result = await this.elasticsearchService.getDocument('indexName', id);
        return result._source; // Lấy dữ liệu từ _source
    }

    @Post()
    async createDocument(@Param('id') id: string, @Body() document: any) {
      const result = await this.elasticsearchService.createDocument('indexName', id,  document);
      return result;
    }
    

}
