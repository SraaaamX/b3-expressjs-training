/**
 * Mappers pour les utilisateurs
 */

const { UserDto, CreateUserDto, UpdateUserDto } = require('../dtos/usersDtos');

/**
 * Convertit un objet utilisateur en DTO pour la réponse API
 * @param {Object} user - L'objet utilisateur à convertir
 * @returns {UserDto} Le DTO de l'utilisateur
 */
const toUserDto = (user) => {
    if (!user) return null;
    
    return new UserDto(
        user._id,
        user.name,
        user.email,
        user.role,
        user.profilepic,
        user.createdAt,
        user.updatedAt
    );
};

/**
 * Convertit une liste d'utilisateurs en liste de DTOs
 * @param {Array} users - La liste d'utilisateurs à convertir
 * @returns {Array<UserDto>} La liste des DTOs utilisateurs
 */
const toUserDtoList = (users) => {
    if (!users || !Array.isArray(users)) return [];
    
    return users.map(user => toUserDto(user));
};

/**
 * Prépare un objet pour la création d'un utilisateur
 * @param {CreateUserDto} createUserDto - Les données de l'utilisateur à créer
 * @returns {Object} L'objet préparé pour la création
 */
const fromCreateUserDto = (createUserDto) => {
    return {
        name: createUserDto.username,
        email: createUserDto.email,
        password: createUserDto.password,
        role: createUserDto.role || 'user',
        profilepic: createUserDto.profile_image
    };
};

/**
 * Prépare un objet pour la mise à jour d'un utilisateur
 * @param {UpdateUserDto} updateUserDto - Les données de l'utilisateur à mettre à jour
 * @returns {Object} L'objet préparé pour la mise à jour
 */
const fromUpdateUserDto = (updateUserDto) => {
    const updateData = {};
    
    if (updateUserDto.username !== undefined) updateData.name = updateUserDto.username;
    if (updateUserDto.email !== undefined) updateData.email = updateUserDto.email;
    if (updateUserDto.password !== undefined) updateData.password = updateUserDto.password;
    if (updateUserDto.role !== undefined) updateData.role = updateUserDto.role;
    if (updateUserDto.profile_image !== undefined) updateData.profilepic = updateUserDto.profile_image;
    
    return updateData;
};

module.exports = {
    toUserDto,
    toUserDtoList,
    fromCreateUserDto,
    fromUpdateUserDto
};