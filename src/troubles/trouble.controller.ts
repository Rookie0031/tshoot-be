import { Controller, Get, Post, Body, Put, Param, Delete, Query, HttpCode, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TroubleService } from './trouble.service';
import { CreateTroubleDto, UpdateTroubleDto } from './trouble.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('api/troubles')
@UseGuards(JwtAuthGuard) // 모든 라우트에 JWT 인증 적용
export class TroubleController {
  constructor(private readonly troubleService: TroubleService) {}

  @Post()
  create(@Body() createTroubleDto: CreateTroubleDto) {
    return this.troubleService.create(createTroubleDto);
  }

  @Get()
  findAll(@Query('category') category: string, @Query('userId') userId: string) {
    return this.troubleService.findAll(category, userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.troubleService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateTroubleDto: UpdateTroubleDto) {
    return this.troubleService.update(id, updateTroubleDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.troubleService.remove(id);
  }
} 
