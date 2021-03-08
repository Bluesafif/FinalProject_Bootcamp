package finalProject.toko.roti.repository;

import finalProject.toko.roti.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository("UserRepository")
public class UserRepositoryImpl implements UserRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public User findByUsername(String username) {
        return jdbcTemplate.query("SELECT * FROM user WHERE username=?",
                    preparedStatement -> {
                        preparedStatement.setString(1, username);
                    },
                    (rs, rowNum) ->
                            new User(
                                    rs.getString("idUser"),
                                    rs.getString("username"),
                                    rs.getString("namaLengkap"),
                                    rs.getString("password"),
                                    rs.getString("alamat"),
                                    rs.getString("nomorTelepon"),
                                    rs.getString("email"),
                                    rs.getBoolean("status"),
                                    rs.getString("role"),
                                    rs.getDate("tanggalRegistrasi")
                            )).get(0);
    }

    @Override
    public User findById(String idUser) {
        return jdbcTemplate.query("SELECT * FROM user WHERE idUser=?",
                preparedStatement -> {
                    preparedStatement.setString(1, idUser);
                },
                (rs, rowNum) ->
                        new User(
                                rs.getString("idUser"),
                                rs.getString("username"),
                                rs.getString("namaLengkap"),
                                rs.getString("password"),
                                rs.getString("alamat"),
                                rs.getString("nomorTelepon"),
                                rs.getString("email"),
                                rs.getBoolean("status"),
                                rs.getString("role"),
                                rs.getDate("tanggalRegistrasi")
                        )).get(0);
    }

    @Override
    public void savePelanggan(User user) {
        String uuid = String.valueOf(UUID.randomUUID());
        jdbcTemplate.update("INSERT INTO user (idUser, username, namaLengkap, password, alamat, nomorTelepon, email, role, status, tanggalRegistrasi) " +
                        "VALUES (?,?,?,MD5(?),?,?,?,'Umum',1,?)",
                uuid, user.getUsername(), user.getNamaLengkap(), user.getPassword(), user.getAlamat(), user.getNomorTelepon(), user.getEmail(), new Date());
    }

    @Override
    public void updatePassword(User user) {
        jdbcTemplate.update("UPDATE user SET password=MD5(?) WHERE username=?",
                user.getPassword(), user.getUsername());
    }

    @Override
    public void saveAdmin(User user) {
        jdbcTemplate.update("INSERT INTO user (idUser, username, namaLengkap, password, alamat, nomorTelepon, email, role, status, tanggalRegistrasi) " +
                        "VALUES (?,?,?,MD5(?),?,?,?,'Admin',1,?)",
                user.getIdUser(), user.getUsername(), user.getNamaLengkap(), user.getPassword(), user.getAlamat(), user.getNomorTelepon(), user.getEmail(), new Date());
    }

    @Override
    public void updateUser(User user) {

    }

    @Override
    public List<User> findAll(String paginationSelect) {
        List<User> userList;
        userList = jdbcTemplate.query("SELECT * FROM user "+paginationSelect,
                (rs, rowNum)->
                        new User(
                                rs.getString("idUser"),
                                rs.getString("username"),
                                rs.getString("namaLengkap"),
                                rs.getString("password"),
                                rs.getString("alamat"),
                                rs.getString("nomorTelepon"),
                                rs.getString("email"),
                                rs.getBoolean("status"),
                                rs.getString("role"),
                                rs.getDate("tanggalRegistrasi")
                        )
        );
        return userList;
    }

    @Override
    public boolean isUserExist(String username) {
        String query = "SELECT COUNT(*) FROM user WHERE username =?";
        int count = jdbcTemplate.queryForObject(query, Integer.class, username);
        return count > 0;
    }

    @Override
    public void status(User user) {

    }
}
