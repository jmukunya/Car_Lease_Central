import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Req,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard.js";
import { RolesGuard } from "../auth/roles.guard.js";
import { Roles } from "../auth/roles.decorator.js";
import { VehiclesService } from "./vehicles.service.js";
import { OnboardVehicleDto } from "./dto/vehicle.dto.js";

@Controller("vehicles")
@UseGuards(JwtAuthGuard, RolesGuard)
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Post()
  @Roles("OWNER")
  onboardVehicle(@Body() dto: OnboardVehicleDto) {
    return this.vehiclesService.onboard(dto);
  }

  @Get("owner/:id")
  @Roles("OWNER")
  getOwnerCars(@Param('id') id) {
    return this.vehiclesService.findByOwner(id);
  }

  @Get()
  @Roles("ADMIN")
  getAllVehicles() {
    return this.vehiclesService.findAll();
  }

  @Patch(":id/activate")
  @Roles("ADMIN")
  activateCar(@Param("id") id: string) {
    return this.vehiclesService.activatePending(id);
  }

  @Post(":id/:driver")
  @Roles("ADMIN")
  assignCar(@Param("id") id: String, @Param("driver") driver: String) {
    //TO DO -
    // return this.vehiclesService.assignCarToDriver(id, driver)
  }
}
