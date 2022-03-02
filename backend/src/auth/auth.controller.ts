import { Body, Controller, Get, Post, ValidationPipe, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.authService.signUp(authCredentialsDto)
    }

    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    async signIn(@Request() req) {
        return this.authService.signIn(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/hi')
    hi(@Request() req) {
        // console.log(req.user);

        return req.user
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    logout(@Request() req) {
        return this.authService.logout(req.user)
    }

    @Get()
    home() {
        return "auth"
    }
}
