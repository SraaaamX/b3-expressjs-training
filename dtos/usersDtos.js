/**
 * User DTOs
 */

/**
 * DTO representing a user in API responses
 */
class UserDto {
    constructor(id, username, email, role, profile_image, createdAt, updatedAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.profile_image = profile_image;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

/**
 * DTO for creating a user
 */
class CreateUserDto {
    constructor(name, nickname, email, password, role, profile_image) {
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.profile_image = profile_image;
    }
}

/**
 * DTO for updating a user
 */
class UpdateUserDto {
    constructor(data = {}) {
        if (data.username !== undefined) this.username = data.username;
        if (data.email !== undefined) this.email = data.email;
        if (data.password !== undefined) this.password = data.password;
        if (data.role !== undefined) this.role = data.role;
        if (data.profile_image !== undefined) this.profile_image = data.profile_image;
    }
}

module.exports = {
    UserDto,
    CreateUserDto,
    UpdateUserDto
};