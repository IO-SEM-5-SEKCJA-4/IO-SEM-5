package org.example.magazyn.service;

import org.example.magazyn.dto.UserDto;
import org.example.magazyn.entity.User;

import java.util.List;


public interface UserService {
    void saveUser(UserDto userDto);

    User findUserByEmail(String email);

    List<UserDto> findAllUsers();

}
