import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards, ValidationPipe, Request, Query } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { AuthCredentialsDto, UpdateUserDto } from "src/auth/dto/auth-credentials.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "src/auth/interface/user.interface";
import { ConcertsService } from "src/concerts/concerts.service";
import { UsersService } from "./users.service";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UsersService,
    // private readonly concertService: ConcertsService
    // private readonly authService: AuthService

  ) { }

  @Get('all')
  async getAllUsers() {
    return await this.userService.getAll();
  }

  @Get('admins')
  async onlyAdmins() {
    return await this.userService.getAllAdmins();
  }

  @Get('users')
  async onlyUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('user/:id')
  async getUserById(@Param('id') userId) {
    return await this.userService.getUserById(userId);
  }

  @Get()
  hi() {
    return 'user Controller';
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async updateUser(
    @Param('id') id,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteUser(@Param('id') id) {
    return this.userService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('addToFavourite/:id')
  async addToFavourite(@Param('id') userId, @Body() concertId: string) {
    // console.log(userId);
    // console.log(concertId);
    return this.userService.addToFavourite(userId, concertId)
  }


  @Get('concerts/:userid')
  async getFavouriteConcerts(@Param('userid') userId) {
    return this.userService.getfavouriteconcerts(userId)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('deleteFromFavourite/:userId')
  async deleteFromFavourite(@Param('userId') userID, @Body() concertId: string) {
    return this.userService.deleteFromFavourite(userID, concertId)

  }
}
