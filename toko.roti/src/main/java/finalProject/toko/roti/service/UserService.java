package finalProject.toko.roti.service;

import finalProject.toko.roti.model.User;

import java.util.List;

public interface UserService {
    User findByUsername(String username);

    User findById(String idUser);

    void savePelanggan(User user);

    void updatePassword(User user);

    void saveAdmin(User user);

    void updateUser(User user);

    List<User> findAll(String paginationSelect);

    boolean isUserExist (String username);

    void status(User user);

}
