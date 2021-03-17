package finalProject.toko.roti.repository;

import finalProject.toko.roti.model.Keranjang;
import finalProject.toko.roti.model.Roti;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

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
}
