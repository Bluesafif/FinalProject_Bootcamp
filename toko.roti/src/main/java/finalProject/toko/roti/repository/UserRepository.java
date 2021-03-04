package finalProject.toko.roti.repository;

import finalProject.toko.roti.model.User;

import java.util.List;

public interface UserRepository {
    void saveUser(User user);

    void updateUser(User user);

    List<User> findAll(String paginationSelect);

    User findById(String idUser);

    boolean isUserExist (String idUser);

    void status(User user);
}
