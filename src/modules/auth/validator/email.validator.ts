import {
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
} from "class-validator";
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailValidador implements ValidatorConstraintInterface {
  constructor(private readonly user: AuthService) {}

  async validate(value: any): Promise<boolean> {
    const usuarioComEmailExiste = await this.user.emailExists(value);
    return !usuarioComEmailExiste;
  }
}
export const EmailValido = (opcoesValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesValidacao,
      constraints: [],
      validator: EmailValidador,
    });
  };
};
