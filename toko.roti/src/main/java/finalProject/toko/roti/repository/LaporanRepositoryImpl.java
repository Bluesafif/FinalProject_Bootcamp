package finalProject.toko.roti.repository;

import finalProject.toko.roti.model.Laporan;
import finalProject.toko.roti.model.Roti;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository("LaporanRepository")
public class LaporanRepositoryImpl implements LaporanRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void saveLaporan(Laporan laporan) {
        String uuid = String.valueOf(UUID.randomUUID());
        jdbcTemplate.update("INSERT INTO laporan (idLaporan, idKeranjang, idUser, tglBeli, jumlahTotal, diskon, jumlahPembayaran, statusLaporan) VALUES (?,?,?,?,?,?,?,'1')",
                uuid, laporan.getIdKeranjang(), laporan.getIdUser(), new Date(), laporan.getJumlahTotal(), laporan.getDiskon(), laporan.getJumlahPembayaran()
        );
        for (int i = 0; i < laporan.getRotiList().size(); i++) {
            String uuid2 = String.valueOf(UUID.randomUUID());
            jdbcTemplate.update("INSERT INTO detailLaporan (idDetailLaporan, idLaporan, idRoti, harga, kuantitas, totalHarga) VALUES (?,?,?,?,?,?)",
                    uuid2, uuid, laporan.getRotiList().get(i).getIdRoti(), laporan.getRotiList().get(i).getHarga(), laporan.getRotiList().get(i).getKuantitas(), laporan.getRotiList().get(i).getTotalHarga()
            );
            jdbcTemplate.update("UPDATE roti a JOIN detailLaporan b SET a.stokRoti=a.stokRoti-b.kuantitas WHERE a.idRoti=? AND b.idDetailLaporan=?",
                    laporan.getRotiList().get(i).getIdRoti(), uuid2
            );
        }
        String idKeranjang = laporan.getIdKeranjang();
        jdbcTemplate.update("DELETE FROM detailKeranjang WHERE idKeranjang='" + idKeranjang + "'");
        jdbcTemplate.update("DELETE FROM keranjang WHERE idKeranjang='" + idKeranjang + "'");
    }

    @Override
    public List<Laporan> findAllCustomer(String idUser, int page, int limit) {
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM laporan " +
                        "WHERE idUser='" + idUser + "' AND MONTH(tglBeli)=MONTH(NOW()) AND YEAR(tglBeli)=YEAR(NOW())",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int start = (page-1) * limit;

        List<Laporan> laporanList;
        laporanList = jdbcTemplate.query("SELECT b.*, SUM(a.kuantitas) AS jumlahKuantitas FROM detailLaporan a JOIN laporan b ON a.idLaporan=b.idLaporan " +
                        "WHERE b.idUser='" + idUser + "' AND MONTH(b.tglBeli)=MONTH(NOW()) AND YEAR(b.tglBeli)=YEAR(NOW()) " +
                        "GROUP BY a.idLaporan ORDER BY b.tglBeli DESC LIMIT "+start+","+limit+"",
                (rs, rowNum) ->
                        new Laporan(
                                rs.getString("idLaporan"),
                                rs.getString("idKeranjang"),
                                rs.getString("idUser"),
                                rs.getDate("tglBeli"),
                                rs.getInt("jumlahTotal"),
                                rs.getInt("diskon"),
                                rs.getInt("jumlahPembayaran"),
                                rs.getBoolean("statusLaporan"),
                                rs.getInt("jumlahKuantitas")
                        )
        );
        for (Laporan laporan : laporanList){
            List<Roti> rotiList = new ArrayList<>();
            String idLaporan = laporan.getIdLaporan();
            rotiList = jdbcTemplate.query("SELECT b.*, a.harga, a.kuantitas, a.totalHarga FROM detailLaporan a JOIN roti b ON a.idRoti=b.idRoti WHERE a.idLaporan='"+idLaporan+"'",
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
                                    rs.getInt("harga"),
                                    rs.getInt("totalHarga"),
                                    rs.getInt("kuantitas")
                            )
            );
            laporan.setRotiList(rotiList);
        }
        return laporanList;
    }

    @Override
    public int countAllKuantitasRoti(String idUser) {
        int kuantitasRoti;
        kuantitasRoti = jdbcTemplate.queryForObject("SELECT SUM(a.kuantitas) AS Jumlah FROM detailLaporan a JOIN laporan b ON a.idLaporan=b.idLaporan WHERE b.idUser='"+idUser+"' AND MONTH(b.tglBeli)=MONTH(NOW()) AND YEAR(b.tglBeli)=YEAR(NOW())",
                Integer.class);
        return kuantitasRoti;
    }

    @Override
    public int countPengeluaranRoti(String idUser) {
        int pengeluaranRoti;
        pengeluaranRoti = jdbcTemplate.queryForObject("SELECT SUM(jumlahPembayaran) AS jumlah FROM laporan WHERE idUser='"+idUser+"' AND MONTH(tglBeli)=MONTH(NOW()) AND YEAR(tglBeli)=YEAR(NOW())",
                Integer.class);
        return pengeluaranRoti;
    }

    @Override
    public List<Laporan> findAll(int page, int limit) {
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM laporan " +
                        "WHERE MONTH(tglBeli)=MONTH(NOW()) AND YEAR(tglBeli)=YEAR(NOW())",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int start = (page-1) * limit;

        List<Laporan> laporanList;
        laporanList = jdbcTemplate.query("SELECT b.*, c.namaLengkap, SUM(a.kuantitas) AS jumlahKuantitas " +
                        "FROM detailLaporan a JOIN laporan b JOIN user c ON a.idLaporan=b.idLaporan AND b.idUser=c.idUser " +
                        "WHERE MONTH(b.tglBeli)=MONTH(NOW()) AND YEAR(b.tglBeli)=YEAR(NOW()) " +
                        "GROUP BY a.idLaporan ORDER BY b.tglBeli DESC LIMIT "+start+","+limit+"",
                (rs, rowNum) ->
                        new Laporan(
                                rs.getString("idLaporan"),
                                rs.getString("idKeranjang"),
                                rs.getString("idUser"),
                                rs.getDate("tglBeli"),
                                rs.getInt("jumlahTotal"),
                                rs.getInt("diskon"),
                                rs.getInt("jumlahPembayaran"),
                                rs.getBoolean("statusLaporan"),
                                rs.getString("namaLengkap"),
                                rs.getInt("jumlahKuantitas")
                        )
        );
        for (Laporan laporan : laporanList){
            List<Roti> rotiList = new ArrayList<>();
            String idLaporan = laporan.getIdLaporan();
            rotiList = jdbcTemplate.query("SELECT b.*, a.harga, a.kuantitas, a.totalHarga FROM detailLaporan a JOIN roti b ON a.idRoti=b.idRoti WHERE a.idLaporan='"+idLaporan+"'",
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
                                    rs.getInt("harga"),
                                    rs.getInt("totalHarga"),
                                    rs.getInt("kuantitas")
                            )
            );
            laporan.setRotiList(rotiList);
        }
        return laporanList;
    }

    @Override
    public int countAllRotiTerjual() {
        int rotiTerjual;
        rotiTerjual = jdbcTemplate.queryForObject("SELECT SUM(a.kuantitas) AS Jumlah FROM detailLaporan a JOIN laporan b ON a.idLaporan=b.idLaporan WHERE MONTH(b.tglBeli)=MONTH(NOW()) AND YEAR(b.tglBeli)=YEAR(NOW())",
                Integer.class);
        return rotiTerjual;
    }

    @Override
    public int countPendapatanRoti() {
        int pendapatanRoti;
        pendapatanRoti = jdbcTemplate.queryForObject("SELECT SUM(jumlahPembayaran) AS jumlah FROM laporan WHERE MONTH(tglBeli)=MONTH(NOW()) AND YEAR(tglBeli)=YEAR(NOW())",
                Integer.class);
        return pendapatanRoti;
    }

    @Override
    public int findAllCountLaporan(String idUser) {
        int countLaporanCustomer;
        countLaporanCustomer = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM laporan " +
                        "WHERE idUser='" + idUser + "' AND MONTH(tglBeli)=MONTH(NOW()) AND YEAR(tglBeli)=YEAR(NOW())",
                Integer.class);
        return countLaporanCustomer;
    }

    @Override
    public int countAllLaporan() {
        int countLaporan;
        countLaporan = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM laporan " +
                        "WHERE MONTH(tglBeli)=MONTH(NOW()) AND YEAR(tglBeli)=YEAR(NOW())",
                Integer.class);
        return countLaporan;
    }

    @Override
    public List<Laporan> findAllMonth(int page, int limit, int bulan, int tahun, String namaPembeli, String namaRoti) {
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM laporan " +
                        "WHERE MONTH(tglBeli)=MONTH(NOW()) AND YEAR(tglBeli)=YEAR(NOW())",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int start = (page-1) * limit;

        List<Laporan> laporanList;
        laporanList = jdbcTemplate.query("SELECT b.*, c.namaLengkap, d.namaRoti, SUM(a.kuantitas) AS jumlahKuantitas " +
                        "FROM detailLaporan a JOIN laporan b JOIN user c JOIN roti d ON a.idLaporan=b.idLaporan AND b.idUser=c.idUser AND a.idRoti=d.idRoti " +
                        "WHERE MONTH(b.tglBeli)="+bulan+" AND YEAR(b.tglBeli)="+tahun+" AND c.namaLengkap LIKE '%"+namaPembeli+"%' AND d.namaRoti LIKE '%"+namaRoti+"%' " +
                        "GROUP BY a.idLaporan ORDER BY b.tglBeli DESC LIMIT "+start+","+limit+"",
                (rs, rowNum) ->
                        new Laporan(
                                rs.getString("idLaporan"),
                                rs.getString("idKeranjang"),
                                rs.getString("idUser"),
                                rs.getDate("tglBeli"),
                                rs.getInt("jumlahTotal"),
                                rs.getInt("diskon"),
                                rs.getInt("jumlahPembayaran"),
                                rs.getBoolean("statusLaporan"),
                                rs.getString("namaLengkap"),
                                rs.getInt("jumlahKuantitas")
                        )
        );
        for (Laporan laporan : laporanList){
            List<Roti> rotiList = new ArrayList<>();
            String idLaporan = laporan.getIdLaporan();
            rotiList = jdbcTemplate.query("SELECT b.*, a.harga, a.kuantitas, a.totalHarga FROM detailLaporan a JOIN roti b ON a.idRoti=b.idRoti WHERE a.idLaporan='"+idLaporan+"'",
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
                                    rs.getInt("harga"),
                                    rs.getInt("totalHarga"),
                                    rs.getInt("kuantitas")
                            )
            );
            laporan.setRotiList(rotiList);
        }
        return laporanList;
    }

    @Override
    public int countAllLaporanMonth(int bulan, int tahun, String namaPembeli, String namaRoti) {
        int countLaporan;
        countLaporan = jdbcTemplate.queryForObject("SELECT COUNT(*) as count " +
                        "FROM detailLaporan a JOIN laporan b JOIN user c JOIN roti d ON a.idLaporan=b.idLaporan AND b.idUser=c.idUser AND a.idRoti=d.idRoti " +
                        "WHERE MONTH(b.tglBeli)="+bulan+" AND YEAR(b.tglBeli)="+tahun+" AND c.namaLengkap LIKE '%"+namaPembeli+"%' AND d.namaRoti LIKE '%"+namaRoti+"%' " +
                        "GROUP BY a.idLaporan",
                Integer.class);
        return countLaporan;
    }
}
