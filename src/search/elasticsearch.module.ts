import { Module } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticSearchController } from './elasticsearch.controller';

@Module({
  imports: [ElasticsearchModule.register({
    node: process.env.ELASTICSEARCH_NODE,
  })],
  controllers: [ElasticSearchController],
  providers: [ElasticsearchService],
  exports: [ElasticsearchModule],
})
export class ElasticSearchModule {}
