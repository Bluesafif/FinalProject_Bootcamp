package finalProject.toko.roti.repository;

import finalProject.toko.roti.model.User;

import java.util.List;

public interface UserRepository {

    User findByUsername(String username);

    User findById(String idUser);

    void savePelanggan(User user);

    void updatePassword(User user);

    void saveAdmin(User user);

    void updateUser(User user);

    List<User> findAll();

    boolean isTeleponExist (String username);

    void status(User user);

    void passwordDefult(User user);
}