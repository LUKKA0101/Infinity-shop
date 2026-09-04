import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

export function MinAge(minAge: number, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "minAge",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [minAge],
      validator: {
        validate(value: Date, args: ValidationArguments) {
          if (!(value instanceof Date) || isNaN(value.getTime())) return false;

          const [minAge] = args.constraints as [number];
          const limite = new Date();
          limite.setFullYear(limite.getFullYear() - minAge);

          return value <= limite;
        },
        defaultMessage(args: ValidationArguments) {
          const [minAge] = args.constraints as [number];
          return `Você deve ter pelo menos ${minAge} anos`;
        },
      },
    });
  };
}
