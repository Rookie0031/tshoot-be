import { Controller, Get, Post, Body, Put, Param, Delete, Query, HttpCode, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TroubleService } from './trouble.service';
import { CreateTroubleDto, UpdateTroubleDto } from './trouble.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('api/troubles')
@UseGuards(JwtAuthGuard)
export class TroubleController {
  constructor(private readonly troubleService: TroubleService) {}

  @Post()
  create(@Body() createTroubleDto: CreateTroubleDto) {
    return this.troubleService.create(createTroubleDto);
  }

  @Get()
  findAll(
    @Query('category') category: string,
    @Query('userId') userId: string
  ) {
    return this.troubleService.findAll(userId, category);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: string,
    @Query('userId') userId: string
  ) {
    return this.troubleService.findOne(id, userId);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() updateTroubleDto: UpdateTroubleDto
  ) {
    const userId = updateTroubleDto.userId;
    return this.troubleService.update(id, updateTroubleDto, userId);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id', ParseIntPipe) id: string,
    @Query('userId') userId: string
  ) {
    return this.troubleService.remove(id, userId);
  }
} 
