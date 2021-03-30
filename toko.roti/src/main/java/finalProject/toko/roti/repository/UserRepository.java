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

    List<User> findAll(int page, int limit);

    boolean isTeleponExist (String username);

    void status(User user);

    void passwordDefult(User user);

    int countAllUser();

    void ubahMember(String idUser);

    List<User> findSearch(String search, int page, int limit);

    int countSearch(String search);
}
