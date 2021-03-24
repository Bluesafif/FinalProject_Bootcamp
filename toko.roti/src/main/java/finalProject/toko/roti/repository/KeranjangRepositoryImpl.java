package finalProject.toko.roti.repository;

import finalProject.toko.roti.model.Keranjang;
import finalProject.toko.roti.model.Roti;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.UUID;

@Repository("KeranjangRepository")
public class KeranjangRepositoryImpl implements KeranjangRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Keranjang findAll(String idUser) {
        Keranjang keranjang;
        keranjang = jdbcTemplate.queryForObject("SELECT * FROM keranjang " +
                        "WHERE idUser='" + idUser + "'",
                (rs, rowNum) ->
                        new Keranjang(
                                rs.getString("idKeranjang"),
                                rs.getString("idUser"),
                                rs.getDate("tglKeranjang"),
                                rs.getBoolean("statusKeranjang")
                        )
        );
        String idKeranjang = keranjang.getIdKeranjang();
        keranjang.setRotiList(jdbcTemplate.query("SELECT b.*, IF(a.kuantitas>=12, (a.kuantitas*b.hargaLusin), (a.kuantitas*b.hargaSatuan)) AS \"totalHarga\", c.jenisRoti, a.kuantitas, a.idDetail " +
                        "FROM detailKeranjang a JOIN roti b JOIN jenisRoti c ON a.idRoti=b.idRoti AND b.idJenisRoti=c.idJenisRoti " +
                        "WHERE a.idKeranjang='" + idKeranjang + "'",
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
                                rs.getInt("totalHarga"),
                                rs.getString("jenisRoti"),
                                rs.getInt("kuantitas"),
                                rs.getString("idDetail")
                        )
        ));
        return keranjang;
    }

    @Override
    public void deleteDetailById(String idDetail) {
        jdbcTemplate.update("DELETE FROM detailKeranjang WHERE idDetail='"+idDetail+"'");
    }

    @Override
    public void deleteAllById(String idDetail, String idKeranjang) {
        jdbcTemplate.update("DELETE FROM detailKeranjang WHERE idDetail='"+idDetail+"'");
        jdbcTemplate.update("DELETE FROM keranjang WHERE idKeranjang='"+idKeranjang+"'");
    }

    @Override
    public void saveKeranjang(Keranjang keranjang) {
        String uuid = String.valueOf(UUID.randomUUID());
        jdbcTemplate.update("INSERT INTO keranjang (idKeranjang, idUser, tglKeranjang, statusKeranjang) VALUES (?,?,?,'1')",
                uuid, keranjang.getIdUser(), new Date()
        );
        String uuid2 = String.valueOf(UUID.randomUUID());
        jdbcTemplate.update("INSERT INTO detailKeranjang (idDetail, idKeranjang, idRoti, kuantitas) VALUES (?,?,?,?)",
                uuid2, uuid, keranjang.getIdRoti(), 1
        );
    }

    @Override
    public void saveDetail(Keranjang keranjang) {
            String uuid2 = String.valueOf(UUID.randomUUID());
            jdbcTemplate.update("INSERT INTO detailKeranjang (idDetail, idKeranjang, idRoti, kuantitas) VALUES (?,?,?,?)",
                    uuid2, keranjang.getIdKeranjang(), keranjang.getIdRoti(), 1
            );

    }

    @Override
    public void updateKuantitas(String idDetail, int kuantitas) {
        jdbcTemplate.update("UPDATE detailKeranjang SET kuantitas=? WHERE idDetail=?",
                kuantitas, idDetail
                );
    }
}
