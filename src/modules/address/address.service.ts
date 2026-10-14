import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { toResponse } from "../../shared/utils/to-dto";
import { User } from "../user/user.entity";
import { Address } from "./address.entity";
import { CreateAddressDto } from "./dto/address.dto";
import { AddressResponseDto, UpdateAddressDto } from "./dto/address.dto";

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //---------------

  async createAddress(createAddress: CreateAddressDto, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    const newAddress = this.addressRepository.create({
      ...createAddress,
      user,
    });

    await this.addressRepository.save(newAddress);

    return toResponse(AddressResponseDto, newAddress);
  }

  //----------------

  async getAddressByUserId(userId: string) {
    const address = await this.addressRepository.find({
      where: { user: { id: userId } },
      relations: { user: true },
    });

    if (address.length === 0) {
      throw new NotFoundException(`No addresses found for user ${userId}`);
    }

    return address.map((item) => toResponse(AddressResponseDto, item));
  }

  //-----------------

  async getAddressUsedById(addressId: string, userId: string) {
    const address = await this.addressRepository.findOne({
      where: { id: addressId, user: { id: userId } },
      relations: { user: true },
    });

    if (!address) {
      throw new NotFoundException(`Address ${addressId} not found`);
    }

    return toResponse(AddressResponseDto, address);
  }

  //-----------------

  async updateAddress(
    addressId: string,
    updateAddressDto: UpdateAddressDto,
    userId: string,
  ) {
    const address = await this.addressRepository.findOne({
      where: { id: addressId, user: { id: userId } },
      relations: { user: true },
    });

    if (!address) {
      throw new NotFoundException(`Address ${addressId} not found`);
    }

    Object.assign(address, updateAddressDto);
    await this.addressRepository.save(address);

    return toResponse(AddressResponseDto, address);
  }

  //-----------------

  async updateDefaultAddress(addressId: string, userId: string) {
    const address = await this.addressRepository.findOne({
      where: { id: addressId, user: { id: userId } },
      relations: { user: true },
    });

    if (!address) {
      throw new NotFoundException(`Address ${addressId} not found`);
    }

    // Set all addresses of the user to isDefault = false
    await this.addressRepository.update(
      { user: { id: userId } },
      { isDefault: false },
    );

    // Set the specified address to isDefault = true
    address.isDefault = true;
    await this.addressRepository.save(address);

    return toResponse(AddressResponseDto, address);
  }

  //-----------------

  async deleteAddress(addressId: string, userId: string) {
    const address = await this.addressRepository.findOne({
      where: { id: addressId, user: { id: userId } },
      relations: { user: true },
    });

    if (!address) {
      throw new NotFoundException(`Address ${addressId} not found`);
    }

    await this.addressRepository.remove(address);

    return { message: `Address ${addressId} deleted successfully` };
  }
}
