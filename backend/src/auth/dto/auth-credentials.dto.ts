import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @IsNotEmpty({ message: "veuillez remplir le champ Nom" })
    username: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Veuillez remplir le champ email' })
    email: string;

    @IsString()
    @MinLength(8, { message: 'Le mot de pass doit contenir au moins 8 charactère' })
    @MaxLength(20, { message: 'Le mot de pass doit contenir moins de 20 charactère' })
    @Exclude({ toPlainOnly: true })
    password: string;

    admin: Boolean = false;

    favourite: String[];

}

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty({ message: "veuillez remplir le champ Nom" })
    username: string;

    @IsEmail({}, { message: "Email invalide" })
    @IsNotEmpty({ message: 'Veuillez remplir le champ email' })
    email: string;
}
