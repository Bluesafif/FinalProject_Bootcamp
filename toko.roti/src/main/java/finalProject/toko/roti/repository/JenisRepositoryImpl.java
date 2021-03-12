package finalProject.toko.roti.repository;

import finalProject.toko.roti.model.Jenis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("JenisRepository")
public class JenisRepositoryImpl implements JenisRepository{

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Jenis findByIdJenisRoti(String idJenisRoti) {
        return jdbcTemplate.query("SELECT * FROM jenisRoti WHERE idJenisRoti=?",
                preparedStatement -> {
                    preparedStatement.setString(1, idJenisRoti);
                },
                (rs, rowNum) ->
                        new Jenis(
                                rs.getString("idJenisRoti"),
                                rs.getString("jenisRoti")
                        )).get(0);
    }

    @Override
    public List<Jenis> findAllJenisRoti() {
        List<Jenis> rotiList;
        rotiList = jdbcTemplate.query("SELECT * FROM jenisRoti",
                (rs, rowNum)->
                        new Jenis(
                                rs.getString("idJenisRoti"),
                                rs.getString("jenisRoti")
                        )
        );
        return rotiList;
    }
}
