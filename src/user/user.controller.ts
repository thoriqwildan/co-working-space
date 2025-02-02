import { Body, Controller, Get, HttpException, Inject, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtRoleGuard } from 'src/common/guards/jwtrole.guard';
import { Roles } from 'src/common/role.decorator';
import { Request } from 'express';
import { UpdateProfileDto } from 'src/common/schemas/user.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs'

@Controller('/user')
export class UserController {
    constructor(
       private userService: UserService,
       @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger 
    ) {}

    @Get('/me')
    @UseGuards(JwtRoleGuard)
    @Roles('user')
    async getMe(@Req() req: Request) {
        return this.userService.getProfile(req)
    }

    @Put('/me')
    @UseGuards(JwtRoleGuard)
    @Roles('user')
    async updateMe(@Req() req: Request, @Body() dto: UpdateProfileDto) {
        const result = await this.userService.updateProfile(req, dto)

        return result
    }

    @Post('/me/avatar')
    @UseGuards(JwtRoleGuard)
    @Roles('user')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './user_files/profiles',
            filename(req, file, callback) {
                const user = req.user
                if (!user || !user['id']) {
                    throw new HttpException('Unauthorized', 401)
                }
                const date = new Date().toISOString().replace(/:/g, '-').replace('T', '_').replace('Z', '')
                const extension: string = path.extname(file.originalname)
                const filename = `${user['id']}-${date}${extension}`

                // Delete file
                const dirPath = './user_files/profiles'

                try {
                    const files = fs.readdirSync(dirPath)
                    const filteredFiles = files.filter(file => file.includes(user['id']))

                    if (filteredFiles.length > 0) {
                        filteredFiles.forEach(file => {
                            const filePath = path.join(dirPath, file)

                            fs.unlinkSync(filePath)
                        })
                    }
                } catch (err) {
                    throw new HttpException('Error while cleaning old files', 500)
                }

                callback(null, filename)
            },
        }),
        fileFilter(req, file, callback) {
            const allowedTypes = /jpg|jpeg|png/
            const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
            const mimetype = allowedTypes.test(file.mimetype)

            if (extname && mimetype) { return callback(null, true) }
            else { return callback(new HttpException('Only JPG, JPEG, PNG files are allowed', 400), false) }
        },
        limits: { fileSize: 3 * 1024 * 1024 }
    }))
    async uploadFile(@Req() req: Request, @UploadedFile() file) {
        if (!file) { throw new HttpException('No File Uploaded', 404) }

        const user_id = req.user!['id']
        const filePath = `/user_files/profiles/${file.filename}`

        await this.userService.uploadImage(user_id, filePath)

        return { "custommsg": `File uploaded!` }
    }
}
