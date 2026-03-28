import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  ApiEnvelopeResponse,
  ApiStandardErrorResponses
} from "../common/swagger/api-response.decorator";
import { createResponse } from "../common/utils/response.util";
import { AuthService } from "./auth.service";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user or sign in if the email already exists" })
  @ApiBody({ type: RegisterDto })
  @ApiEnvelopeResponse({
    description: "User authenticated successfully",
    type: AuthResponseDto
  })
  @ApiStandardErrorResponses()
  async register(@Body() dto: RegisterDto) {
    const auth = await this.authService.register(dto);
    return createResponse(auth, "User authenticated successfully");
  }

  @Post("login")
  @ApiOperation({ summary: "Log in an existing user" })
  @ApiBody({ type: LoginDto })
  @ApiEnvelopeResponse({
    description: "User authenticated successfully",
    type: AuthResponseDto
  })
  @ApiStandardErrorResponses()
  async login(@Body() dto: LoginDto) {
    const auth = await this.authService.login(dto);
    return createResponse(auth, "User authenticated successfully");
  }
}
