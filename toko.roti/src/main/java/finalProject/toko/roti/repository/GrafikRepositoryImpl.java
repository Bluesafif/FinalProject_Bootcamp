package finalProject.toko.roti.repository;

import finalProject.toko.roti.model.Grafik;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("GrafikRepository")
public class GrafikRepositoryImpl implements GrafikRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Grafik> rotiTerbeli(int bulan, int tahun) {
        return jdbcTemplate.query("SELECT a.namaRoti, SUM(b.kuantitas) AS jumlahKuantitas FROM detaillaporan b JOIN roti a JOIN laporan c " +
                        "ON b.idRoti=a.idRoti AND c.idLaporan=b.idLaporan WHERE MONTH(c.tglBeli) = ? AND YEAR(c.tglBeli) = ? " +
                        "GROUP BY a.idRoti ORDER BY jumlahKuantitas DESC LIMIT 5",
                preparedStatement -> {
                    preparedStatement.setInt(1, bulan);
                    preparedStatement.setInt(2, tahun);
                },
                (rs,rowNum)->
                        new Grafik(
                                rs.getString("namaRoti"),
                                rs.getInt("jumlahKuantitas")
                        ));
    }
}
