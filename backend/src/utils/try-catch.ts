import { BadRequestException } from '@nestjs/common';

export async function tryCatch<T>(
  fn: () => Promise<T>,
  message: string,
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    throw new BadRequestException({
      error: message,
      description: error.message,
    });
  }
}
