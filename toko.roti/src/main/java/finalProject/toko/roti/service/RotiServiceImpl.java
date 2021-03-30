package finalProject.toko.roti.service;

import finalProject.toko.roti.model.Roti;
import finalProject.toko.roti.repository.RotiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("RotiService")
public class RotiServiceImpl implements RotiService{

    @Autowired
    RotiRepository rotiRepository;

    @Override
    public List<Roti> findAll(int page, int limit) {
        List<Roti> rotiList = rotiRepository.findAll(page, limit);
        return rotiList;
    }

    @Override
    public Roti findByNamaRoti(String namaRoti) {
        Roti pd;
        try{
            pd = rotiRepository.findByNamaRoti(namaRoti);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }
        return pd;
    }

    @Override
    public void saveRoti(Roti roti) {
        synchronized (this) {
            rotiRepository.saveRoti(roti);
        }
    }

    @Override
    public Roti findById(String idRoti) {
        Roti pd;
        try{
            pd = rotiRepository.findById(idRoti);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }
        return pd;
    }

    @Override
    public void updateRoti(Roti roti) {
        synchronized (this) {
            rotiRepository.updateRoti(roti);
        }
    }

    @Override
    public void status(Roti roti) {
        synchronized (this) {
            rotiRepository.status(roti);
        }
    }

    @Override
    public int findAllCountRoti() {
        return rotiRepository.findAllCountRoti();
    }

    @Override
    public int countStokRoti() {
        return rotiRepository.countStokRoti();
    }

    @Override
    public int findAllCountRotiPelanggan() {
        return rotiRepository.findAllCountRotiPelanggan();
    }

    @Override
    public List<Roti> findSearch(String search, int page, int limit) {
        return rotiRepository.findSearch(search, page, limit);
    }

    @Override
    public int countSearch(String search) {
        return rotiRepository.countSearch(search);
    }

    @Override
    public int countSearchPelanggan(String search) {
        return rotiRepository.countSearchPelanggan(search);
    }
}
