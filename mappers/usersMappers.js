/**
 * User mappers
 */

const { UserDto, CreateUserDto, UpdateUserDto } = require('../dtos/usersDtos');

/**
 * Converts a user object into an API response DTO
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
 * Converts a list of users into a list of DTOs
 */
const toUserDtoList = (users) => {
    if (!users || !Array.isArray(users)) return [];
    
    return users.map(user => toUserDto(user));
};

/**
 * Prepares an object for user creation
 */
const fromCreateUserDto = (createUserDto) => {
    return {
        name: createUserDto.name || createUserDto.username,
        nickname: createUserDto.nickname,
        email: createUserDto.email,
        password: createUserDto.password,
        role: createUserDto.role || 'user',
        profilepic: createUserDto.profile_image
    };
};

/**
 * Prepares an object for user update
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