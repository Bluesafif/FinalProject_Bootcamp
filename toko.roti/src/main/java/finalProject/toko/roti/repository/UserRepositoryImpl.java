package finalProject.toko.roti.repository;

import finalProject.toko.roti.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository("UserRepository")
public class UserRepositoryImpl implements UserRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void saveUser(User user) {
        jdbcTemplate.update("INSERT INTO user (idUser, username, namaLengkap, password, alamat, nomorTelepon, email, role, status, tanggalRegistrasi) VALUES (?,?,?,?,?,?,?,?,1,?)",
                user.getIdUser(), user.getUsername(), user.getNamaLengkap(), user.getPassword(), user.getAlamat(), user.getNomorTelepon(), user.getEmail(), user.
    }

    @Override
    public void updateUser(User user) {

    }

    @Override
    public List<User> findAll(String paginationSelect) {
        return null;
    }

    @Override
    public User findById(String idUser) {
        return null;
    }

    @Override
    public boolean isUserExist(String idUser) {
        return false;
    }

    @Override
    public void status(User user) {

    }
}
