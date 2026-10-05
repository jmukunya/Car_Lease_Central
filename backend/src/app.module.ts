import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "@nestjs/schedule";
import { AuthModule } from "./auth/auth.module.js";
import { UsersModule } from "./users/users.module.js";
import { VehiclesModule } from "./vehicles/vehicles.module.js";
import { LeasesModule } from "./leases/leases.module.js";
import { BillingModule } from "./billing/billing.module.js";
import { MaintenanceModule } from "./maintenance/maintenance.module.js";
import { ConfigModule } from "@nestjs/config";
import { OnboardingModule } from './onboarding/onboarding.module.js';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || "5432", 10),
      synchronize: false,
      autoLoadEntities: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    VehiclesModule,
    LeasesModule,
    BillingModule,
    MaintenanceModule,
    OnboardingModule,
  ],
})
export class AppModule {
  constructor() {}
}
