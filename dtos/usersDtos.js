/**
 * DTOs pour les utilisateurs
 */

/**
 * DTO pour représenter un utilisateur dans les réponses API
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
 * DTO pour la création d'un utilisateur
 */
class CreateUserDto {
    constructor(username, email, password, role, profile_image) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.profile_image = profile_image;
    }
}

/**
 * DTO pour la mise à jour d'un utilisateur
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