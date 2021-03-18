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
    public List<Roti> findAll(String paginationSelect) {
        List<Roti> rotiList = rotiRepository.findAll(paginationSelect);
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
    public int findAllCountObat() {
        return rotiRepository.findAllCountObat();
    }
}
