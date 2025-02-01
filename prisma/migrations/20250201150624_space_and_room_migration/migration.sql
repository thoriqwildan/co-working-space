-- CreateTable
CREATE TABLE `spaces` (
    `space_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `type` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`space_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `room_id` INTEGER NOT NULL AUTO_INCREMENT,
    `equiment` VARCHAR(255) NOT NULL,
    `space_id` INTEGER NOT NULL,

    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_space_id_fkey` FOREIGN KEY (`space_id`) REFERENCES `spaces`(`space_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
