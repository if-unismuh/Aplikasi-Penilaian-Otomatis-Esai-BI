from ujian_app.models import FiturReferensiPenilaian, Jawaban,db
from sqlalchemy.sql.expression import and_
from math import log

class NtfRfLabeledWeighter(object):
    """
    Bertugas Melakukan Pembobotan Term
    Data Berlabel (Training)
    """

    def __init__(self, docnum_repository, ntfrf_repository):
        self.docnum_repository = docnum_repository
        self.ntfrf_repository = ntfrf_repository

    def calculate_ntf(self, idsoal, tf:int, term:str):
        """
        Menghitung Normalized Term Frequency (ntf)
        
            NTF = TF / MAX_TF
        """
        max_tf = self.ntfrf_repository.get_max_tf(idsoal, term)
        
        if max_tf == 0:
            max_tf = 1

        ntf = tf / max_tf
        return ntf

    def calculate_rf(self, idsoal, tf:int, term:str, skorHuruf:str):
        """
        Menghitung Relevance Frequency (rf)

            RF = log10 ( 2 + ( pos / max(1, neg) ) 
        """
        pos = self.docnum_repository.get_doc_num_pos_class(idsoal, term, skorHuruf)
        neg = self.docnum_repository.get_doc_num_neg_class(idsoal, term, skorHuruf)
        
        rf = log(2 + (pos / max(1, neg)), 10)

        return rf

    def calculate(self, idsoal, tf:int, term:str, skorHuruf:str):
        """
        Menghitung Normalized Term Frequency - Relevance Frequency (ntf.rf)
        Return : rf, ntf_rf

            NTFRF = NTF x RF

        """
        ntf = self.calculate_ntf(idsoal, tf, term)
        rf = self.calculate_rf(idsoal, tf, term, skorHuruf)

        ntf_rf = ntf * rf

        return rf, ntf_rf
    
    
    def calculate_and_save(self, idsoal):
        list_fitur = FiturReferensiPenilaian.query.join(Jawaban).filter(
            Jawaban.idsoal == idsoal
        )

        for fitur in list_fitur:
            rf, ntf_rf = self.calculate(idsoal, fitur.tf, fitur.term, fitur.skorHuruf)

            fitur.rf = rf
            fitur.ntf_rf = ntf_rf

            db.session.add(fitur)
            db.session.commit()