/**
 * User DTOs
 * These DTOs are designed to match the user model structure and provide consistent data transfer objects
 */

/**
 * DTO representing a user in API responses
 */
class UserDto {
    constructor(id, name, nickname, email, role, profilepic, phone, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.role = role;
        this.profilepic = profilepic;
        this.phone = phone;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

/**
 * DTO for creating a user
 */
class CreateUserDto {
    constructor(name, nickname, email, password, role = 'user', profilepic = null, phone = null) {
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.profilepic = profilepic;
        this.phone = phone;
    }
}

/**
 * DTO for updating a user
 */
class UpdateUserDto {
    constructor(data = {}) {
        if (data.name !== undefined) this.name = data.name;
        if (data.nickname !== undefined) this.nickname = data.nickname;
        if (data.email !== undefined) this.email = data.email;
        if (data.password !== undefined) this.password = data.password;
        if (data.role !== undefined) this.role = data.role;
        if (data.profilepic !== undefined) this.profilepic = data.profilepic;
        if (data.phone !== undefined) this.phone = data.phone;
    }
}

module.exports = {
    UserDto,
    CreateUserDto,
    UpdateUserDto
};