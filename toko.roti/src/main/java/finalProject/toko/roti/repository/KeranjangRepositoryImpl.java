package finalProject.toko.roti.repository;

import finalProject.toko.roti.model.Keranjang;
import finalProject.toko.roti.model.Roti;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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
        keranjang.setRotiList(jdbcTemplate.query("SELECT b.*, c.jenisRoti, a.kuantitas, a.idDetail " +
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
    public void saveKeranjang(Keranjang keranjang) {
        String uuid = String.valueOf(UUID.randomUUID());
        jdbcTemplate.update("INSERT INTO keranjang (idKeranjang, idUser, tglKeranjang, statusKeranjang) VALUES (?,?,?,'1')",
                uuid, keranjang.getIdUser(), new Date()
                );
        for (Roti roti : keranjang.getRotiList()) {
            String uuid2 = String.valueOf(UUID.randomUUID());
            jdbcTemplate.update("INSERT INTO detailKeranjang (idDetail, idKeranjang, idRoti, kuantitas) VALUES (?,?,?,?)",
                    uuid2, uuid, roti.getIdRoti(), roti.getKuantitas()
            );
        }
    }

    @Override
    public void saveDetail(Keranjang keranjang) {
            String uuid2 = String.valueOf(UUID.randomUUID());
            System.out.println("keranjang.getIdKeranjang()"+keranjang.getIdKeranjang());
            System.out.println("keranjang.getIdRoti()"+keranjang.getIdRoti());
            jdbcTemplate.update("INSERT INTO detailKeranjang (idDetail, idKeranjang, idRoti, kuantitas) VALUES (?,?,?,?)",
                    uuid2, keranjang.getIdKeranjang(), keranjang.getIdRoti(), 1
            );

    }
}
