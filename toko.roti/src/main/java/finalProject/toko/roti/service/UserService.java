package finalProject.toko.roti.service;

import finalProject.toko.roti.model.User;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface UserService {
    User findByUsername(String username);

    User findById(String idUser);

    void savePelanggan(User user);

    void updatePassword(User user);

    void updateUser(User user);

    void saveAdmin(User user);

    List<User> findAll(int page, int limit);

    boolean isTeleponExist (String nomorTelepon);

    void status(User user);

    void passwordDefault(User user);

    int countAllUser();

    void ubahMember(String idUser);

    List<User> findSearch(String search, int page, int limit);

    int countSearch(String search);

    boolean isEmailExist(String email);

    void ubahUmum(String idUser);

    boolean isUsernameExistEdit(String username, String idUser);

    boolean isTeleponExistEdit(String nomorTelepon, String idUser);

    boolean isEmailExistEdit(String email, String idUser);
}
