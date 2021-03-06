package finalProject.toko.roti.service;

import finalProject.toko.roti.model.Keranjang;
import finalProject.toko.roti.repository.KeranjangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("KeranjangService")
public class KeranjangServiceImpl implements KeranjangService{

    @Autowired
    KeranjangRepository keranjangRepository;

    @Override
    public Keranjang findAll(String idUser) {
        Keranjang pd;
        try{
            pd = keranjangRepository.findAll(idUser);
        }catch (EmptyResultDataAccessException e){
            System.out.println(e);
            pd = null;
        }
        return pd;
    }

    @Override
    public void deleteDetailById(String idDetail) {
        synchronized (this) {
            keranjangRepository.deleteDetailById(idDetail);
        }
    }

    @Override
    public void deleteAllById(String idDetail, String idKeranjang) {
        synchronized (this) {
            keranjangRepository.deleteAllById(idDetail, idKeranjang);
        }
    }

    @Override
    public void saveKeranjang(Keranjang keranjang) {
        synchronized (this) {
            keranjangRepository.saveKeranjang(keranjang);
        }
    }

    @Override
    public void saveDetail(Keranjang keranjang) {
        synchronized (this) {
            keranjangRepository.saveDetail(keranjang);
        }
    }

    @Override
    public void updateKuantitas(String idDetail, int kuantitas) {
        synchronized (this) {
            keranjangRepository.updateKuantitas(idDetail, kuantitas);
        }
    }
}
