import { ClassConstructor, plainToInstance } from "class-transformer";

export function toResponse<T, R>(dto: ClassConstructor<T>, data: R): T {
  return plainToInstance(dto, data, { excludeExtraneousValues: true });
}
