package finalProject.toko.roti.repository;

import finalProject.toko.roti.model.Roti;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("RotiRepository")
public class RotiRepositoryImpl implements RotiRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Roti> findAll() {
        List<Roti> rotiList;
        rotiList = jdbcTemplate.query("SELECT a.*, b.jenisRoti FROM roti a JOIN jenisRoti b ON a.idJenisRoti = b.idJenisRoti WHERE a.statusRoti='1'",
                (rs, rowNum)->
                        new Roti(
                                rs.getString("idRoti"),
                                rs.getString("namaRoti"),
                                rs.getString("idJenisRoti"),
                                rs.getInt("stokRoti"),
                                rs.getInt("hargaSatuan"),
                                rs.getInt("hargaLusin"),
                                rs.getString("keterangan"),
                                rs.getBoolean("statusRoti"),
                                rs.getString("jenisRoti")
                        )
        );
        return rotiList;
    }

    @Override
    public Roti findByNamaRoti(String namaRoti) {
        return jdbcTemplate.query("SELECT * FROM roti WHERE namaRoti=?",
                preparedStatement -> {
                    preparedStatement.setString(1, namaRoti);
                },
                (rs, rowNum) ->
                        new Roti(
                                rs.getString("idRoti"),
                                rs.getString("namaRoti"),
                                rs.getString("idJenisRoti"),
                                rs.getInt("stokRoti"),
                                rs.getInt("hargaSatuan"),
                                rs.getInt("hargaLusin"),
                                rs.getString("keterangan"),
                                rs.getBoolean("statusRoti")
                        )).get(0);
    }

    @Override
    public void saveRoti(Roti roti) {
        jdbcTemplate.update("INSERT INTO roti (idRoti, namaRoti, idJenisRoti, stokRoti, hargaSatuan, hargaLusin, keterangan, statusRoti) " +
                        "VALUES (?,?,?,?,?,?,?,'1')",
                roti.getIdRoti(), roti.getNamaRoti(), roti.getIdJenisRoti(), roti.getStokRoti(), roti.getHargaSatuan(), roti.getHargaLusin(), roti.getKeterangan());
    }

    @Override
    public Roti findById(String idRoti) {
        return jdbcTemplate.query("SELECT a.*, b.jenisRoti FROM roti a JOIN jenisRoti b ON a.idJenisRoti = b.idJenisRoti WHERE a.idRoti=?",
                preparedStatement -> {
                    preparedStatement.setString(1, idRoti);
                },
                (rs, rowNum) ->
                        new Roti(
                                rs.getString("idRoti"),
                                rs.getString("namaRoti"),
                                rs.getString("idJenisRoti"),
                                rs.getInt("stokRoti"),
                                rs.getInt("hargaSatuan"),
                                rs.getInt("hargaLusin"),
                                rs.getString("keterangan"),
                                rs.getBoolean("statusRoti"),
                                rs.getString("jenisRoti")
                        )).get(0);
    }

    @Override
    public void updateRoti(Roti roti) {
        jdbcTemplate.update("UPDATE roti SET namaRoti =?, idJenisRoti=?, stokRoti=?, hargaSatuan=?, hargaLusin=?, keterangan=? WHERE idRoti=?",
                roti.getNamaRoti(), roti.getIdJenisRoti(), roti.getStokRoti(), roti.getHargaSatuan(), roti.getHargaLusin(), roti.getKeterangan(), roti.getIdRoti());
    }

    @Override
    public void status(Roti roti) {
        jdbcTemplate.update("UPDATE roti SET statusRoti=? WHERE idRoti=?",
                roti.isStatusRoti(), roti.getIdRoti());
    }
}
