/**
 * User mappers
 * These mappers convert between model objects and DTOs
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
        user.nickname,
        user.email,
        user.role,
        user.profilepic,
        user.phone,
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
 * Prepares an object for user creation from DTO
 */
const fromCreateUserDto = (createUserDto) => {
    return {
        name: createUserDto.name,
        nickname: createUserDto.nickname,
        email: createUserDto.email,
        password: createUserDto.password,
        role: createUserDto.role || 'user',
        profilepic: createUserDto.profilepic,
        phone: createUserDto.phone
    };
};

/**
 * Prepares an object for user update from DTO
 */
const fromUpdateUserDto = (updateUserDto) => {
    const updateData = {};
    
    if (updateUserDto.name !== undefined) updateData.name = updateUserDto.name;
    if (updateUserDto.nickname !== undefined) updateData.nickname = updateUserDto.nickname;
    if (updateUserDto.email !== undefined) updateData.email = updateUserDto.email;
    if (updateUserDto.password !== undefined) updateData.password = updateUserDto.password;
    if (updateUserDto.role !== undefined) updateData.role = updateUserDto.role;
    if (updateUserDto.profilepic !== undefined) updateData.profilepic = updateUserDto.profilepic;
    if (updateUserDto.phone !== undefined) updateData.phone = updateUserDto.phone;
    
    return updateData;
};

module.exports = {
    toUserDto,
    toUserDtoList,
    fromCreateUserDto,
    fromUpdateUserDto
};