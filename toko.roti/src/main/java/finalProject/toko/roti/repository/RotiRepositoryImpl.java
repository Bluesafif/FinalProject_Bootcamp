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
    public List<Roti> findAll(int page, int limit) {
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM roti",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int start = (page-1) * limit;

        List<Roti> rotiList;
        rotiList = jdbcTemplate.query("SELECT a.*, b.jenisRoti FROM roti a JOIN jenisRoti b ON a.idJenisRoti = b.idJenisRoti ORDER BY a.statusRoti DESC, a.namaRoti ASC LIMIT "+start+","+limit+"",
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

    @Override
    public int findAllCountRoti() {
        int countRoti;
        countRoti = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM roti",
                Integer.class);
        return countRoti;
    }

    @Override
    public int countStokRoti() {
        int stokRoti;
        stokRoti = jdbcTemplate.queryForObject("SELECT SUM(stokRoti) AS Jumlah FROM roti WHERE statusRoti=1",
                Integer.class);
        return stokRoti;
    }

    @Override
    public int findAllCountRotiPelanggan() {
        int countRoti;
        countRoti = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM roti WHERE statusRoti=1",
                Integer.class);
        return countRoti;
    }

    @Override
    public List<Roti> findSearch(String search, int page, int limit) {
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM roti",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int start = (page-1) * limit;

        List<Roti> rotiList;
        rotiList = jdbcTemplate.query("SELECT a.*, b.jenisRoti FROM roti a JOIN jenisRoti b ON a.idJenisRoti = b.idJenisRoti " +
                        "WHERE a.namaRoti LIKE '%"+search+"%' OR a.hargaSatuan LIKE '%"+search+"%' OR a.hargaLusin LIKE '%"+search+"%' " +
                        "ORDER BY a.statusRoti DESC, a.namaRoti ASC LIMIT "+start+","+limit+"",
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
    public int countSearch(String search) {
        int countRoti;
        countRoti = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM roti " +
                        "WHERE namaRoti LIKE '%"+search+"%' OR hargaSatuan LIKE '%"+search+"%' OR hargaLusin LIKE '%"+search+"%'",
                Integer.class);
        return countRoti;
    }

    @Override
    public int countSearchPelanggan(String search) {
        int countRoti;
        countRoti = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM roti " +
                        "WHERE statusRoti='1' AND namaRoti LIKE '%"+search+"%' OR hargaSatuan LIKE '%"+search+"%' OR hargaLusin LIKE '%"+search+"%'",
                Integer.class);
        return countRoti;
    }
}
