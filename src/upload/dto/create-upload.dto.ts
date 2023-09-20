import { IsNotEmpty } from 'class-validator';
export class CreateUploadDto {
//   @IsNotEmpty({ message: 'filename cannot be empty.' })
//   filename: string;

//   @IsNotEmpty({ message: 'Path cannot be empty.' })
//   path: string;

  filename: string;

  path: string;
}
